const axios = require('axios');
const { encryptKey, decryptKey } = require('./cryptografia.js');

// URL base da sua API Nest.js
const BASE_URL = 'http://localhost:3000';

// Função para buscar um usuário por email e senha
async function findUserByEmailAndPassword(email, senha) {
  try {
    const response = await axios.get(`${BASE_URL}/user/${email}/${senha}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
}

// Dados de exemplo
const email = "joao@hotmail.com";
const senha = "password123";

// Chamando a função para buscar o usuário
findUserByEmailAndPassword(email, senha)
  .then(userData => {
    // Armazenando os valores retornados em variáveis
    const userId = userData.id;
    const userName = userData.name;
    const userEmail = userData.email;
    const userPrivateKey = userData.privateKey;
    const userAccessType = userData.acessType;
    const userBalance = userData.balance;

    // Exibindo os valores armazenados
    console.log('ID do usuário:', userId);
    console.log('Nome do usuário:', userName);
    console.log('Email do usuário:', userEmail);
    console.log('Chave privada do usuário:', userPrivateKey);
    console.log('Tipo de acesso do usuário:', userAccessType);
    console.log('Saldo do usuário:', userBalance);

    // Descriptografando a chave privada
    const chaveDescritografada = decryptKey(userPrivateKey);
    console.log('Chave privada descriptografada:', chaveDescritografada);
  })
  .catch(error => {
    console.error('Erro ao buscar usuário:', error);
  });
