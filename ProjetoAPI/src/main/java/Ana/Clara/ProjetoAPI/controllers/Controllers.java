package Ana.Clara.ProjetoAPI.controllers;

	import java.util.List;

	import org.springframework.web.bind.annotation.DeleteMapping;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RestController;

import Ana.Clara.ProjetoAPI.entities.Usuario;
import Ana.Clara.ProjetoAPI.services.Services;



	@RestController
	@RequestMapping(value="/usuario")
	public class Controllers {
		private final Services service;
		
		public Controllers (Services service) {
			this.service = service;
		}

		@GetMapping
		public List<Usuario> procurarTodos(){
			return service.procurarTodos();
		}
		
		@GetMapping(value = "/{id}")
		public Usuario procuraPorId (@PathVariable Long id) {
			return service.buscaId(id);
		}
		
		@GetMapping(value = "/email/{email}")
		public Usuario procuraPorEmail (@PathVariable String email) {
			return service.buscaEmail(email);
		}
		
		@DeleteMapping("/{id}")
		public void excluirUsuario(@PathVariable Long id) {
			service.deletarPorId(id);
		}
		
		@PostMapping
		public String adicionarUsuario(@RequestBody Usuario usuario) {
			String response = service.SalvarUsuario(usuario);
			return response;
		}
		
		@PutMapping("/{id}")
		public String editarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
			String response = service.editarUsuario(id, usuario);
			return response;
		}
		
	}
