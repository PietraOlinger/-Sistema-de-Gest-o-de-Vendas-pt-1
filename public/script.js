const API_PRODUTOS = "/api/produtos";
const API_PEDIDOS = "/api/pedidos";

let produtos = [];
let pedidos = [];

// =====================================
// INICIAR SISTEMA
// =====================================

document.addEventListener("DOMContentLoaded", async () => {
    await carregarProdutos();
    await carregarPedidos();
});

// =====================================
// PRODUTOS - READ
// =====================================

async function carregarProdutos() {
    try {
        const resposta = await fetch(API_PRODUTOS);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar produtos.");
        }

        produtos = await resposta.json();

        exibirCatalogo();
        exibirTabelaProdutos();
        preencherSelectProdutos();

    } catch (erro) {
        console.error(erro);

        alert("Não foi possível carregar os produtos.");
    }
}

// =====================================
// EXIBIR CATÁLOGO
// =====================================

function exibirCatalogo() {
    const catalogo =
        document.getElementById("lista-catalogo");

    catalogo.innerHTML = "";

    if (produtos.length === 0) {
        catalogo.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }

    produtos.forEach((produto) => {

        const imagem =
            produto.imagem ||
            "https://via.placeholder.com/250?text=Perfume";

        catalogo.innerHTML += `
            <article class="produto">

                <img
                    src="${imagem}"
                    alt="${produto.nome}"
                    onerror="
                        this.src='https://via.placeholder.com/250?text=Perfume'
                    "
                >

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${formatarMoeda(produto.preco)}
                </p>

                <p>
                    ${produto.categoria}
                </p>

                <p class="estoque">
                    Estoque: ${produto.estoque}
                </p>

            </article>
        `;
    });
}

// =====================================
// TABELA DE PRODUTOS
// =====================================

function exibirTabelaProdutos() {
    const tabela =
        document.getElementById("tabela-produtos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    produtos.forEach((produto) => {

        tabela.innerHTML += `
            <tr>

                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>
                    ${formatarMoeda(produto.preco)}
                </td>

                <td>
                    ${produto.categoria}
                </td>

                <td>
                    ${produto.estoque}
                </td>

                <td>

                    <button
                        class="botao-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="botao-excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `;
    });
}

// =====================================
// PRODUTOS - CREATE / UPDATE
// =====================================

