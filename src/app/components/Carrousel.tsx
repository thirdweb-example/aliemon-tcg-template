"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/img/cards/Spider.png?height=400&width=300",
    alt: "Spider Card",
    description:
      "Ah, the Alien Spider... a creature woven from the darkest threads of the cosmos itself! Long has it lingered in the hidden shadows of this world, banished by the Queen Ant for its insatiable hunger and wicked ways. Only those who wield true cunning dare to summon it, for its loyalty lies with none but itself.",
  },
  {
    src: "/img/cards/ant.png?height=400&width=300",
    alt: "Ant Card",
    description:
      "Behold, the Queen Ant—ruler of the subterranean depths and mother to countless warriors. She commands loyalty with an iron mandible and a heart that beats with the rhythm of her endless colony. To summon the Queen Ant is to bring forth a force of unity and unmatched strength, for her subjects heed her call without question.",
  },
  {
    src: "/img/cards/bee.png?height=400&width=300",
    alt: "Bee Card",
    description:
      "The elusive Magic Bee dances through realms of magic and mystery, guided by whispers of ancient wisdom. Its wings hum with the essence of enchanted nectar, and to summon it is to invite the blessings of the forest itself. The Magic Bee is no ordinary creature; its presence brings a glimmer of hope and a surge of power.",
  },
  {
    src: "/img/cards/butterfly.png?height=400&width=300",
    alt: "Butterfly Card",
    description:
      "Some say the Nightmarefly is a creature born from the shadows of forgotten dreams, a beautiful terror that flutters through the veil between worlds. With wings that shimmer like moonlight on still water, it drifts silently, its mere presence enough to chill even the bravest hearts. To summon the Nightmarefly is to wield an ethereal power that dances between light and darkness.",
  },
  {
    src: "/img/cards/Erotylidae.png?height=400&width=300",
    alt: "Erotylidae Card",
    description:
      "Towering and unbreakable, Tanklidae embodies the spirit of defense within the Aliemon realm. Inspired by the mighty Erotylidae family, this armored behemoth is known for its resilience and unwavering loyalty to its allies. Summoning Tanklidae brings forth a shielded powerhouse that can absorb the most fearsome attacks and protect those around it.",
  },
  {
    src: "/img/cards/Fly.png?height=400&width=300",
    alt: "Fly Card",
    description:
      "Loyal and battle-ready, Flydier is the dependable soldier of the Aliemon realm. Though it may be small, this hardy fly knows no fear, diving headfirst into skirmishes with unwavering resolve. Often found in nearly every deck, Flydier is a versatile ally, perfect for fortifying lines and wearing down opponents.",
  },
  {
    src: "/img/cards/ladybug.png?height=400&width=300",
    alt: "Ladybug Card",
    description:
      "Beneath her delicate, spotted shell lies a force of hidden power—Lady Dark is the enigmatic protector of the shadows. This ladybug may appear harmless, but she commands dark energies that both bewilder and weaken her enemies. Summoning Lady Dark brings a touch of mystery to the field, as her presence manipulates the very essence of the battlefield.",
  },
  {
    src: "/img/cards/Mantis.png?height=400&width=300",
    alt: "Mantis Card",
    description:
      "Silent, swift, and deadly—Mantyr is the elusive hunter of the Aliemon realm, a mantis whose movements are as graceful as they are lethal. Known as the Shadow Stalker, Mantyr strikes from the darkness with unparalleled precision, leaving nothing but echoes in its wake. Summoning Mantyr brings forth a master of ambush, a creature whose very presence shifts the balance of battle.",
  },
  {
    src: "/img/cards/Orthoptera.png?height=400&width=300",
    alt: "Orthoptera Card",
    description:
      "With swift legs and a clever mind, Duppletera dances across the battlefield, an elusive Orthopteran known for its remarkable ability to multiply at will. Duppletera’s agility and duplication powers make it a challenging opponent, overwhelming foes with copies of itself that seem to come from every direction.",
  },
];

export default function AnimatedFocusedImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  const getImageIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  const variants = {
    center: {
      x: "0%",
      scale: 1,
      zIndex: 3,
      filter: "blur(0px) brightness(100%)",
    },
    left: {
      x: "-50%",
      scale: 0.8,
      zIndex: 2,
      filter: "blur(2px) brightness(75%)",
    },
    right: {
      x: "50%",
      scale: 0.8,
      zIndex: 2,
      filter: "blur(2px) brightness(75%)",
    },
    hidden: {
      x: direction > 0 ? "100%" : "-100%",
      scale: 0.8,
      zIndex: 1,
      filter: "blur(2px) brightness(75%)",
    },
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8 font-medieval">
        Know the Aliemons
      </h2>
      <div className="flex justify-center items-center space-x-4 mb-8">
        <button
          className="z-10 p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div className="relative flex items-center justify-center w-full h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            {[-1, 0, 1].map((offset) => {
              const index = getImageIndex(offset);
              return (
                <motion.div
                  key={images[index].src}
                  custom={direction}
                  variants={variants}
                  initial={
                    offset === 0 ? "center" : offset === -1 ? "left" : "right"
                  }
                  animate={
                    offset === 0 ? "center" : offset === -1 ? "left" : "right"
                  }
                  exit="hidden"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    scale: { type: "spring", stiffness: 300, damping: 30 },
                    filter: { type: "tween", duration: 0.2 },
                  }}
                  className="absolute top-0 w-[300px] h-[400px] flex items-center justify-center"
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          className="z-10 p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="text-center max-w-md mx-auto">
        <p className="text-lg font-medieval">
          {images[currentIndex].description}
        </p>
      </div>
    </div>
  );
}
