import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

import { config } from "dotenv";

import { privateKeyToAccount } from "thirdweb/wallets";
import {
  isApprovedForAll,
  setApprovalForAll,
} from "thirdweb/extensions/erc1155";
import { createNewPack } from "thirdweb/extensions/pack";
import { sepolia } from "thirdweb/chains";

config();

const main = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }
  if (!process.env.THIRDWEB_SECRET_KEY) {
    throw new Error("THIRDWEB_SECRET_KEY is not set");
  }

  try {
    const EDITION_CONTRACT_ADDRESS =
      "0x42D41585F11995D8a4D15442a3bF5c766E9358bf";
    const PACK_CONTRACT_ADDRESS = "0x22bCe100831938d48900Df8abF9655b1e3e8624E";

    const chain = sepolia;

    // Initialize the client and the account
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    const account = privateKeyToAccount({
      client,
      privateKey: process.env.PRIVATE_KEY,
    });

    // Get the contracts

    const contractEdition = getContract({
      address: EDITION_CONTRACT_ADDRESS,
      chain,
      client,
    });

    const contractPack = getContract({
      address: PACK_CONTRACT_ADDRESS,
      chain,
      client,
    });

    // Check if the Account is approved

    const isApproved = await isApprovedForAll({
      contract: contractEdition,
      owner: account.address,
      operator: PACK_CONTRACT_ADDRESS,
    });
    console.log("Account is approved");

    if (!isApproved) {
      const transaction = setApprovalForAll({
        contract: contractEdition,
        operator: PACK_CONTRACT_ADDRESS,
        approved: true,
      });

      const approvalData = await sendAndConfirmTransaction({
        transaction,
        account,
      });

      console.log(`Approval Transaction hash: ${approvalData.transactionHash}`);
    }

    // Create a new Pack of Cards

    const transactionPack = createNewPack({
      contract: contractPack,
      client,
      recipient: account.address,
      tokenOwner: account.address,
      packMetadata: {
        name: "Basic Pack (#1)",
        image:
          "https://349727a4ec341e84982e34ffb54950c3.ipfscdn.io/ipfs/bafybeifkqf72u3u4ckvyveqyqh6gya6s46ejv4loz57mx6mjwgi5re7tve/",

        description: "Basic Aliemon Pack",
      },

      openStartTimestamp: new Date(),

      erc1155Rewards: [
        {
          contractAddress: EDITION_CONTRACT_ADDRESS,
          tokenId: BigInt(0),
          quantityPerReward: 1,
          totalRewards: 100,
        },
        {
          contractAddress: EDITION_CONTRACT_ADDRESS,
          tokenId: BigInt(2),
          quantityPerReward: 1,
          totalRewards: 100,
        },
        {
          contractAddress: EDITION_CONTRACT_ADDRESS,
          tokenId: BigInt(7),
          quantityPerReward: 1,
          totalRewards: 100,
        },
      ],

      amountDistributedPerOpen: BigInt(5),
    });

    const dataPack = await sendAndConfirmTransaction({
      transaction: transactionPack,
      account,
    });

    console.log(`Pack Transaction hash: ${dataPack.transactionHash}`);
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

main();
