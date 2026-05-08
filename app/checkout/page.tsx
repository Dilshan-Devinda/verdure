"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cartContext";

type FormState = "idle" | "sending" | "success" | "error";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  note: string;
};

const inputClass =
  "w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-[#1a2c22] placeholder:text-[#aab8b0] outline-none focus:ring-2 focus:ring-[#4a7255]/30 focus:border-[#4a7255] transition-all";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [status, setStatus] = useState<FormState>("idle");

  const total = useMemo(() => {
    const parsePrice = (price: string) => {
      const digits = price.replace(/[^0-9]/g, "");
      return parseInt(digits || "0", 10);
    };
    return cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
  }, [cart]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<CheckoutForm> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.postalCode.trim())
      nextErrors.postalCode = "Postal code is required.";
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cartItems: cart,
        }),
      });
      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb] text-[#1a2c22] font-sans selection:bg-[#4a7255] selection:text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#eef4f0] via-[#e8f0eb] to-[#dce8e1] opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12">
        <div className="mb-10 flex items-center gap-3 text-sm text-[#4a7255]">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/#products" className="hover:underline">
            Continue shopping
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1a2c22] md:text-5xl">
            Checkout
          </h1>
          <p className="mt-3 text-[#5c6e64]">
            Add your delivery details and we will send your order confirmation
            by email.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/60 p-10 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#4a7255]/10">
              <CheckCircle className="h-8 w-8 text-[#4a7255]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1a2c22]">
              Order placed!
            </h2>
            <p className="mt-3 text-[#5c6e64]">
              A confirmation email has been sent to{" "}
              <strong>{form.email}</strong>. We will contact you shortly for
              delivery updates.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1a2c22] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#4a7255]"
            >
              Back to home
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/60 p-10 text-center shadow-xl">
            <h2 className="text-2xl font-extrabold text-[#1a2c22]">
              Your cart is empty
            </h2>
            <p className="mt-3 text-[#5c6e64]">
              Add a few plants to your cart before checking out.
            </p>
            <Link
              href="/#products"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1a2c22] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#4a7255]"
            >
              Browse collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[32px] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl p-8 md:p-10 space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-full-name"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                  >
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-full-name"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                  >
                    Phone number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 7X XXX XXXX"
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="checkout-postal"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                  >
                    Postal code <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-postal"
                    name="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className={inputClass}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                >
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="checkout-address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className={inputClass}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-city"
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                >
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-note"
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1a2c22] mb-1.5"
                >
                  Delivery note (optional)
                </label>
                <textarea
                  id="checkout-note"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Apartment, gate code, preferred delivery time..."
                  rows={4}
                  className={inputClass}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1a2c22] py-3 font-bold text-white transition-all hover:bg-[#4a7255] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending confirmation...
                  </>
                ) : (
                  "Place Order & Send Confirmation"
                )}
              </button>
            </form>

            <div className="rounded-[32px] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl p-8 md:p-10">
              <h2 className="text-xl font-extrabold text-[#1a2c22]">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-white/70 border border-white/50 p-4"
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
                    </div>
                    <span className="min-w-[90px] text-right text-xs font-semibold text-[#1a2c22] whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#eef4f0] px-4 py-3">
                <span className="text-sm font-semibold text-[#5c6e64]">
                  Total
                </span>
                <span className="text-lg font-extrabold text-[#1a2c22]">
                  Rs. {total.toLocaleString("en-IN")}/-
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
