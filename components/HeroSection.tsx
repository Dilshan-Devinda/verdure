"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plant } from "@/lib/data";

type HeroSectionProps = {
  plants: Plant[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function HeroSection({
  plants,
  activeIndex,
  onSelect,
}: HeroSectionProps) {
  const router = useRouter();

  // Generate a queue of 8 items (1 large, 7 smalls) to make it look like a long continuous list
  const queue = Array.from({ length: 8 }).map((_, offset) => {
    const absIndex = activeIndex + offset;
    const dataIndex = absIndex % plants.length;
    return {
      ...plants[dataIndex],
      absIndex,
      sourceIndex: dataIndex,
    };
  });

  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-4 md:px-12 md:pt-10">
      
      {/* Mobile Title - Standard document flow to perfectly prevent overlap */}
      <div className="md:hidden w-full mb-10 mt-4">
        <h1 className="text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-[#1a2c22]">
          The world
          <br />
          of plants
        </h1>
      </div>

      {/* Main Container */}
      <div className="relative flex min-h-[550px] w-full flex-col justify-end md:mt-24 md:flex-row md:items-end">
        
        {/* Desktop Text Section - Title and Paragraph Side-by-Side */}
        <div className="pointer-events-none absolute hidden z-0 w-full md:flex md:flex-row md:items-end gap-8 lg:gap-16 md:left-[360px] md:top-[-100px] lg:left-[400px] lg:top-[-120px]">
          <div className="flex-shrink-0">
            <h1 className="font-extrabold leading-[1.05] tracking-tight text-[#1a2c22] md:text-[5.5rem] lg:text-[6.5rem]">
              The world
              <br />
              of plants
            </h1>
          </div>
          <div className="max-w-xs pb-4 lg:max-w-sm">
            <p className="pointer-events-auto text-sm leading-relaxed text-[#5c6e64] md:text-base md:leading-loose">
              Discover everything you need to know about your plants, treat them
              with kindness and they will take care of you. Create a calmer, greener space that breathes life into your home.
            </p>
          </div>
        </div>

        {/* Cards Section Queue */}
        <div className="relative z-10 flex w-full items-end overflow-visible pb-4 pt-10 md:pt-0">
          <AnimatePresence initial={false} mode="popLayout">
            {queue.map((plant, idx) => {
              const isFeatured = idx === 0;

              return (
                <motion.div
                  layout
                  key={plant.absIndex}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -250, // Slide further left to disappear softly
                  }}
                  transition={{
                    layout: { type: "spring", bounce: 0, duration: 1.2 }, // Slower, more elegant enlarge
                    opacity: { duration: 0.4 }, // Faster fade out so it gets out of the way
                    x: { duration: 0.8, ease: "easeInOut" }, // Faster slide left
                  }}
                  className={`relative flex-shrink-0 cursor-pointer rounded-[24px] bg-white/70 backdrop-blur-md ${
                    isFeatured
                      ? "ml-[calc(50vw-164px)] mr-[150px] flex h-[280px] w-[280px] flex-col justify-end p-6 shadow-xl z-20 md:ml-0 md:mr-8 md:h-[340px] md:w-[320px] md:p-8"
                      : "mr-3 flex h-[180px] w-[140px] flex-col justify-end p-4 shadow-sm z-10 md:mr-6 md:h-[220px] md:w-[180px] md:p-5"
                  }`}
                  onClick={() => {
                    if (!isFeatured) {
                      onSelect(plant.sourceIndex);
                    } else {
                      router.push(`/plant/${plant.id}`);
                    }
                  }}
                >
                  {/* Overflowing Plant Image (No CSS transforms to avoid FLIP conflicts) */}
                  <motion.div
                    layout
                    className={`pointer-events-none absolute left-0 right-0 mx-auto flex items-end justify-center ${
                      isFeatured
                        ? "bottom-[120px] h-[420px] w-[120%] max-w-[340px] md:bottom-[160px] md:h-[550px] md:w-[450px] md:max-w-none"
                        : "bottom-[80px] h-[190px] w-[150px] md:bottom-[100px] md:h-[250px] md:w-[200px]"
                    }`}
                  >
                    <Image
                      src={plant.image}
                      alt={plant.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain drop-shadow-2xl"
                      priority={isFeatured}
                    />
                  </motion.div>

                  {/* Card Content inside (Fading nicely to avoid height snaps) */}
                  <div className="relative mt-auto w-full">
                    <AnimatePresence mode="wait">
                      {isFeatured ? (
                        <motion.div
                          key="large-content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full"
                        >
                          <h2 className="text-2xl font-extrabold leading-tight text-[#1a2c22]">
                            {plant.name.split(" ").map((word, i) => (
                              <span key={i} className="block">
                                {word}
                              </span>
                            ))}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-[#5c6e64]">
                            {plant.tagline}
                          </p>
                          <div className="mt-6 flex items-center justify-end">
                            <span className="text-sm font-bold text-[#4a7255] hover:underline">
                              Know more <span className="ml-1 text-lg">→</span>
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="small-content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full text-center"
                        >
                          <h3 className="text-sm font-extrabold leading-snug text-[#1a2c22]">
                            {plant.name.split(" ").map((word, i) => (
                              <span key={i} className="block">
                                {word}
                              </span>
                            ))}
                          </h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
