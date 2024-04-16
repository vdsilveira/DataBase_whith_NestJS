const axios = require('axios');
const { encryptKey, decryptKey } = require('./cryptografia.js');

// URL base da sua API Nest.js
const BASE_URL = 'http://localhost:3000';

// Função para criar um usuário
async function createUser(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

(async () => {
  // Definindo os dados do usuário dinamicamente
  const nome = 'joao';
  const email = 'joao@hotmail.com';
  const senha = 'password123';

  const userData = {
    name: nome,
    email: email,
    senha: senha,
    privateKey: encryptKey(), // Criptografando a chave privada
    acessType: "DFG",
    balance: "0"
  };

  // Criando o usuário usando os dados dinâmicos
  const newUser = await createUser(userData);
  console.log('Novo usuário criado:', newUser);
})();
