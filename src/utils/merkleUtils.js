import { MerkleTree } from 'merkletreejs';
// import keccak256 from 'keccak256';
import { keccak_256 } from 'js-sha3';
import { Buffer } from 'buffer';
// Split string into fixed-size chunks
export const chunkData = (data, size = 64) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += size) {
        chunks.push(data.slice(i, i + size));
    }
    console.log("arr", chunks);
    return chunks;
};
const keccak256 = (input) => {
    const hash = keccak_256(input); // Returns hex string
    return Buffer.from(hash, 'hex'); // Convert to Buffer for MerkleTree
  };
export const createMerkleRoot = (data) => {
    const chunks = chunkData(data);
    //   console.log("chunks",chunks,data);
    //   const leaves = chunks.map(chunk => keccak256(chunk));
    const leaves = chunks.map((chunk, idx) => {
        if (!chunk || typeof chunk !== 'string') {
          console.error(`Invalid chunk at index ${idx}: ${chunk}`);
          return keccak256(Buffer.from('')); // Fallback
        }
        try {
          const uint8Array = Buffer.from(chunk, 'binary'); // Returns Uint8Array in browser
          console.log(idx, "->", chunk);
        //   console.log("Buffer as Uint8Array:", uint8Array);
    
          // Convert Uint8Array to a Node.js Buffer-like objecttel
          const buffer = Buffer.from(uint8Array); // Copies the Uint8Array into a Buffer
        //   console.log("buffer1=>",buffer);
          const hash = keccak256(buffer);
          console.log("Hash:", hash.toString('hex'));
          return hash;
        } catch (err) { 
          console.error(`Error hashing chunk ${idx}: ${err.message}`);
          return keccak256(Buffer.from('')); // Fallback
        }
      });
    console.log("leaves", leaves);
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    return {
        root: tree.getRoot().toString('hex'),
        tree,
        leaves,
        chunks,
    };
};