document
    .getElementById("form-produto")
    .addEventListener("submit", async (evento) => {

        evento.preventDefault();

        const id =
            document.getElementById("produto-id").value;

        const dadosProduto = {
            nome:
                document.getElementById(
                    "produto-nome"
                ).value.trim(),

            preco:
                Number(
                    document.getElementById(
                        "produto-preco"
                    ).value
                ),

            categoria:
                document.getElementById(
                    "produto-categoria"
                ).value.trim(),

            estoque:
                Number(
                    document.getElementById(
                        "produto-estoque"
                    ).value
                ),

            imagem:
                document.getElementById(
                    "produto-imagem"
                ).value.trim()
        };

        try {

            let resposta;

            if (id) {

                // UPDATE

                resposta = await fetch(
                    `${API_PRODUTOS}/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            dadosProduto
                        )
                    }
                );

            } else {

                // CREATE

                resposta = await fetch(
                    API_PRODUTOS,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            dadosProduto
                        )
                    }
                );

            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.mensagem);
            }

            alert(dados.mensagem);

            cancelarEdicaoProduto();

            await carregarProdutos();

        } catch (erro) {

            alert(
                erro.message ||
                "Erro ao salvar produto."
            );

        }
    });

// =====================================
// EDITAR PRODUTO
// =====================================

function editarProduto(id) {
    const produto = produtos.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!produto) {
        return;
    }

    document.getElementById(
        "produto-id"
    ).value = produto.id;

    document.getElementById(
        "produto-nome"
    ).value = produto.nome;

    document.getElementById(
        "produto-preco"
    ).value = produto.preco;

    document.getElementById(
        "produto-categoria"
    ).value = produto.categoria;

    document.getElementById(
        "produto-estoque"
    ).value = produto.estoque;

    document.getElementById(
        "produto-imagem"
    ).value = produto.imagem || "";

    document.getElementById(
        "titulo-form-produto"
    ).textContent = "Editar Produto";

    document
        .getElementById("gerenciar-produtos")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// =====================================
// CANCELAR EDIÇÃO PRODUTO
// =====================================

function cancelarEdicaoProduto() {

    document
        .getElementById("form-produto")
        .reset();

    document.getElementById(
        "produto-id"
    ).value = "";

    document.getElementById(
        "produto-categoria"
    ).value = "Perfume feminino";

    document.getElementById(
        "titulo-form-produto"
    ).textContent = "Cadastrar Produto";
}

// =====================================
// PRODUTOS - DELETE
// =====================================

async function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `${API_PRODUTOS}/${id}`,
            {
                method: "DELETE"
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem);
        }

        alert(dados.mensagem);

        await carregarProdutos();

    } catch (erro) {

        alert(
            erro.message ||
            "Erro ao excluir produto."
        );

    }
}

// =====================================
// SELECT DE PRODUTOS DO PEDIDO
// =====================================

function preencherSelectProdutos() {
    const select =
        document.getElementById("pedido-produto");

    const valorAtual = select.value;

    select.innerHTML = `
        <option value="">
            Selecione um produto
        </option>
    `;

    produtos.forEach((produto) => {

        const option =
            document.createElement("option");

        option.value = produto.id;

        option.textContent =
            `${produto.nome} - ${formatarMoeda(produto.preco)}`;

        select.appendChild(option);
    });

    if (valorAtual) {
        select.value = valorAtual;
    }
}

// =====================================
// PEDIDOS - READ
// =====================================

async function carregarPedidos() {

    try {

        const resposta =
            await fetch(API_PEDIDOS);

        if (!resposta.ok) {
            throw new Error(
                "Erro ao carregar pedidos."
            );
        }

        pedidos = await resposta.json();

        exibirTabelaPedidos();

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível carregar os pedidos."
        );

    }
}

// =====================================
// TABELA DE PEDIDOS
// =====================================

function exibirTabelaPedidos() {

    const tabela =
        document.getElementById("tabela-pedidos");

    tabela.innerHTML = "";

    if (pedidos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhum pedido cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    pedidos.forEach((pedido) => {

        tabela.innerHTML += `
            <tr>

                <td>
                    ${pedido.id}
                </td>

                <td>
                    ${pedido.cliente}
                </td>

                <td>
                    ${pedido.produto}
                </td>

                <td>
                    ${pedido.quantidade}
                </td>

                <td>
                    ${formatarMoeda(pedido.total)}
                </td>

                <td>
                    <span class="status">
                        ${pedido.status}
                    </span>
                </td>

                <td>

                    <button
                        class="botao-editar"
                        onclick="editarPedido(${pedido.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="botao-excluir"
                        onclick="excluirPedido(${pedido.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `;
    });
}

// =====================================
// PEDIDOS - CREATE / UPDATE
// =====================================

document
    .getElementById("form-pedido")
    .addEventListener("submit", async (evento) => {

        evento.preventDefault();

        const id =
            document.getElementById(
                "pedido-id"
            ).value;

        const produtoId =
            document.getElementById(
                "pedido-produto"
            ).value;

        const produtoSelecionado =
            produtos.find(
                (produto) =>
                    Number(produto.id) ===
                    Number(produtoId)
            );

        if (!produtoSelecionado) {

            alert("Selecione um produto.");

            return;
        }

        const dadosPedido = {

            cliente:
                document.getElementById(
                    "pedido-cliente"
                ).value.trim(),

            produto:
                produtoSelecionado.nome,

            quantidade:
                Number(
                    document.getElementById(
                        "pedido-quantidade"
                    ).value
                ),

            valorUnitario:
                Number(
                    produtoSelecionado.preco
                ),

            status:
                document.getElementById(
                    "pedido-status"
                ).value
        };

        try {

            let resposta;

            if (id) {

                resposta = await fetch(
                    `${API_PEDIDOS}/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            dadosPedido
                        )
                    }
                );

            } else {

                resposta = await fetch(
                    API_PEDIDOS,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            dadosPedido
                        )
                    }
                );

            }

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                throw new Error(
                    dados.mensagem
                );

            }

            alert(dados.mensagem);

            cancelarEdicaoPedido();

            await carregarPedidos();

        } catch (erro) {

            alert(
                erro.message ||
                "Erro ao salvar pedido."
            );

        }
    });

// =====================================
// EDITAR PEDIDO
// =====================================

function editarPedido(id) {

    const pedido = pedidos.find(
        (item) =>
            Number(item.id) === Number(id)
    );

    if (!pedido) {
        return;
    }

    const produto = produtos.find(
        (item) =>
            item.nome === pedido.produto
    );

    document.getElementById(
        "pedido-id"
    ).value = pedido.id;

    document.getElementById(
        "pedido-cliente"
    ).value = pedido.cliente;

    if (produto) {

        document.getElementById(
            "pedido-produto"
        ).value = produto.id;

    }

    document.getElementById(
        "pedido-quantidade"
    ).value = pedido.quantidade;

    document.getElementById(
        "pedido-status"
    ).value = pedido.status;

    document.getElementById(
        "titulo-form-pedido"
    ).textContent = "Editar Pedido";

    document
        .getElementById("gerenciar-pedidos")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// =====================================
// CANCELAR EDIÇÃO PEDIDO
// =====================================

function cancelarEdicaoPedido() {

    document
        .getElementById("form-pedido")
        .reset();

    document.getElementById(
        "pedido-id"
    ).value = "";

    document.getElementById(
        "pedido-quantidade"
    ).value = 1;

    document.getElementById(
        "pedido-status"
    ).value = "Pendente";

    document.getElementById(
        "titulo-form-pedido"
    ).textContent = "Cadastrar Pedido";
}

// =====================================
// PEDIDOS - DELETE
// =====================================

async function excluirPedido(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este pedido?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `${API_PEDIDOS}/${id}`,
            {
                method: "DELETE"
            }
        );

        const dados =
            await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                dados.mensagem
            );

        }

        alert(dados.mensagem);

        await carregarPedidos();

    } catch (erro) {

        alert(
            erro.message ||
            "Erro ao excluir pedido."
        );

    }
}

// =====================================
// CALCULADORA DE DESCONTO
// =====================================

function calcularDesconto() {

    const valor = Number(
        document.getElementById(
            "valor"
        ).value
    );

    const desconto = Number(
        document.getElementById(
            "desconto-valor"
        ).value
    );

    if (
        valor <= 0 ||
        desconto < 0 ||
        desconto > 100
    ) {

        document.getElementById(
            "resultado"
        ).innerHTML =
            "Digite valores válidos.";

        return;
    }

    const valorDesconto =
        valor * desconto / 100;

    const total =
        valor - valorDesconto;

    document.getElementById(
        "resultado"
    ).innerHTML = `
        Valor original:
        <strong>
            ${formatarMoeda(valor)}
        </strong>

        <br>

        Desconto:
        <strong>
            ${formatarMoeda(valorDesconto)}
        </strong>

        <br>

        Valor final:
        <strong>
            ${formatarMoeda(total)}
        </strong>
    `;
}

// =====================================
// CONSULTA DE CEP
// =====================================

async function buscarCEP() {

    let cep =
        document.getElementById(
            "cep-input"
        ).value;

    cep = cep.replace(/\D/g, "");

    const endereco =
        document.getElementById(
            "endereco"
        );

    if (cep.length !== 8) {

        endereco.innerHTML =
            "Digite um CEP válido com 8 números.";

        return;
    }

    try {

        endereco.innerHTML =
            "Consultando CEP...";

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados =
            await resposta.json();

        if (dados.erro) {

            endereco.innerHTML =
                "CEP não encontrado.";

            return;
        }

        endereco.innerHTML = `
            <strong>Endereço encontrado:</strong>

            <br>

            ${dados.logradouro || ""}

            <br>

            ${dados.bairro || ""}

            <br>

            ${dados.localidade} - ${dados.uf}

            <br>

            CEP: ${dados.cep}
        `;

    } catch (erro) {

        endereco.innerHTML =
            "Erro ao consultar o CEP.";

    }
}

// =====================================
// FORMATAR VALORES
// =====================================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}