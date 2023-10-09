const crypto = require('crypto');

function hexToWIF(hexPrivateKey, isTestnet) {
  const prefix = isTestnet ? 'ef' : '80'; // Testnet: ef, Mainnet: 80
  const privateKey = prefix + hexPrivateKey + '01';
  const firstSHA = crypto.createHash('sha256').update(Buffer.from(privateKey, 'hex')).digest();
  const secondSHA = crypto.createHash('sha256').update(firstSHA).digest();
  const checksum = secondSHA.slice(0, 4).toString('hex');
  const fullKey = privateKey + checksum;
  return base58Encode(Buffer.from(fullKey, 'hex'));
}

function base58Encode(buffer) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let num = BigInt('0x' + buffer.toString('hex'));
  let encoded = '';
  
  while (num > 0) {
    const remainder = num % BigInt(58);
    num = num / BigInt(58);
    encoded = alphabet[parseInt(remainder)] + encoded;
  }
  
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] !== 0x00) break;
    encoded = '1' + encoded;
  }
  
  return encoded;
}

// Replace 'yourHexPrivateKey' with your actual hexadecimal private key
const hexPrivateKey = 'b4db39e0e688ade42565833409afa18bd7140b6142c976806a91b0360e192054';
const isTestnet = false; // Change to true for Testnet

const wifPrivateKey = hexToWIF(hexPrivateKey, isTestnet);
console.log('WIF Private Key:', wifPrivateKey);


// function wifToHex(wifPrivateKey) {
//     const decodedWIF = Buffer.from(require('bs58check').decode(wifPrivateKey));
//     // Remove the network prefix byte (usually 0x80 for mainnet)
//     console.log(decodedWIF);
//     const privateKeyBytes = decodedWIF.slice(1);
//     return privateKeyBytes.toString('hex');
//   }
  
//   // Replace 'yourWIFPrivateKey' with your actual WIF private key
//   const wifPrivateKey = 'L3HGjFMrmUuoQtP1Zg5cjK6pZX9x7m1hwrvNeMHRZbKnfSb5G48o';

// const hexPrivateKey = wifToHex(wifPrivateKey);
// console.log('Hex Private Key:', hexPrivateKey);


// c4fd9a42e20e4abe991353f71de797fdb4d64f3569000bc408670653fd86f68c
// c4fd9a42e20e4abe991353f71de797fdb4d64f3569000bc408670653fd86f68c01

// b4db39e0e688ade42565833409afa18bd7140b6142c976806a91b0360e19205401
// b4db39e0e688ade42565833409afa18bd7140b6142c976806a91b0360e192054