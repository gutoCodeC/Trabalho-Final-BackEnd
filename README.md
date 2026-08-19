# ProjetoAPI

Repositório no GitHub: **Trabalho-Final-BackEnd**

Esta aplicação é uma integração Full Stack entre Front e Back-End para gerenciamento e controle de estoque e usuários, usando banco de dados MySQL.

## Tecnologias Utilizadas

- Java
- JavaScript
- HTML/CSS
- MySQL
- Spring Web
- Spring Boot
- Spring Data JPA

## Como executar a aplicação

1. Fazer um `git clone` localmente com a seguinte URL:
   ```
   git clone https://github.com/gutoCodeC/Trabalho-Final-BackEnd.git
   ```
2. Importe o projeto para a IDE que irá utilizar como projeto Maven.
3. Configure o banco de dados local MySQL de acordo com a seção abaixo.
4. Execute a aplicação em `ProjetoApiApplication.java`.
5. Confirme se a página está disponível em [http://localhost:3606](http://localhost:3606).

## Configuração do banco de dados

A conexão com o banco de dados é gerenciada pelo arquivo de propriedades localizado em:

```
src/main/resources/application.properties
```

```properties
url=localhost:3306/projetoapi
username=root
password=123
```

## Principais Endpoints

*|Método|Rota                     |Descrição                 |
|------|-------------------------|--------------------------|
|GET   |`/usuarios`              |Lista todos os usuários   |
|GET   |`/usuarios/{id}`         |Busca usuário por ID      |
|GET   |`/usuarios/email/{email}`|Busca usuário por e-mail  |
|POST  |`/usuarios`              |Cadastra novo usuário     |
|PUT   |`/usuarios/{id}`         |Edita um usuário existente|
|DELETE|`/usuarios/{id}`         |Exclui um usuário         |
|GET   |`/produtos`              |*(confirmar rota exata)*  |
|GET   |`/produtos/{id}`         |*(confirmar)*             |
|POST  |`/produtos`              |*(confirmar)*             |*

## Exemplos de Requisições

*(preencher com exemplos de requisições, se desejar)*

## Créditos de Desenvolvimento

| Integrante | Responsabilidade |
|---|---|
| Ana Pinho | HTML & CSS |
| Davi Santana | ProdutoService.java |
| Karoline Galvão | Produto.java |
| Lucas Santos | JavaScript |
| Luís Campos | ProdutoRepository.java |
| Susana Vianna | ProdutoController.java |
