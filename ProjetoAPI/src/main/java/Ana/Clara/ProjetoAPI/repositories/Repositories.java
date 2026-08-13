package Ana.Clara.ProjetoAPI.repositories;

	import java.util.Optional;

	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.transaction.annotation.Transactional;

	import Ana.Clara.ProjetoAPI.entities.Usuario;

	public interface Repositories extends JpaRepository<Usuario, Long> {
		Optional<Usuario> findByEmail(String email);
		
		@Transactional
		String deleteByEmail(String email);
	}