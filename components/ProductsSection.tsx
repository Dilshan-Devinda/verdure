import Image from "next/image";
import Link from "next/link";
import { plants } from "@/lib/data";

export default function ProductsSection() {
  return (
    <section id="products" className="relative mx-auto w-full max-w-[1400px] px-6 py-20 md:px-12">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#1a2c22] md:text-5xl">
          Our Collection
        </h2>
        <p className="mt-4 text-[#5c6e64]">
          Explore our wide variety of indoor plants, perfect for any space.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant) => (
          <Link href={`/plant/${plant.id}`} key={plant.id} className="group relative block">
            {/* Glassmorphism Container */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-lg border border-white/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              
              {/* Image Wrapper */}
              <div className="relative mb-6 flex h-[240px] w-full items-center justify-center">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={200}
                  height={250}
                  className="h-auto max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Info */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-[#1a2c22]">{plant.name}</h3>
                <p className="mt-2 text-sm text-[#5c6e64] line-clamp-2">{plant.tagline}</p>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#1a2c22] whitespace-nowrap">{plant.price}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2c22] text-white transition-transform group-hover:bg-[#4a7255]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
