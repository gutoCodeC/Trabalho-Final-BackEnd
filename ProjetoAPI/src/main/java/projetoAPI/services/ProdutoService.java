package projetoAPI.services;

import java.util.List;

import org.springframework.stereotype.Service;

import projetoAPI.entities.Produto;
import projetoAPI.repositories.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto cadastrar(Produto produto) {
        if (produto.getNome() == null || produto.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do produto é obrigatório.");
        }
        if (produto.getPreco() == null || produto.getPreco() < 0) {
            throw new IllegalArgumentException("O preço do produto não pode ser negativo.");
        }
        if (produto.getQuantidade() == null || produto.getQuantidade() < 0) {
            throw new IllegalArgumentException("A quantidade inicial de estoque não pode ser negativa.");
        }

        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto com ID " + id + " não encontrado."));
    }

    public Produto atualizarCadastro(Long id, Produto dadosAtualizados) {
        Produto produtoExistente = buscarPorId(id);

        produtoExistente.setNome(dadosAtualizados.getNome());
        produtoExistente.setPreco(dadosAtualizados.getPreco());
        produtoExistente.setDescricao(dadosAtualizados.getDescricao());

        return produtoRepository.save(produtoExistente);
    }

    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        
        if (produto.getQuantidade() > 0) {
            throw new IllegalStateException("Não é possível deletar um produto com saldo em estoque. Zere o estoque antes.");
        }

        produtoRepository.deleteById(id);
    }

    public Produto adicionarEstoque(Long id, Integer quantidadeEntrada) {
        if (quantidadeEntrada == null || quantidadeEntrada <= 0) {
            throw new IllegalArgumentException("A quantidade de entrada deve ser maior que zero.");
        }

        Produto produto = buscarPorId(id);
        produto.setQuantidade(produto.getQuantidade() + quantidadeEntrada);

        return produtoRepository.save(produto);
    }

    public Produto removerEstoque(Long id, Integer quantidadeSaida) {
        if (quantidadeSaida == null || quantidadeSaida <= 0) {
            throw new IllegalArgumentException("A quantidade de saída deve ser maior que zero.");
        }

        Produto produto = buscarPorId(id);

        if (produto.getQuantidade() < quantidadeSaida) {
            throw new IllegalStateException("Saldo insuficiente. Estoque atual de " + produto.getNome() + ": " + produto.getQuantidade());
        }

        produto.setQuantidade(produto.getQuantidade() - quantidadeSaida);
        return produtoRepository.save(produto);
    }
}