function validarFormatoCEP(cep) {
  const numeros = String(cep).replace(/\D/g, "");

  if (!/^\d{8}$/.test(numeros)) {
    throw new Error(
      "CEP inválido. Digite 8 números."
    );
  }

  return numeros;
}

async function buscarCEP(cep) {
  const cepValido = validarFormatoCEP(cep);

  const resposta = await fetch(
    `https://viacep.com.br/ws/${cepValido}/json/`
  );

  if (!resposta.ok) {
    throw new Error(
      "Erro ao consultar o CEP."
    );
  }

  const dados = await resposta.json();

  if (dados.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: dados.cep,
    logradouro: dados.logradouro,
    bairro: dados.bairro,
    cidade: dados.localidade,
    uf: dados.uf
  };
}

module.exports = {
  validarFormatoCEP,
  buscarCEP
};