const catalogo =
  document.getElementById("catalogo");

const selectPedido =
  document.getElementById("pedidoProduto");

function moeda(valor) {
  return Number(valor).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );
}

async function api(url, opcoes = {}) {
  const resposta = await fetch(
    url,
    {
      headers: {
        "Content-Type": "application/json"
      },
      ...opcoes
    }
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.erro || "Erro na requisição."
    );
  }

  return dados;
}

async function carregarProdutos() {
  try {
    const produtos =
      await api("/api/produtos");

    catalogo.innerHTML = "";

    selectPedido.innerHTML = "";

    produtos.forEach(produto => {
      const card =
        document.createElement("div");

      card.className = "produto";

      card.innerHTML = `
        <h3>${produto.nome}</h3>

        <p>
          ${produto.descricao}
        </p>

        <strong>
          ${moeda(produto.preco)}
        </strong>
      `;

      catalogo.appendChild(card);

      const option =
        document.createElement("option");

      option.value = produto.id;

      option.textContent =
        `${produto.nome} - ${moeda(produto.preco)}`;

      selectPedido.appendChild(option);
    });

    const dadosMedia =
      await api("/api/produtos/media");

    document.getElementById(
      "media"
    ).textContent =
      `Média dos preços: ${moeda(
        dadosMedia.media
      )}`;
  } catch (erro) {
    console.error(erro);
  }
}

async function carregarPedidos() {
  const container =
    document.getElementById("pedidos");

  try {
    const pedidos =
      await api("/api/pedidos");

    if (pedidos.length === 0) {
      container.innerHTML =
        "<p>Nenhum pedido salvo.</p>";

      return;
    }

    container.innerHTML = pedidos
      .map(pedido => {
        return `
          <div class="pedido">

            <strong>
              Pedido ${pedido.id}
            </strong>

            <p>
              Cliente: ${pedido.cliente}
            </p>

            <p>
              Total: ${moeda(pedido.total)}
            </p>

            <p>
              ${pedido.endereco.cidade}
              -
              ${pedido.endereco.uf}
            </p>

          </div>
        `;
      })
      .join("");
  } catch (erro) {
    console.error(erro);
  }
}

document
  .getElementById("formProduto")
  .addEventListener(
    "submit",
    async evento => {
      evento.preventDefault();

      const msg =
        document.getElementById(
          "produtoMsg"
        );

      try {
        const produto =
          await api(
            "/api/produtos",
            {
              method: "POST",

              body: JSON.stringify({
                tipo: "perfume",

                nome:
                  document.getElementById(
                    "produtoNome"
                  ).value,

                preco:
                  document.getElementById(
                    "produtoPreco"
                  ).value,

                categoria:
                  document.getElementById(
                    "produtoCategoria"
                  ).value,

                concentracao:
                  document.getElementById(
                    "produtoConcentracao"
                  ).value,

                imagem:
                  document.getElementById(
                    "produtoImagem"
                  ).value
              })
            }
          );

        msg.textContent =
          `${produto.nome} cadastrado com sucesso!`;

        evento.target.reset();

        await carregarProdutos();
      } catch (erro) {
        msg.textContent =
          erro.message;
      }
    }
  );
document
  .getElementById("formDesconto")
  .addEventListener(
    "submit",
    evento => {
      evento.preventDefault();

      const valor =
        Number(
          document.getElementById(
            "valor"
          ).value
        );

      const desconto =
        Number(
          document.getElementById(
            "desconto"
          ).value
        );

      const valorFinal =
        valor -
        valor * desconto / 100;

      document.getElementById(
        "resultado"
      ).textContent =
        `Valor final: ${moeda(valorFinal)}`;
    }
  );

document
  .getElementById("formCep")
  .addEventListener(
    "submit",
    async evento => {
      evento.preventDefault();

      const cep =
        document.getElementById(
          "cep"
        ).value;

      const endereco =
        document.getElementById(
          "endereco"
        );

      try {
        const dados =
          await api(
            `/api/cep/${cep}`
          );

        endereco.innerHTML = `
          <p>
            ${dados.logradouro}
          </p>

          <p>
            ${dados.bairro}
          </p>

          <p>
            ${dados.cidade}
            -
            ${dados.uf}
          </p>
        `;
      } catch (erro) {
        endereco.textContent =
          erro.message;
      }
    }
  );

document
  .getElementById("formPedido")
  .addEventListener(
    "submit",
    async evento => {
      evento.preventDefault();

      const msg =
        document.getElementById(
          "pedidoMsg"
        );

      try {
        const pedido =
          await api(
            "/api/pedidos",
            {
              method: "POST",

              body: JSON.stringify({
                cliente:
                  document.getElementById(
                    "cliente"
                  ).value,

                cep:
                  document.getElementById(
                    "pedidoCep"
                  ).value,

                itens: [
                  {
                    produtoId:
                      document.getElementById(
                        "pedidoProduto"
                      ).value,

                    quantidade:
                      Number(
                        document.getElementById(
                          "quantidade"
                        ).value
                      )
                  }
                ]
              })
            }
          );

        msg.textContent =
          `Pedido salvo! Total: ${moeda(
            pedido.total
          )}`;

        evento.target.reset();

        await carregarPedidos();
      } catch (erro) {
        msg.textContent =
          erro.message;
      }
    }
  );

carregarProdutos();

carregarPedidos();