"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var bs58_1 = require("bs58");
// Load environment variables from .env file
dotenv.config();
// Read the secret key string from the .env file
var secretKeyString = process.env.SOLANA_SECRET_KEY;
if (!secretKeyString) {
    console.error("Secret key is missing in .env file.");
    process.exit(1);
}
// Convert the comma-separated string into an array of numbers
var secretKeyArray = secretKeyString.split(",").map(Number);
// Convert to Uint8Array
var secretKeyUint8Array = new Uint8Array(secretKeyArray);
// Encode to Base58
var base58EncodedKey = bs58_1.default.encode(secretKeyUint8Array);
console.log("Base58 Encoded Secret Key:", base58EncodedKey);
