package projetoAPI.repositories;

	import java.util.Optional;

	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.transaction.annotation.Transactional;

import projetoAPI.entities.Usuario;

	public interface Repositories extends JpaRepository<Usuario, Long> {
		Optional<Usuario> findByEmail(String email);
		
		@Transactional
		long deleteByEmail(String email);
	}