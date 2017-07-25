// Import modules
var crypto = require('crypto');
var fs = require('fs');

// Consts
// const fileName = "6.2.birthday.mp4_download";
const fileName = "6.1.intro.mp4_download";
const BLOCK_LENGTH = 1024;
const stats = fs.statSync(fileName);
const fileSizeInBytes = stats.size;
const numChunks = Math.floor(fileSizeInBytes/1024);
const lastBlockSize = fileSizeInBytes % 1024;

console.log("fileSizeInBytes:", fileSizeInBytes);
console.log("numChunks:", numChunks);
console.log("lastBlockSize:", lastBlockSize);

videoFile = fs.openSync(fileName, 'r');

// Last block First. Have their own size
let lastBuffer = Buffer.alloc(lastBlockSize);
let numBytesRead = fs.readSync(videoFile, lastBuffer, 0, lastBlockSize, numChunks * BLOCK_LENGTH);

let hashFunction = crypto.createHash('sha256');
hashFunction.update(lastBuffer);
let lastHash = hashFunction.digest();

console.log(lastBuffer.toString('hex'));
console.log("buffer: ", lastBuffer.byteLength);
console.log("numBytesRead: ", numBytesRead);
console.log("lastHash: ", lastHash);

// process.exit();

// Declarations for loop
let buffer = Buffer.alloc(BLOCK_LENGTH+32);

// One to last block
for (i = 1; i <= numChunks; i++) {
  console.log("-------------------------------> ", numChunks-i, " Block <-------------");
  numBytesRead = fs.readSync(videoFile, buffer, 0, BLOCK_LENGTH, (numChunks-i) * BLOCK_LENGTH);

  // Append hash of previous block
  bytes = buffer.write(lastHash.toString('binary'), BLOCK_LENGTH, 32, 'binary');

  // Calculate new Hash
  hashFunction = crypto.createHash('sha256');
  hashFunction.update(buffer);
  lastHash = hashFunction.digest();

  // Show some data
  //console.log("buffer.toString('binary'): ", buffer.toString('hex'));
  console.log("numBytesRead from block's file: ", numBytesRead);
  console.log('Bytes appended from previous hash: ', bytes);
  console.log("Total buffer size: ", buffer.byteLength);
  console.log("lastHash: ", lastHash);
}

fs.closeSync(videoFile);

// RESULTADO FINAL:
console.log("-------------------------------");
console.log("\n h0: \n", lastHash.toString('hex'));
console.log("-------------------------------");

console.log("fileSizeInBytes:", fileSizeInBytes);
console.log("numChunks:", numChunks);
console.log("lastBlockSize:", lastBlockSize);
