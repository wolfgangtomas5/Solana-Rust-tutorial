/*
Modify the script as follows:

Add instructions to handle invalid wallet addresses.
Modify the script to connect to mainNet and look up some famous Solana wallets. Try toly.sol, shaq.sol or mccann.sol.
*/

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { resolve } from "@bonfida/spl-name-service";

// Function to resolve a `.sol` domain to a wallet address
const resolveDomain = async (domain: string, connection: Connection): Promise<PublicKey | null> => {
  try {
    const resolvedAddress = await resolve(connection, domain);
    if (resolvedAddress) {
      console.log(`🔗 Resolved domain ${domain} to public key: ${resolvedAddress.toBase58()}`);
      return resolvedAddress;
    } else {
      console.error(`❌ Could not resolve domain ${domain} to a valid wallet address.`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error resolving domain ${domain}: ${error.message}`);
    return null;
  }
};

// Main async function
const main = async () => {
  const suppliedAddress = process.argv[2];
  if (!suppliedAddress) {
    throw new Error("❌ Provide a wallet address or domain to check the balance of!");
  }

  // Connect to Solana mainNet
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  let publicKey: PublicKey | null = null;

  // Check if the address is a `.sol` domain
  if (suppliedAddress.endsWith(".sol")) {
    publicKey = await resolveDomain(suppliedAddress, connection);
  } else {
    try {
      publicKey = new PublicKey(suppliedAddress);
    } catch {
      console.error(`❌ Invalid wallet address or domain: ${suppliedAddress}`);
      return;
    }
  }

  if (!publicKey) {
    return;
  }

  // Fetch the wallet balance
  try {
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`
    );
  } catch (error) {
    console.error(`❌ Failed to fetch balance for wallet ${suppliedAddress}: ${error.message}`);
  }
};

// Run the main function
main().catch((error) => console.error(`❌ Script failed: ${error.message}`));
