"use client";

import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CartDrawer from "./CartDrawer";
import { plants } from "@/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredPlants = plants.filter(
    (p) =>
      searchQuery.trim().length > 0 &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleResultClick = (id: number) => {
    setSearchOpen(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    router.push(`/plant/${id}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#e8f0eb]/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 w-full max-w-[1500px] items-center justify-between px-6 md:px-12">

        {/* Logo */}
        <div className="flex items-center z-10">
          <Link
            href="/"
            className="text-[1.75rem] font-extrabold tracking-tight text-[#1a2c22]"
          >
            Verdure
          </Link>
        </div>

        {/* Navigation — centered on desktop */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-10 md:flex z-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-[#1a2c22] transition-colors hover:text-[#4a7255] tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Search + Cart + Mobile Menu */}
        <div className="flex items-center gap-4 z-10">

          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              type="button"
              id="search-toggle-btn"
              aria-label="Toggle search"
              onClick={() => {
                setSearchOpen((v) => !v);
                setSearchQuery("");
              }}
              className="text-[#1a2c22] transition-colors hover:text-[#4a7255]"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>

            {/* Search Panel */}
            {searchOpen && (
              <div className="absolute right-0 top-10 w-72 sm:w-80 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e2ebe5]">
                  <Search className="h-4 w-4 text-[#72927e] flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    id="search-input"
                    placeholder="Search plants…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#1a2c22] placeholder:text-[#aab8b0] outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-[#aab8b0] hover:text-[#1a2c22] transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Results */}
                {searchQuery.trim().length > 0 && (
                  <div className="max-h-72 overflow-y-auto">
                    {filteredPlants.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-[#72927e]">
                        No plants found for &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      filteredPlants.map((plant) => (
                        <button
                          key={plant.id}
                          type="button"
                          onClick={() => handleResultClick(plant.id)}
                          className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#f0f7f3] transition-colors text-left border-b border-[#e8f0eb] last:border-0"
                        >
                          <div className="relative h-10 w-10 flex-shrink-0 rounded-lg bg-[#eef4f0]">
                            <Image
                              src={plant.image}
                              alt={plant.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#1a2c22] truncate">
                              {plant.name}
                            </p>
                            <p className="text-xs text-[#72927e] truncate">
                              {plant.price}
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {/* Hint when empty query */}
                {searchQuery.trim().length === 0 && (
                  <div className="px-4 py-5 text-center text-xs text-[#aab8b0]">
                    Type to search our plant catalogue…
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="ml-1 relative z-50 text-[#1a2c22] md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 right-4 top-20 rounded-2xl bg-[#e8f0eb]/90 backdrop-blur-md p-6 shadow-xl border border-white/20 md:hidden z-40">
          {/* Mobile search */}
          <div className="mb-5">
            <div className="flex items-center gap-2 rounded-xl bg-white/70 border border-white/50 px-3 py-2.5">
              <Search className="h-4 w-4 text-[#72927e] flex-shrink-0" />
              <input
                type="text"
                id="mobile-search-input"
                placeholder="Search plants…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#1a2c22] placeholder:text-[#aab8b0] outline-none"
              />
            </div>
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 rounded-xl bg-white/80 border border-white/50 overflow-hidden">
                {filteredPlants.length === 0 ? (
                  <p className="px-4 py-4 text-center text-sm text-[#72927e]">
                    No plants found
                  </p>
                ) : (
                  filteredPlants.map((plant) => (
                    <button
                      key={plant.id}
                      type="button"
                      onClick={() => handleResultClick(plant.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#f0f7f3] transition-colors text-left border-b border-[#e8f0eb] last:border-0"
                    >
                      <div className="relative h-10 w-10 flex-shrink-0 rounded-lg bg-[#eef4f0]">
                        <Image
                          src={plant.image}
                          alt={plant.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1a2c22]">{plant.name}</p>
                        <p className="text-xs text-[#72927e]">{plant.price}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-bold text-[#1a2c22] transition-colors hover:text-[#4a7255]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
