import { notFound } from "next/navigation";
import ThemeShowcase from "../../components/ThemeShowcase";
import { themeMap, themes } from "../../themes";

type ThemePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = themeMap[slug];

  if (!theme) {
    notFound();
  }

  return (
    <ThemeShowcase
      theme={theme}
      allThemeSlugs={themes.map((item) => item.slug)}
    />
  );
}
