// JS responsável por gerenciar a autenticação de usuários (login e registro)

const apiURL = "http://localhost:8080/usuario";

// Registro de usuário:
async function cadastrarUsuario(event) {
  if (event) event.preventDefault(); // Impede o recarregamento da página

  const usuario = {
    nome: document.getElementById("reg-nome")?.value,
    email: document.getElementById("reg-email")?.value,
    senha: document.getElementById("reg-senha")?.value,
  };

  try {
    const resposta = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso!");
      document.getElementById("form-registro")?.reset();
    } else {
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  } catch (erro) {
    console.error("Erro de conexão:", erro);
    alert("Não foi possível conectar ao servidor. O Spring Boot está rodando na porta 8080?");
  }
}

// Login de usuário:
async function realizarLogin(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const emailInput = document.getElementById("login-email");
  const senhaInput = document.getElementById("login-senha");

  if (!emailInput || !senhaInput) return;

  const email = emailInput.value.trim();
  const senhaDigitada = senhaInput.value;

  try {
    const resposta = await fetch(`${apiURL}/email/${email}`);

    if (!resposta.ok) {
      alert("E-mail não encontrado!");
      return;
    }

    const usuario = await resposta.json();

    if (usuario.senha === senhaDigitada) {
      alert(`Bem-vindo(a), ${usuario.nome}!`);

      // Salva os dados para exibir no painel principal
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      // REDIRECIONAMENTO PARA A PÁGINA PRINCIPAL REAL:
      window.location.href = "./pagPrincipal.html";
    } else {
      alert("Senha incorreta!");
    }
  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}
// Associa os eventos de envio aos formulários
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) formRegistro.addEventListener("submit", cadastrarUsuario);

  const formLogin = document.getElementById("loginForm");
  if (formLogin) formLogin.addEventListener("submit", realizarLogin);
});