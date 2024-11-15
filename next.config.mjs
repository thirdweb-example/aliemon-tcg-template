/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    // set domains to allow images from ipfs.io with your id
    domains: ["ipfs.io", "yourid.ipfscdn.io"],
  },
};

export default nextConfig;
