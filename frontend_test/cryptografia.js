const crypto = require('crypto');
const { ethers } = require("ethers");

// Chave secreta para criptografia. Certifique-se de mantê-la segura!
const secretKey = 'mktplace';
const algorithm = 'aes-128-cbc'; // Alterado para AES-128
const iv = Buffer.alloc(16, 0);

// Gerando a chave usando scryptSync
const key = crypto.scryptSync(secretKey, 'salt', 16); // Alterado para 16 bytes (128 bits)

// Função para criptografar uma string
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
}

// Função para descriptografar uma string
function decryptKey(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

function encryptKey(){
  const randomWallet = ethers.Wallet.createRandom();
  const senha = randomWallet.privateKey;
  const encrypted = encrypt(senha);

  console.log("Chave privada:", senha);
  console.log("Chave privada criptografada:", encrypted);
  return encrypted;
}

module.exports = {
    encryptKey,
    decryptKey
  };
