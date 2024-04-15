
const {
    createUser,
    fetchAllUsers,
    findUserByEmailAndPassword,
    updateUser,
    deleteUser
} = require('./functionsNoDb');


// 1- criar usuário:
console.log("Criando usuário.....");

(async () => {
    const newUser = await createUser({
      name: "Pessoa",
      email: 'example@example.com',
      senha: 'password123',
      privateKey: "DVGFDSG",
      acessType: "DFG",
      balance:"0"
    });
    console.log('Novo usuário criado:', newUser);
})();

