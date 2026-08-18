package soloAPI.services;

import java.util.List;

import org.springframework.stereotype.Service;

import soloAPI.entities.Usuario;
import soloAPI.repositories.Repositories;

@Service
public class Services {
	private final Repositories repository;

	public Services (Repositories repository) {
		this.repository = repository;
	}
	
	// Método para salvar um usuário no banco de dados
	
	public String SalvarUsuario	(Usuario usuario) {
		repository.save(usuario);
		return "Usuário cadastrado com sucesso!";
	}
	
	// Método para localizar um usuário pelo ID
	
	public Usuario buscaId(Long id) {
		return repository.findById(id).orElseThrow(
				() -> new RuntimeException ("Usuário não encontrado"));
		}
	
	// Método para localizar um usuário pelo Email
	
	public Usuario buscaEmail(String email) {
		return repository.findByEmail(email).orElseThrow(
				() -> new RuntimeException ("Usuário não encontrado"));
	}

	// Método para localizar todos os usuários
	public List<Usuario> procurarTodos() {
		return repository.findAll();
	}
	
	// Método para deletar um usuário pelo Id
	public String deletarPorId (Long id){
		repository.deleteById(id);
		return "Usuário deletado com sucesso";
	}
	
	// Método para deletar um usuário pelo email
		public String deletarPorEmail (String email) {
			repository.deleteByEmail(email);
			return "Usuário deletado com sucesso";
		}
		
		public String editarUsuario (Long id, Usuario usuario) {
			Usuario response = repository.findById(id).get();
			
			response.setNome(usuario.getNome());
			response.setEmail(usuario.getEmail());
			response.setSenha(usuario.getSenha());
			
			repository.save(response);
			return "Usuário editado com sucesso!!!";
		}
		
	}