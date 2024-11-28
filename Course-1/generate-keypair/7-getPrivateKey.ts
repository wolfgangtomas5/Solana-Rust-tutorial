import * as dotenv from "dotenv";
import bs58 from "bs58";

// Load environment variables from .env file
dotenv.config();

// Read the secret key string from the .env file
const secretKeyString = process.env.SECRET_KEY;

if (!secretKeyString) {
  console.error("Secret key is missing in .env file.");
  process.exit(1);
}

// Convert the comma-separated string into an array of numbers
const secretKeyArray = secretKeyString.split(",").map(Number);

// Convert to Uint8Array
const secretKeyUint8Array = new Uint8Array(secretKeyArray);

// Encode to Base58
const base58EncodedKey = bs58.encode(secretKeyUint8Array);

console.log("Base58 Encoded Secret Key:", base58EncodedKey);
