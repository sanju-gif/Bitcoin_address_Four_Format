const bitcoin = require('bitcoinjs-lib');

function generateLegacyAddress() {
  // Generate a new key pair with a compressed public key
  const keyPair = bitcoin.ECPair.makeRandom({ compressed: false });
  const keyPair2 = bitcoin.ECPair.makeRandom();
  console.log(keyPair.publicKey.toString('hex').length);
  console.log( keyPair2.publicKey.toString('hex').length);
  // Derive the Bitcoin address (legacy address, P2PKH)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  return {
    privateKey: keyPair.toWIF(),
    publicKey: keyPair.publicKey.toString('hex'),
    address: address
  };
}

// Generate a legacy Bitcoin address with a compressed public key
const legacyAddressInfo = generateLegacyAddress();
console.log('Legacy Address Info (Compressed Public Key):', legacyAddressInfo);
