"use client";

export default function Shop() {
  const formatIpfsUrl = (url: string) => {
    return url.replace(
      "ipfs://",
      "https://349727a4ec341e84982e34ffb54950c3.ipfscdn.io/ipfs/"
    );
  };

  return <div className="container mx-auto px-4 py-8 min-h-screen"></div>;
}
