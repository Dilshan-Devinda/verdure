"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const parsePrice = (price: string) => {
    // "Rs. 1,299/-" → strip everything except digits → "1299" → 1299
    const digits = price.replace(/[^0-9]/g, "");
    return parseInt(digits || "0", 10);
  };

  const total = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const handleProceedToCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Cart trigger button */}
      <button
        type="button"
        id="cart-trigger-btn"
        onClick={() => setIsOpen(true)}
        className="relative text-[#1a2c22] transition-colors hover:text-[#4a7255]"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4a7255] text-[9px] font-bold text-white">
            {cart.length}
          </span>
        )}
      </button>

      {/* Overlay — z-[200] sits above sticky header (z-50) and hamburger */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      )}

      {/* Drawer — z-[201] above overlay, h-[100dvh] fills full visible viewport on mobile */}
      <div
        className={`fixed top-0 right-0 z-[201] h-[100dvh] w-full max-w-[420px] bg-[#f0f4f1] shadow-2xl transition-transform duration-[400ms] ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/40 bg-white/60 backdrop-blur-lg px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-[#1a2c22]" />
            <h2 className="text-lg font-bold text-[#1a2c22]">
              Your Cart
              {cart.length > 0 && (
                <span className="ml-2 text-sm font-medium text-[#72927e]">
                  ({cart.length} item{cart.length !== 1 ? "s" : ""})
                </span>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
            className="rounded-full p-1.5 text-[#1a2c22] hover:bg-white/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/60">
              <ShoppingCart
                className="h-10 w-10 text-[#72927e]"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-xl font-bold text-[#1a2c22]">
              Your cart is empty
            </h3>
            <p className="text-sm text-[#5c6e64]">
              Browse our collection and add some beautiful plants!
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 p-4 shadow-sm"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-xl bg-[#eef4f0] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1a2c22] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#5c6e64] mt-0.5 line-clamp-1">
                      {item.tagline}
                    </p>
                    <p className="text-sm font-extrabold text-[#1a2c22] mt-1">
                      {item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0 rounded-full p-2 text-[#72927e] hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="border-t border-white/40 bg-white/60 backdrop-blur-lg px-6 py-5 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5c6e64] font-medium">
                  Total
                </span>
                <span className="text-xl font-extrabold text-[#1a2c22]">
                  Rs. {total.toLocaleString("en-IN")}/-
                </span>
              </div>

              <button
                type="button"
                id="proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full rounded-full bg-[#1a2c22] py-3 font-bold text-white transition-all hover:bg-[#4a7255] active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
