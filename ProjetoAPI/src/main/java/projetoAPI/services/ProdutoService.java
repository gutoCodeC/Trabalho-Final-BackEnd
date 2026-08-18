package projetoAPI.services;

import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import projetoAPI.entities.Produto;
import projetoAPI.repositories.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public Produto cadastrar(Produto produto) {
        produto.setId(null); // garante Insert
        validarProduto(produto);

        if (produto.getQuantidade() == null) {
            produto.setQuantidade(0);
        } else if (produto.getQuantidade() < 0) {
            throw new IllegalArgumentException("A quantidade inicial de estoque não pode ser negativa.");
        }

        return produtoRepository.save(produto);
    }

    @Transactional(readOnly = true)
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto com ID " + id + " não encontrado."));
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarEstoqueBaixo(Integer quantidadeLimite) {
        return produtoRepository.findByQuantidadeLessThan(quantidadeLimite);
    }

    @Transactional
    public Produto atualizarCadastro(Long id, Produto dadosAtualizados) {
        validarProduto(dadosAtualizados);
        Produto produtoExistente = buscarPorId(id);

        produtoExistente.setNome(dadosAtualizados.getNome());
        produtoExistente.setPreco(dadosAtualizados.getPreco());
        produtoExistente.setDescricao(dadosAtualizados.getDescricao());

        return produtoRepository.save(produtoExistente);
    }

    @Transactional
    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        int estoqueAtual = obterQuantidadeSegura(produto);
        if (estoqueAtual > 0) {
            throw new IllegalStateException("Não é possível deletar um produto com saldo em estoque. Zere o estoque antes.");
        }

        produtoRepository.deleteById(id);
    }

    @Transactional
    public Produto adicionarEstoque(Long id, Integer quantidadeEntrada) {
        if (quantidadeEntrada == null || quantidadeEntrada <= 0) {
            throw new IllegalArgumentException("A quantidade de entrada deve ser maior que zero.");
        }

        Produto produto = buscarPorId(id);
        int estoqueAtual = obterQuantidadeSegura(produto);
        produto.setQuantidade(estoqueAtual + quantidadeEntrada);

        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto removerEstoque(Long id, Integer quantidadeSaida) {
        if (quantidadeSaida == null || quantidadeSaida <= 0) {
            throw new IllegalArgumentException("A quantidade de saída deve ser maior que zero.");
        }

        Produto produto = buscarPorId(id);
        int estoqueAtual = obterQuantidadeSegura(produto);

        if (estoqueAtual < quantidadeSaida) {
            throw new IllegalStateException("Saldo insuficiente. Estoque atual de " + produto.getNome() + ": " + produto.getQuantidade());
        }

        produto.setQuantidade(estoqueAtual - quantidadeSaida);
        return produtoRepository.save(produto);
    }

    private void validarProduto(Produto produto) {
        if (produto == null) {
            throw new IllegalArgumentException("Os dados do produto não podem ser nulos.");
        }
        if (produto.getNome() == null || produto.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do produto é obrigatório.");
        }
        if (produto.getPreco() == null || produto.getPreco() < 0) {
            throw new IllegalArgumentException("O preço do produto não pode ser negativo.");
        }
    }
    private int obterQuantidadeSegura(Produto produto) {
        return produto.getQuantidade() != null ? produto.getQuantidade() : 0;
    }
}