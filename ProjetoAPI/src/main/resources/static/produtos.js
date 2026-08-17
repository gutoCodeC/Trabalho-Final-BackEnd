// JS responsável por gerenciar o CRUD de produtos:


document.addEventListener("DOMContentLoaded", () => {});

console.log("JavaScript de Produtos carregado!");

// URL do endpoint de Produto na API
const apiURL = "http://localhost:8080/produto";

// Elementos do DOM: 
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const produtoIdInput = document.getElementById("produtoId");
const nomeInput = document.getElementById("nome");
const descricaoInput = document.getElementById("descricao");
const precoInput = document.getElementById("preco");
const quantidadeInput = document.getElementById("quantidade");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const listarBtn = document.getElementById("listarBtn");

// Carrega e lista todos os produtos
async function carregarProdutos() {
  try {
    const resposta = await fetch(apiURL);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();
    listaProdutos.innerHTML = "";

    produtos.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span><strong>${p.id} - ${p.nome}</strong> | Preço: R$ ${p.preco} | Qtd: ${p.quantidade} <br><em>${p.descricao || ""}</em></span>
                <button onclick="editarProduto(${p.id})">Editar</button>
                <button onclick="excluirProduto(${p.id})">Excluir</button>
            `;

      listaProdutos.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro: " + erro);
  }
}

// Exclui um produto pelo ID
async function excluirProduto(id) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      const resposta = await fetch(`${apiURL}/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        const erroTexto = await resposta.text();
        alert(`Erro ao excluir: ${erroTexto}`);
        return;
      }

      carregarProdutos();
    } catch (erro) {
      console.error("Erro ao excluir produto: " + erro);
    }
  }
}

// Busca os dados de um produto para edição
async function editarProduto(id) {
  try {
    const resposta = await fetch(`${apiURL}/${id}`);
    if (!resposta.ok) {
      throw new Error("Produto não encontrado");
    }
    const produto = await resposta.json();

    // Preenche o formulário com os dados do produto
    produtoIdInput.value = produto.id;
    nomeInput.value = produto.nome;
    descricaoInput.value = produto.descricao || "";
    precoInput.value = produto.preco;
    quantidadeInput.value = produto.quantidade;

    submitBtn.textContent = "Atualizar";
    cancelBtn.style.display = "inline-block";
  } catch (erro) {
    console.error("Erro ao buscar produto para edição: " + erro);
  }
}

// Evento para cadastrar ou atualizar o produto (POST ou PUT)
formProduto.addEventListener("submit", async (e) => {
  e.preventDefault();

  const produto = {
    nome: nomeInput.value,
    descricao: descricaoInput.value,
    preco: parseFloat(precoInput.value),
    quantidade: parseInt(quantidadeInput.value, 10),
  };

  const isEditing = produtoIdInput.value !== "";
  const method = isEditing ? "PUT" : "POST";
  const url = isEditing ? `${apiURL}/${produtoIdInput.value}` : apiURL;

  try {
    const resposta = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      alert(`Erro ao salvar produto: ${erroTexto}`);
      return;
    }

    carregarProdutos();
    resetarFormulario();
  } catch (erro) {
    console.error("Erro ao salvar produto: " + erro);
  }
});

// Função para limpar o formulário
function resetarFormulario() {
  formProduto.reset();
  produtoIdInput.value = "";
  submitBtn.textContent = "Salvar";
  cancelBtn.style.display = "none";
}

// Eventos dos botões de Cancelar e Listar
cancelBtn.addEventListener("click", () => {
  resetarFormulario();
});

listarBtn.addEventListener("click", carregarProdutos);
