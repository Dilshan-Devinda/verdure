import type { ThemeConfig } from "../themes";
import VerdureNav from "./VerdureNav";

type ThemeShowcaseProps = {
  theme: ThemeConfig;
  allThemeSlugs: string[];
};

const services = [
  {
    title: "Build a custom Next.js web app",
    category: "Development",
  },
  {
    title: "Create a conversion-focused marketing funnel",
    category: "Marketing",
  },
  {
    title: "Write landing page and brand story copy",
    category: "Writing",
  },
  {
    title: "Develop a booking system and client dashboard",
    category: "Development",
  },
  {
    title: "Run paid social campaign setup and optimization",
    category: "Marketing",
  },
  {
    title: "Design scripts for ads and social reels",
    category: "Writing",
  },
];

const freelancers = [
  { name: "Maya R.", role: "UI Designer", rating: "4.9", jobs: "164" },
  { name: "Nim A.", role: "Brand Strategist", rating: "5.0", jobs: "92" },
  { name: "Leo K.", role: "Motion Creator", rating: "4.8", jobs: "211" },
];

export default function ThemeShowcase({
  theme,
  allThemeSlugs,
}: ThemeShowcaseProps) {
  const popularSwatches = [
    { accent: theme.palette.accent, tint: theme.palette.heroFrom },
    { accent: theme.palette.accentStrong, tint: "#F6FCF8" },
  ];

  return (
    <div
      style={{ backgroundColor: theme.palette.bg, color: theme.palette.text }}
      className="min-h-screen"
    >
      <VerdureNav
        currentThemeSlug={theme.slug}
        theme={theme}
        allThemeSlugs={allThemeSlugs}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 py-10 md:px-10 md:py-14">
        <section
          style={{
            backgroundColor: theme.palette.surface,
            border: `1px solid ${theme.palette.border}`,
          }}
          className="rounded-3xl p-7 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <p
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{
                  backgroundColor: theme.palette.chip,
                  color: "#FFFFFF",
                }}
              >
                Theme: {theme.name}
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Hire trusted freelancers and launch faster.
              </h1>
              <p
                className="text-base leading-7 md:text-lg"
                style={{ color: theme.palette.muted }}
              >
                {theme.vibe}. This is a portfolio-ready Fiverr-style concept for
                Verdure with bright green accents.
              </p>
              <div
                className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: theme.palette.accent,
                  color: "#FFFFFF",
                }}
              >
                2,400+ active freelancers this week
              </div>
              <div id="brief" className="flex flex-wrap gap-3">
                <button
                  className="rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    backgroundColor: theme.palette.accent,
                  }}
                >
                  Post a Project
                </button>
                <button
                  className="rounded-full border px-5 py-3 text-sm font-semibold"
                  style={{
                    borderColor: theme.palette.accent,
                    color: theme.palette.accent,
                  }}
                >
                  Browse Services
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: theme.palette.surface,
                border: `1px solid ${theme.palette.border}`,
              }}
              className="rounded-2xl p-5 shadow-sm"
            >
              <label className="mb-2 block text-sm font-semibold">
                What service are you looking for?
              </label>
              <input
                placeholder="Try: Brand logo, social ads, video intro..."
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{ borderColor: theme.palette.border }}
              />
              <div
                className="mt-4 flex flex-wrap gap-2 text-xs font-medium"
                style={{ color: theme.palette.muted }}
              >
                <span
                  className="rounded-full px-3 py-1"
                  style={{
                    backgroundColor: theme.palette.chip,
                    color: "#FFFFFF",
                  }}
                >
                  Fast Delivery
                </span>
                <span
                  className="rounded-full px-3 py-1"
                  style={{
                    backgroundColor: theme.palette.chip,
                    color: "#FFFFFF",
                  }}
                >
                  Verified Talent
                </span>
                <span
                  className="rounded-full px-3 py-1"
                  style={{
                    backgroundColor: theme.palette.chip,
                    color: "#FFFFFF",
                  }}
                >
                  Transparent Pricing
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="popular" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Popular Services</h2>
            <a
              href="#"
              className="text-sm font-semibold"
              style={{ color: theme.palette.accentStrong }}
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const swatch = popularSwatches[index % popularSwatches.length];

              return (
                <article
                  key={service.title}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: theme.palette.surface,
                    border: `1px solid ${theme.palette.border}`,
                  }}
                >
                  <div
                    className="mb-4 h-16 rounded-xl"
                    style={{ backgroundColor: swatch.tint }}
                  />
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: swatch.accent, color: "#FFFFFF" }}
                  >
                    {service.category}
                  </span>
                  <p
                    className="mb-3 mt-3 text-sm font-semibold"
                    style={{ color: theme.palette.muted }}
                  >
                    Starting at $35
                  </p>
                  <h3 className="text-lg font-semibold leading-7">
                    {service.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </section>

        <section id="sellers" className="space-y-5">
          <h2 className="text-2xl font-semibold">Top Freelancers</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {freelancers.map((freelancer) => (
              <article
                key={freelancer.name}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: theme.palette.surface,
                  border: `1px solid ${theme.palette.border}`,
                }}
              >
                <div
                  className="mb-4 h-11 w-11 rounded-full"
                  style={{
                    backgroundColor: theme.palette.accent,
                    border: `1px solid ${theme.palette.border}`,
                  }}
                />
                <h3 className="text-lg font-semibold">{freelancer.name}</h3>
                <p className="text-sm" style={{ color: theme.palette.muted }}>
                  {freelancer.role}
                </p>
                <p
                  className="mt-3 text-sm font-medium"
                  style={{ color: theme.palette.muted }}
                >
                  <span style={{ color: "#F59E0B" }}>★</span>{" "}
                  {freelancer.rating} • {freelancer.jobs} jobs
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-[#111827] py-8 text-center text-sm text-white">
        Verdure marketplace concept • Bright, clean, white-first interface
      </footer>
    </div>
  );
}
