package projetoAPI.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import projetoAPI.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	// busca pelo nome exato
	Optional<Produto> findByNome(String nome);

	// busca por parte do nome
	List<Produto> findByNomeContainingIgnoreCase(String nome);

	// busca por parte da descricao
	List<Produto> findByDescricaoContainingIgnoreCase(String descricao);

	// produtos com estoque baixo
	List<Produto> findByQuantidadeLessThan(Integer quantidade);
}