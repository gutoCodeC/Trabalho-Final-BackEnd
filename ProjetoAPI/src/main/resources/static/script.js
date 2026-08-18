// Script responsável por gerenciar o CRUD de usuários:

document.addEventListener("DOMContentLoaded", () => {});

console.log("JavaScript carregado!");

const apiURL = "http://localhost:8080/usuario";
const formUsuario = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");
const userIdInput = document.getElementById("userId");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const listarBtn = document.getElementById("listarBtn");

async function carregarUsuarios(){
	try {
		const resposta = await fetch(apiURL);
		if (!resposta.ok) {
			throw new Error ("Erro ao buscar usuário");
		}
		
		const usuarios = await resposta.json();
		listaUsuarios.innerHTML = "";
		
		usuarios.forEach(u => {
			const li = document.createElement("li");
			li.innerHTML = `<span>${u.id} - ${u.nome} (${u.email})</span>
			<button onclick = "editarUsuario(${u.id})">Editar</button>
			<button onclick = "excluirUsuario(${u.id})">Excluir</button>` ;
			
			listaUsuarios.appendChild(li);
		});
	} catch (erro){
		console.log("Erro: " + erro);
			
		}
	}
	
	async function excluirUsuario(id) {
		if (confirm("Tem certeza que deseja excluir este usuário?")){
			try {
				await fetch (`${apiURL}/${id}`, {
					method: "DELETE"});
					carregarUsuarios();
				} catch (erro) {
					console.error("Erro ao excluir usuario: " + erro);
				}
			}
		}
		
		async function editarUsuario(id){
			try {
				const resposta = await fetch(`${apiURL}/${id}`);
				const usuario = await resposta.json();
				userIdInput.value = usuario.id;
				nomeInput.value = usuario.nome;
				emailInput.value = usuario.email;
				senhaInput.value = usuario.senha;
				submitBtn.textContent = "Atualizar"
				cancelBtn.style.display = "inline-block"
			} catch(erro) {
				console.error("Erro ao buscar usuário para edição: " + erro);
			}
		}
		
		formUsuario.addEventListener("submit", async (e)=>{
			e.preventDefault();
			
			const usuario = {
				nome: nomeInput.value,
				email: emailInput.value,
				senha: senhaInput.value
			};
			
			const isEditing = userIdInput.value !== "";
			const method = isEditing ? "PUT":"POST";
			const url = isEditing ? `${apiURL}/${userIdInput.value}` : apiURL;
			
			try {
				await fetch (url, {
					method: method,
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify(usuario)
				});
				carregarUsuarios();
				resetarFormulario();
			} catch (erro) {
				console.log("Erro ao salvar usuário: " + erro)
			}
		});
		
		function resetarFormulario(){
			formUsuario.reset();
			userIdInput.value = "";
			submitBtn.textContent = "Salvar";
			cancelBtn.textContent = "none";
		}
		
		cancelBtn.addEventListener("click", () => {
			resetarFormulario();
		});
		
		listarBtn.addEventListener ("click", carregarUsuarios);