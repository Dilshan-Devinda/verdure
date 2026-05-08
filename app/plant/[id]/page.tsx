"use client";

import { plants } from "@/lib/data";
import Image from "next/image";
import Header from "@/components/Header";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { notFound, useParams } from "next/navigation";

export default function PlantDetailPage() {
  const params = useParams();
  const plantId = parseInt(params.id as string);
  const plant = plants.find((p) => p.id === plantId);

  const { addToCart, isInCart } = useCart();
  const inCart = plant ? isInCart(plant.id) : false;

  if (!plant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#e8f0eb] text-[#1a2c22] font-sans selection:bg-[#4a7255] selection:text-white relative">
      {/* Soft gradient background — pointer-events-none so it never blocks clicks */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#eef4f0] via-[#e8f0eb] to-[#dce8e1] opacity-60" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-10 md:px-12 md:pt-16">
          {/*
            Use a plain <a> tag — Next.js <Link scroll={false}> for cross-origin
            hash anchors sometimes doesn't scroll on client navigation.
            A plain <a> forces a real navigation that makes the browser handle #products natively.
          */}
          <a
            href="/#products"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5c6e64] transition-colors hover:text-[#1a2c22]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </a>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-center">

            {/* Left Column: Huge Plant Image */}
            <div className="relative flex min-h-[450px] w-full items-center justify-center md:min-h-[700px]">
              {/*
                FIX: pointer-events-none on the blur blob.
                Previously this absolute+scale-150 element extended ~112px above its container
                and physically covered the "Back to Collection" link, swallowing all clicks.
              */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-white/20 blur-[120px] scale-150" />
              <Image
                src={plant.image}
                alt={plant.name}
                width={800}
                height={1000}
                className="relative z-10 h-auto max-h-[85vh] w-full max-w-[400px] md:max-w-[550px] object-contain drop-shadow-2xl scale-110 md:scale-100"
                priority
              />
            </div>

            {/* Right Column: Glassmorphism Details Card */}
            <div className="relative flex flex-col justify-center">
              <div className="rounded-[40px] bg-white/50 backdrop-blur-xl border border-white/60 p-8 shadow-xl md:p-12">
                <h1 className="text-[3rem] font-extrabold leading-[1.1] tracking-tight text-[#1a2c22] md:text-[4rem]">
                  {plant.name}
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-[#5c6e64] md:text-xl md:leading-loose">
                  {plant.tagline}
                  <br /><br />
                  A perfect addition to your space. Treat it with kindness and it
                  will take care of you, purifying your air and bringing a sense of
                  calm to your daily life.
                </p>

                <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between border-t border-white/40 pt-8">
                  <div>
                    <p className="text-sm font-medium text-[#72927e]">Total Price</p>
                    <p className="mt-1 text-4xl font-extrabold text-[#1a2c22] whitespace-nowrap">
                      {plant.price}
                    </p>
                  </div>

                  <button
                    id={`add-to-cart-btn-${plant.id}`}
                    onClick={() => addToCart(plant)}
                    disabled={inCart}
                    className={`flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-bold text-white transition-all sm:w-auto ${
                      inCart
                        ? "bg-[#4a7255] cursor-default"
                        : "bg-[#1a2c22] hover:scale-105 hover:bg-[#4a7255] active:scale-95"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="h-5 w-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
