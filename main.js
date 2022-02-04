'use strict';

const limparFormulario = () => {
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};
const preencherFormulario = (endereco) => {
  document.getElementById('logradouro').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};

const isNumber = (number) => /^[0-9]+$/.test(number);

const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const pesquisarCep = async () => {
  limparFormulario();
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')) {
      document.getElementById('logradouro').value = 'CEP não encontrado!';
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById('logradouro').value = 'CEP invalido!';
  }
};
const pesquisarCpf = async () => {
  const cpf = document.getElementById('cpf').value;
  const url = `https://api-candidato.herokuapp.com/candidato/${cpf}`;
  const dados = await fetch(url);
  const candidato = await dados.json();
  console.log(candidato);
};

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
document.getElementById('cpf').addEventListener('focusout', pesquisarCpf);
