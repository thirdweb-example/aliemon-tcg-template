import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white w-full">
      <div className="w-full">
        <div className="relative z-10 grid lg:grid-cols-2 lg:items-center">
          <div className="pl-[50px] pr-[50px] py-16 space-y-6 sm:pl-[60px] lg:pl-[80px]">
            <h1 className="text-4xl font-medieval tracking-tighter sm:text-5xl xl:text-6xl/none">
              Aliemon TCG: Journey into the Enchanted Realm
            </h1>
            <p className="max-w-[600px] text-lg text-zinc-300 sm:text-xl font-medieval">
              Dive into Aliemon, a trading card game where fantasy and strategy
              collide. Explore a mystical marketplace, collect powerful card
              packs, and craft your ultimate deck of alien-inspired creatures.
            </p>
            <Link href="/shop">
              <button className="inline-flex items-center px-6 py-3 mt-4 text-lg font-medieval bg-blue-600 hover:bg-blue-700 rounded-md">
                Visit the Shop
                <ArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
          <div className="relative h-full min-h-[400px] lg:min-h-[850px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
            <Image
              src="/img/market.png"
              alt="Digital Innovation"
              fill
              className="object-cover object-left-top"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full opacity-20 blur-[100px]" />
    </section>
  );
}
