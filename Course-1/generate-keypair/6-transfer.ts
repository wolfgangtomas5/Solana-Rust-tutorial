import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey} from "@solana/web3.js";
import * as dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
const suppliedToPubkey = process.argv[2] || null;
 
if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}
 
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
 
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
 
const toPubkey = new PublicKey(suppliedToPubkey);
 
/*
BQ8Taevq4LvUYA6UDskr9aRxc6w3GtmwtWzX2E7vgVCF

$ solana airdrop 1 6EogCwBPxt4WVFiFrbLc9SAJceQdSnJw4MnJHq48uVTq --url https://api.testnet.solana.com
Requesting airdrop of 1 SOL
*/
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);
 
const transaction = new Transaction();
 
const LAMPORTS_TO_SEND = 1;
 
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});
 
transaction.add(sendSolInstruction);
 
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);
 
console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);