const BN = require('bn.js');
const EC = require('elliptic').ec;
const bitcoin = require('bitcoinjs-lib');
const ec = new EC('secp256k1');

function decompressPublicKey(compressedPublicKey) {
  const prefix = parseInt(compressedPublicKey.slice(0, 2), 16); // Prefix byte
  const x = new BN(compressedPublicKey.slice(2), 'hex'); // X-coordinate

  // Recover y-coordinate based on the prefix byte
  const curve = ec.curve;
  const xCubed = x.mul(x).mul(x);
  const ySquared = xCubed.add(curve.a.mul(x)).add(curve.b).umod(curve.p);

  // Calculate the modular inverse (y = sqrt(y^2) mod p)
  const y = ySquared.toRed(curve.red).redPow(new BN(1, 2));

  // If prefix is odd and y is even, or prefix is even and y is odd, negate y
  const isOdd = (prefix & 1) !== 0;
  if ((isOdd && y.fromRed().isEven()) || (!isOdd && y.fromRed().isOdd())) {
    y.redNeg();
  }

  // Construct the uncompressed public key
  const uncompressedPublicKey = `04${x.toString('hex').padStart(64, '0')}${y.fromRed().toString('hex').padStart(64, '0')}`;
  return uncompressedPublicKey;
}

const keyPair = bitcoin.ECPair.makeRandom();
    
// Step 2: Derive the public key from the private key
const publicKey = keyPair.publicKey.toString('hex');

const compressedPublicKey = publicKey;

const uncompressedPublicKey = decompressPublicKey(compressedPublicKey);
console.log(compressedPublicKey.length);
console.log(uncompressedPublicKey.length);
