"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "@/components/HeroSection";
import { plants } from "@/lib/data";
import ProductsSection from "@/components/ProductsSection";
import { Mail, MapPin, Phone, Leaf, Users, Sprout } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalKey, setIntervalKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [intervalKey]);

  const selectPlant = (targetDataIndex: number) => {
    setActiveIndex((prev) => {
      const currentDataIndex = prev % plants.length;
      let diff = (targetDataIndex - currentDataIndex + plants.length) % plants.length;
      if (diff === 0) diff = plants.length;
      return prev + diff;
    });
    setIntervalKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb] text-[#1a2c22] font-sans selection:bg-[#4a7255] selection:text-white relative">
      {/* Decorative gradient blur in background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#eef4f0] via-[#e8f0eb] to-[#dce8e1] opacity-60" />

      <div className="relative z-10">
        <Header />
        <main>
          {/*
            Hero — wrapped in overflow-hidden to clip cards that slide off-screen to the right.
            This is a LOCAL wrapper in page.tsx, not touching HeroSection.tsx at all.
            overflow-hidden here does NOT affect vertical page scroll because it only
            clips children, not the page's own scroll container.
          */}
          <div className="overflow-hidden">
            <HeroSection
              plants={plants}
              activeIndex={activeIndex}
              onSelect={selectPlant}
            />
          </div>

          {/* Products Section */}
          <ProductsSection />

          {/* About Us Section */}
          <section id="about" className="relative mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12">
            <div className="rounded-[40px] bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: Text */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4a7255] mb-4">
                    <Leaf className="h-3.5 w-3.5" /> Who We Are
                  </span>
                  <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#1a2c22] md:text-5xl">
                    Bringing nature<br />into your world
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-[#5c6e64] md:text-lg md:leading-loose">
                    Verdure was born from a simple belief — that everyone deserves a
                    greener, calmer space. We curate the finest indoor plants, each
                    hand-picked for beauty, resilience, and the way they transform
                    any room into a living, breathing sanctuary.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#5c6e64] md:text-lg md:leading-loose">
                    Our mission is to make plant parenthood approachable and joyful
                    for everyone — from first-time plant owners to seasoned green
                    thumbs. Every plant we sell comes with care tips and our personal
                    guarantee of quality.
                  </p>

                  <div className="mt-10 grid grid-cols-3 gap-4">
                    {[
                      { icon: Leaf, label: "50+", sub: "Plant varieties" },
                      { icon: Users, label: "2k+", sub: "Happy customers" },
                      { icon: Sprout, label: "5★", sub: "Avg. rating" },
                    ].map(({ icon: Icon, label, sub }) => (
                      <div key={sub} className="rounded-2xl bg-white/60 border border-white/60 p-4 text-center">
                        <Icon className="h-5 w-5 mx-auto text-[#4a7255] mb-2" />
                        <p className="text-xl font-extrabold text-[#1a2c22]">{label}</p>
                        <p className="text-xs text-[#72927e] mt-0.5">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Real plant lifestyle photo */}
                <div className="relative hidden lg:block min-h-[480px]">
                  <Image
                    src="/about-plants.png"
                    alt="Serene indoor plant scene"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  {/* Subtle dark-to-transparent gradient on left edge to blend with text panel */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/30 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative mx-auto w-full max-w-[1400px] px-6 py-16 pb-28 md:px-12">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4a7255] mb-4">
                <Mail className="h-3.5 w-3.5" /> Get In Touch
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-[#1a2c22] md:text-5xl">
                Contact Us
              </h2>
              <p className="mt-4 text-[#5c6e64] max-w-xl mx-auto">
                Have a question about a plant, your order, or just want to say hello?
                We&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Interactive Contact Form */}
              <ContactForm />

              {/* Contact Info */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    value: "hello@verdure.store",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    value: "+94 77 000 0000",
                    sub: "Mon – Sat, 9am – 6pm",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    value: "42 Garden Lane, Colombo 03",
                    sub: "Sri Lanka",
                  },
                ].map(({ icon: Icon, title, value, sub }) => (
                  <div
                    key={title}
                    className="flex items-start gap-5 rounded-[24px] bg-white/50 backdrop-blur-xl border border-white/60 shadow-sm p-6"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1a2c22] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#72927e] mb-1">
                        {title}
                      </p>
                      <p className="text-base font-bold text-[#1a2c22]">{value}</p>
                      <p className="text-sm text-[#5c6e64] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
