// Base Page Metadata, src/layouts/BaseLayout.astro
export const BRAND_NAME = "RealtyReach";
export const SITE_TITLE = "RealtyReach";
export const SITE_DESCRIPTION = "Empowering Real Estate Agents with Digital Marketing Insights";

// Tags Page Metadata, src/pages/tags/index.astro
export const Tags_TITLE = "RealtyReach - All Tags";
export const Tags_DESCRIPTION =
  "RealtyReach - All tags and the count of articles related to each tag";

// Tags Page Metadata, src/pages/tags/[tag]/[page].astro
export function getTagMetadata(tag: string) {
  return {
    title: `All articles on '${tag}' tag in RealtyReach`,
    description: `Explore articles about ${tag} for different perspectives and in-depth analysis.`,
  };
}

// Category Page Metadata, src/pages/category/[category]/[page].astro
export function getCategoryMetadata(category: string) {
  return {
    title: `All articles in '${category}' category in RealtyReach`,
    description: `Browse all articles under the ${category} category in RealtyReach`,
  };
}

// Header Links, src/components/Header.astro
export const HeaderLinks = [
  { href: "/newsletter", title: "Newsletter" },
  { href: "/posts", title: "Blog" },
  { href: "/ebook", title: "Ebook" },
];

// Footer Links, src/components/Footer.astro
export const FooterLinks = [
  { href: "/newsletter", title: "Newsletter" },
  { href: "/posts", title: "Blog" },
  { href: "/ebook", title: "Ebook" },
];

// Social Links, src/components/Footer.astro
export const SocialLinks = [
  { href: "/rss.xml", icon: "tabler:rss", label: "RSS" },
  {
    href: "https://x.com/RealtyReach_",
    icon: "tabler:brand-x",
    label: "X",
  },
  {
    href: "https://instagram.com/realtyreach_",
    icon: "tabler:brand-instagram",
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@realtyreach_",
    icon: "tabler:brand-tiktok",
    label: "TikTok",
  },
  {
    href: "https://www.youtube.com/@Realty_Reach",
    icon: "tabler:brand-youtube",
    label: "Youtube",
  },
];

