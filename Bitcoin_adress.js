const bitcoin = require('bitcoinjs-lib');
const bech32 = require('bech32');


async function createBitcoinAddress(){

    // Step 1: Generate a random private key
    const keyPair = bitcoin.ECPair.makeRandom();
    
    // Step 2: Derive the public key from the private key
    const publicKey = keyPair.publicKey;
    
    const Legacy = bitcoin.payments.p2pkh({ pubkey: publicKey }).address //Legacy
    
    const SegWit = bitcoin.payments.p2wpkh({ pubkey: publicKey }).address; //SegWit
    
    const Pay_to_Script_Hash = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: publicKey }),
    }).address;//Pay_to_Script_Hash
    
    const taprootAddress = bech32.encode('bc', bech32.toWords(Buffer.from(publicKey, 'hex')));//Taproot
    
    
    // Print the results
    console.log('Private Key (WIF):', keyPair.__D.toString('hex'));
    console.log('Public Key:', publicKey.toString('hex'));
    console.log('Legacy Address (P2PKH):', Legacy);
    console.log('SegWit Address (P2WPKH):', SegWit);
    console.log('Pay_to_Script_Hash Address (P2SH):', Pay_to_Script_Hash);
    console.log('Taproot Address (BECH32)', taprootAddress);
    
} 


createBitcoinAddress()