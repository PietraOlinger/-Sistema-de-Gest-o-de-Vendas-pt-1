// Catálogo de perfumes femininos

const produtos = [

    {
        nome:"Too Scandal",
        preco:389,
        categoria:"Perfume feminino",
        imagem:"https://static.beautytocare.com/media/catalog/product/cache/global/image/85e4522595efc69f496374d01ef2bf13/j/e/jean-paul-gaultier-so-scandal-eau-de-parfum-80ml.jpg"
    },

    {
        nome:"Good Girl",
        preco:499,
        categoria:"Perfume feminino",
        imagem:"https://tse3.mm.bing.net/th/id/OIP.mUzKv4aOctNzT0M7nkkYrQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },

    {
        nome:"Lady Million",
        preco:459,
        categoria:"Perfume feminino",
        imagem:"https://tse4.mm.bing.net/th/id/OIP.eW1AzSZIXYg3ojvvwgqBswHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    }

];

const catalogo = document.getElementById("catalogo");

produtos.forEach(produto => {

    catalogo.innerHTML += `

    <div class="produto">

        <img src="${produto.imagem}" alt="${produto.nome}" />

        <h3>${produto.nome}</h3>

        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>

        <p>Categoria: ${produto.categoria}</p>

    </div>

    `;

});

function calcularDesconto(){

    const valor = Number(document.getElementById("valor").value);
    const desconto = Number(document.getElementById("desconto").value);
    const total = valor - (valor * desconto / 100);

    document.getElementById("resultado").innerHTML =
    `Valor Final: <strong>R$ ${total.toFixed(2)}</strong>`;

}

async function buscarCEP(){

    const cep = document.getElementById("cep").value;

    try{

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if(dados.erro){
            document.getElementById("endereco").innerHTML = "CEP não encontrado.";
            return;
        }

        document.getElementById("endereco").innerHTML = `
        <strong>Endereço:</strong><br>
        ${dados.logradouro}<br>
        ${dados.bairro}<br>
        ${dados.localidade} - ${dados.uf}
        `;

    }
    catch{
        document.getElementById("endereco").innerHTML = "Erro ao consultar o CEP.";
    }

}