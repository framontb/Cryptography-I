var crypto = require('crypto');
var xor = require('bitwise-xor');

// ---- decrypt AES 128 CBC -------------

function decryptAES128CBC(key, ciphertext, iv) {
    var decipher = crypto.createDecipheriv("aes-128-ecb", key, Buffer.alloc(0));
    decipher.setAutoPadding(false);

    var decipherBlock;
    var chunks = [];

    for (i = 0; i < allciphertext.length; i += 16) {
        // Get a cipher block
        cipherBlock = allciphertext.slice(i, i+16);
        
        // Decrypt Block 
        decipherBlock = decipher.update(cipherBlock, 'hex','hex');

        // Buffer the decripted block
        dec = Buffer.from(decipherBlock, 'hex');

        // XORed and pushed
        chunks.push(xor(dec, iv));

        // New IV
        iv = cipherBlock;
    }

    // Finish with the decipher
    decipher.final('hex');

    // Join all chunks
    return chunks.join('');
}

// ---- Exercise 1 ------------
var key = new Buffer('140b41b22a29beb4061bda66b6747e14', 'hex');
var iv = new Buffer('4ca00ff4c898d61e1edbf1800618fb28', 'hex');
var allciphertext = new Buffer('28a226d160dad07883d04e008a7897ee2e4b7465d5290d0c0e6c6822236e1daafb94ffe0c5da05d9476be028ad7c1d81', 'hex');

plaintext = decryptAES128CBC(key, allciphertext, iv)

console.log(plaintext);

// ---- Exercise 2 ------------

iv = new Buffer('5b68629feb8606f9a6667670b75b38a5', 'hex');
allciphertext = new Buffer('b4832d0f26e1ab7da33249de7d4afc48e713ac646ace36e872ad5fb8a512428a6e21364b0c374df45503473c5242a253', 'hex');

plaintext = decryptAES128CBC(key, allciphertext, iv)

console.log(plaintext);

// ---- decrypt AES 128 CRT -------------
function decryptAES128CRT(key,ciphertext, iv) {
    var decipher = crypto.createCipheriv("aes-128-ecb", key, Buffer.alloc(0));
    decipher.setAutoPadding(false);

    var chunks = [];
    var FkIV_bufex;

    for (i = 0; i < allciphertext.length; i += 16) {
        // Get a cipher block
        cipherBlock = allciphertext.slice(i, i+16);
        
        // Decrypt Block 
        FkIV = decipher.update(iv, 'hex','hex');

        // Buffer the decripted block
        FkIV_bufex = Buffer.from(FkIV, 'hex');

        // XORed and pushed
        chunks.push(xor(cipherBlock, FkIV_bufex));

        // Hay que aumentar el IV en 1 en cada iteracion
        // Solo maneja 6 bytes para el contador por un problema de precision
        // Para solventarlo, habría que usar alguna librería tipo gmp
        // 10 + 6 = 16
        num = iv.readUIntBE(10,6);
        iv.writeUIntBE(num+1,10,6);
    }

    // Finish with the decipher
    decipher.final('hex');

    // Join all chunks
    return chunks.join('');
}

// ---- Exercise 3 ------------
key = new Buffer('36f18357be4dbd77f050515c73fcf9f2', 'hex');
iv = new Buffer('69dda8455c7dd4254bf353b773304eec', 'hex');
allciphertext = new Buffer('0ec7702330098ce7f7520d1cbbb20fc388d1b0adb5054dbd7370849dbf0b88d393f252e764f1f5f7ad97ef79d59ce29f5f51eeca32eabedd9afa9329', 'hex');

plaintext = decryptAES128CRT(key, allciphertext, iv)

console.log(plaintext);

// ---- Exercise 4 ------------
key = new Buffer('36f18357be4dbd77f050515c73fcf9f2', 'hex');
iv = new Buffer('770b80259ec33beb2561358a9f2dc617', 'hex');
allciphertext = new Buffer('e46218c0a53cbeca695ae45faa8952aa0e311bde9d4e01726d3184c34451', 'hex');

plaintext = decryptAES128CRT(key, allciphertext, iv)

console.log(plaintext);
