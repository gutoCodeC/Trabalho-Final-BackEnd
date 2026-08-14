// ==========================================
// 1. FUNÇÃO DE LOGIN
// ==========================================
function fazerLogin(event) {
  event.preventDefault(); // Evita que a página recarregue

  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  // Puxa a lista de usuários salvos no navegador (ou cria uma lista vazia se não tiver ninguém)
  const usuariosSalvos =
    JSON.parse(localStorage.getItem("bancoUsuarios")) || [];

  // Procura se existe algum usuário com esse e-mail
  const usuarioEncontrado = usuariosSalvos.find((u) => u.email === email);

  // Valida se achou o usuário e se a senha bate
  if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
    alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
    // Redireciona para a próxima página
    window.location.href = ".html";
  } else {
    alert("Acesso negado: E-mail ou senha incorretos!");
  }
}

// Função responsável pelo registro:
function fazerRegistro(event) {
  event.preventDefault();

  const nome = document.getElementById("reg-nome").value;
  const email = document.getElementById("reg-email").value;
  const senha = document.getElementById("reg-senha").value;

  // Puxa os usuários que já existem no navegador:
  const usuariosSalvos =
    JSON.parse(localStorage.getItem("bancoUsuarios")) || [];

  // Verifica se o e-mail já foi cadastrado antes para não duplicar:
  const emailJaExiste = usuariosSalvos.some((u) => u.email === email);
  if (emailJaExiste) {
    alert("Esse e-mail já está cadastrado! Tente fazer o login.");
    return;
  }

  // Cria o novo usuário e adiciona na lista:
  const novoUsuario = { nome, email, senha };
  usuariosSalvos.push(novoUsuario);

  // Salva a lista atualizada de volta no navegador:
  localStorage.setItem("bancoUsuarios", JSON.stringify(usuariosSalvos));

  alert("Cadastro realizado com sucesso! Agora você já pode fazer o login.");
  document.getElementById("form-registro").reset(); // Limpa os campos:
}

// Eventos do DOM:
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", fazerLogin);
  }

  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", fazerRegistro);
  }
});
