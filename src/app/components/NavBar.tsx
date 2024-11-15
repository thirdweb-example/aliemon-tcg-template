"use client";

import Link from "next/link";
import Image from "next/image";

import { client } from "../client";
import { useActiveWallet } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";

export default function Navbar() {
  const walletInfo = useActiveWallet();

  return (
    <nav className="bg-background mb-0 p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={150}
                height={32}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-foreground font-medieval">
                Aliemon TCG
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
