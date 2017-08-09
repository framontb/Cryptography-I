var bignum = require('bignum');
const crypto = require('crypto');

var p = bignum('134078079299425970995740249982058461274793658205923933\
77723561443721764030073546976801874298166903427690031\
858186486050853753882811946569946433649006084171');

var g = bignum('11717829880366207009516117596335367088558084999998952205\
59997945906392949973658374667057217647146031292859482967\
5428279466566527115212748467589894601965568');

var h = bignum('323947510405045044356526437872806578864909752095244\
952783479245297198197614329255807385693795855318053\
2878928001494706097394108577585732452307673444020333');

var B = Math.pow(2,20);

var gB = g.powm(B,p);

console.log(" p \n" + p.toString());
console.log(" g \n" + g.toString());
console.log(" h \n" + h.toString());
console.log(" B \n" + B.toString());
console.log(" gB \n" + gB.toString());

// Create de Maps of hashes
var x0_map = new Map();

var inv_gx1, h_inv_gx1, gBx0, hash, hashString;

console.log("\nCreating Map...");
for (var x0 = 0; x0 <= B; x0++) {

    if ((x0 % 10000) == 0 ) console.log("Mapping hash: " + x0);

    // Calcula el termino para x0
    gBx0 = gB.powm(x0, p);

    // Crea el hash
    hash = crypto.createHash('sha256');
    hash.update(gBx0.toString());
    hashString = hash.digest('hex')

    // Mapa de hashes
    x0_map.set(hashString, x0);

}

// Check de Maps of hashes
console.log("\nChecking Map...");
for (var x1 = 0; x1 <= B; x1++) {
    
    if ((x1 % 10000) == 0 ) console.log("Checking hash: " + x1);

    // Calcula el termino para x1
    inv_gx1 = g.powm(x1,p).invertm(p);
    h_inv_gx1 = h.mul(inv_gx1).mod(p);

    // Crea el hash
    hash = crypto.createHash('sha256');
    hash.update(h_inv_gx1.toString());
    hashString = hash.digest('hex')

    // Mapa de hashes
    if (x0_map.has(hashString)) {
        console.log("hashString: ", hashString);
        x0 = x0_map.get(hashString);
        console.log("x1: ", x1);
        console.log("x0: ", x0);
        break;
    }
}

var x = bignum.mul(x0, B).add(x1).mod(p);
console.log("\nSolucion:");
console.log(x.toString());

var z = g.powm(x,p);

console.log("\nIt should be h = x0 * B + x1 :");
console.log(z.toString());
console.log("\nReal h:");
console.log(h.toString());
