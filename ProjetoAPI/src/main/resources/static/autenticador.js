// Espaço para a URL da API do Spring:
const apiURL = "http://localhost:8080/usuario";

// Registro:
async function cadastrarUsuario(event) {
  event.preventDefault(); // Impede o recarregamento automático da página

  const usuario = {
    nome: document.getElementById("reg-nome").value,
    email: document.getElementById("reg-email").value,
    senha: document.getElementById("reg-senha").value,
  };

  try {
    const resposta = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso!");
      document.getElementById("form-registro").reset(); // Limpa os campos
    } else {
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  } catch (erro) {
    console.error("Erro de conexão:", erro);
    alert(
      "Não foi possível conectar ao servidor. O Spring Boot está rodando na porta 8080?",
    );
  }
}

// Login:
async function realizarLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const senhaDigitada = document.getElementById("login-senha").value;

  try {
    // Busca as informações do usuário no Spring Boot pelo e-mail
    const resposta = await fetch(`${apiURL}/email/${email}`);

    if (!resposta.ok) {
      alert("E-mail não encontrado!");
      return;
    }

    const usuario = await resposta.json();

    // Valida se a senha enviada do banco bate com a digitada na tela
    if (usuario.senha === senhaDigitada) {
      alert(`Bem-vindo(a), ${usuario.nome}!`);
      // Redireciona para a página interna
      window.location.href = ".html";                                         // Espaço para o HTML da página principal.
    } else {
      alert("Senha incorreta!");
    }
  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}

// Eventos para o formulário:
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) formRegistro.addEventListener("submit", cadastrarUsuario);

  const formLogin = document.getElementById("form-login");
  if (formLogin) formLogin.addEventListener("submit", realizarLogin);
});



// Possível modelo de <Form>:

/* <form id="form-login">
        <h2>Entrar</h2>
        <input type="email" id="login-email" placeholder="E-mail" required>
        <input type="password" id="login-senha" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    </form>

    <hr>


    <form id="form-registro">
        <h2>Criar Conta</h2>
        <input type="text" id="reg-nome" placeholder="Nome completo" required>
        <input type="email" id="reg-email" placeholder="E-mail" required>
        <input type="password" id="reg-senha" placeholder="Crie uma senha" required>
        <button type="submit">Cadastrar</button>
    </form> */