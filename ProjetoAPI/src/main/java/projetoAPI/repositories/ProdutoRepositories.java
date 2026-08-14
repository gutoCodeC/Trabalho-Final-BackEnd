package projetoAPI.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import projetoAPI.entities.Produto;

public interface ProdutoRepositories extends JpaRepository<Produto, Long> {

	// Busca um produto pelo nome exato
	Optional<Produto> findByNome(String nome);

	// Busca produtos cujo nome contenha o texto informado (ignorando maiusculas/minusculas)
	List<Produto> findByNomeContainingIgnoreCase(String nome);

	//  produtos por categoria (caso a Entity tenha esse campo)
	List<Produto> findByCategoria(String categoria);

	//  produtos com quantidade em estoque abaixo do valor informado
	List<Produto> findByQuantidadeLessThan(Integer quantidade);
}