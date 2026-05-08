export type ThemeConfig = {
  slug: string;
  name: string;
  vibe: string;
  palette: {
    bg: string;
    surface: string;
    heroFrom: string;
    heroTo: string;
    accent: string;
    accentStrong: string;
    text: string;
    muted: string;
    border: string;
    chip: string;
  };
};

export const themes: ThemeConfig[] = [
  {
    slug: "dew",
    name: "Dewlight",
    vibe: "Bright white layout with strong green marketplace accents",
    palette: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      heroFrom: "#E6F7EB",
      heroTo: "#E6F7EB",
      accent: "#41AB5D",
      accentStrong: "#2D8A47",
      text: "#111827",
      muted: "#6B7280",
      border: "#DBEEE1",
      chip: "#41AB5D",
    },
  },
  {
    slug: "linen",
    name: "Linen Grove",
    vibe: "Clean and premium with white cards and confident green action color",
    palette: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      heroFrom: "#EAF9EE",
      heroTo: "#EAF9EE",
      accent: "#408830",
      accentStrong: "#408830",
      text: "#111827",
      muted: "#6B7280",
      border: "#D9ECDF",
      chip: "#408830",
    },
  },
  {
    slug: "seafoam",
    name: "Seafoam Pop",
    vibe: "High-contrast white marketplace with clean and lively green actions",
    palette: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      heroFrom: "#DFF6E9",
      heroTo: "#DFF6E9",
      accent: "#35B874",
      accentStrong: "#24945D",
      text: "#111827",
      muted: "#6B7280",
      border: "#CAE9D8",
      chip: "#35B874",
    },
  },
  {
    slug: "sprout",
    name: "Sprout Luxe",
    vibe: "White-dominant luxury style with bold green highlights",
    palette: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      heroFrom: "#EDF9F0",
      heroTo: "#EDF9F0",
      accent: "#4BB76A",
      accentStrong: "#338A4B",
      text: "#111827",
      muted: "#6B7280",
      border: "#DEEFE3",
      chip: "#4BB76A",
    },
  },
];

export const themeMap = Object.fromEntries(themes.map((theme) => [theme.slug, theme]));
