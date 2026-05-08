import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { Plant } from "@/lib/data";

type TopSellingProps = {
  plants: Plant[];
};

export default function TopSelling({ plants }: TopSellingProps) {
  return (
    <section className="bg-[#0a1a0a] pt-20 pb-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <div className="mb-12 flex items-center justify-center gap-5">
          <span className="h-px w-16 bg-green-500" />
          <h2 className="text-center text-4xl font-bold text-white">
            Our Top Selling
          </h2>
          <span className="h-px w-16 bg-green-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plants.map((plant) => (
            <article
              key={plant.id}
              className="glass-card overflow-hidden rounded-[20px] transition-transform duration-300 hover:scale-105 hover:border-white/20"
            >
              <div className="rounded-t-2xl bg-white/10">
                <div className="relative h-52 w-full p-6">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-5"
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {plant.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{plant.tagline}</p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-base font-bold text-green-400">
                    {plant.price}
                  </p>
                  <button
                    type="button"
                    aria-label={`Add ${plant.name} to cart`}
                    className="rounded-full bg-green-500 p-2 text-white transition-colors hover:bg-green-400"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
