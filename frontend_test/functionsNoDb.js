// Importe a biblioteca Axios
const axios = require('axios');

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

// Função para buscar todos os usuários
async function fetchAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
}

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

// Função para atualizar um usuário
async function updateUser(userId, userData) {
  try {
    const response = await axios.patch(`${BASE_URL}/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}

// Função para excluir um usuário
async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
}

module.exports = {
    createUser,
    fetchAllUsers,
    findUserByEmailAndPassword,
    updateUser,
    deleteUser
  };


(async () => {
    try {
      // 1- criar usuario
      console.log("Criando usuário.....")
      const newUser = await createUser({
        name: "Pessoa",
        email: 'example@example.com',
        senha: 'password123',
        privateKey: "DVGFDSG",
        acessType: "DFG",
        balance: "0"
      });
      console.log('Novo usuário criado:', newUser);
  
      // 2- Buscando Usuario pelo email e senha
      console.log('Buscando Usuario pelo email e senha');
      const userEmail = 'example@example.com';
      const userPassword = 'password123';
      let user = await findUserByEmailAndPassword(userEmail, userPassword);
      console.log('Usuário encontrado:', user);
  
      // 3- modificando balance de Usuario
      console.log('Modificando balance de Usuario');
      const userIdToUpdate = user.id;
      const updatedUserData = {
        balance: '100',
        // Outros campos que você deseja atualizar
      };
      const updatedUser = await updateUser(userIdToUpdate, updatedUserData);
      console.log('Usuário atualizado:', updatedUser);
  
      // 4- verificar lista de Usuarios
      console.log('Verificando lista de Usuarios...');
      const allUsers = await fetchAllUsers();
      console.log('Todos os usuários:', allUsers);
    
      // 5- Deletando Usuario
      console.log('Deletando Usuario...');
      const userIdToDelete = user.id;
      const deletedUser = await deleteUser(userIdToDelete);
      console.log('Usuário excluído:', deletedUser);
  
    } catch (error) {
      console.error('Erro:', error);
    }
  })();
  