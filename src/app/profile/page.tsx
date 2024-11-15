"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

// Define a type for the NFT metadata structure
// Change this as needed on your code depending on the metadata structure you want to display
type NFT = {
  metadata: {
    image: string;
    name: string;
    description: string;
    attributes: {
      trait_type: string;
      value: string | number;
    }[];
  };
  quantityOwned: string;
  supply: string;
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("NFTs");

  const formatIpfsUrl = (url: string) => {
    return url.replace(
      "ipfs://",
      //enter here your IPFS gateway for example
      "https://890123823.ipfscdn.io/ipfs/"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center font-medieval">
        Check your Aliemon Collection
      </h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("NFTs")}
          className={`px-4 py-2 rounded-lg font-medieval ${
            activeTab === "NFTs"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          NFTs
        </button>
        <button
          onClick={() => setActiveTab("Packs")}
          className={`px-4 py-2 rounded-lg font-medieval ${
            activeTab === "Packs"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Packs
        </button>
      </div>

      {activeTab === "NFTs" &&
        (isLoading ? (
          <div>
            <motion.div
              className="flex justify-center items-center h-64"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <motion.div
                className="border-t-4 border-blue-500 rounded-full w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
            <h1 className="text-3xl font-bold mb-8 text-center font-medieval">
              Loading Lists ...
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"></div>
        ))}

      {activeTab === "Packs" && (
        <div className="w-full flex justify-center"></div>
      )}
    </div>
  );
}
