import Link from "next/link";
import type { ThemeConfig } from "../themes";

type VerdureNavProps = {
  currentThemeSlug: string;
  theme: ThemeConfig;
  allThemeSlugs: string[];
};

export default function VerdureNav({
  currentThemeSlug,
  theme,
  allThemeSlugs,
}: VerdureNavProps) {
  return (
    <header
      style={{
        borderBottom: `1px solid ${theme.palette.border}`,
        backgroundColor: theme.palette.surface,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight"
          style={{ color: theme.palette.accentStrong }}
        >
          Verdure
        </Link>

        <div
          className="hidden items-center gap-6 text-sm font-medium md:flex"
          style={{ color: theme.palette.muted }}
        >
          <a className="hover:text-[#2D8A47]" href="#popular">
            Popular Services
          </a>
          <a className="hover:text-[#2D8A47]" href="#sellers">
            Top Sellers
          </a>
          <a className="hover:text-[#2D8A47]" href="#brief">
            Post a Brief
          </a>
        </div>

        <div className="flex items-center gap-2">
          {allThemeSlugs.map((slug) => {
            const active = slug === currentThemeSlug;

            return (
              <Link
                key={slug}
                href={`/themes/${slug}`}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide"
                style={{
                  borderColor: active
                    ? theme.palette.accentStrong
                    : theme.palette.border,
                  color: active ? "#ffffff" : "#6B7280",
                  backgroundColor: active
                    ? theme.palette.accentStrong
                    : theme.palette.surface,
                }}
              >
                {slug}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
