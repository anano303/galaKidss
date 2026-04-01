import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "პროდუქტები | Products",
  description:
    "დეტალური ინფორმაცია პროდუქტების შესახებ GalaKids ონლაინ მაღაზიაში. მაღალი ხარისხის ტანსაცმელი, ფეხსაცმელი და აქსესუარები. | Detailed information about products at GalaKids online store. High-quality clothing, shoes and accessories.",
  keywords: [
    "GalaKids",
    "GalaKids ტანსაცმელი",
    "GalaKids ფეხსაცმელი",
    "GalaKids აქსესუარები",
    "GalaKids ონლაინ მაღაზია",
    "GalaKids მაღაზია",
    "GalaKids ტანსაცმლის მაღაზია",
    "GalaKids ფეხსაცმლის მაღაზია",
    "GalaKids აქსესუარების მაღაზია",
    "GalaKids ონლაინ მაღაზია საქართველოში",
    "GalaKids მაღაზია საქართველოში",
    "GalaKids მაისურები",
    "GalaKids შარვლები",
    "GalaKids კაბები",
    "GalaKids ფეხსაცმელი",
    "GalaKids აქსესუარები",
    "clothing for GalaKids",
    "shoes for GalaKids",
    "accessories for GalaKids",
    "online store for GalaKids",
    "GalaKids online store",
    "GalaKids store",
    "პროდუქტები",
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "ონლაინ მაღაზია",
    "ყიდვა",
    "products",
    "clothing",
    "shoes",
    "accessories",
    "online shop",
    "purchase",
  ],
  openGraph: {
    title: "პროდუქტები - GalaKids | Products - GalaKids",
    description:
      "იხილეთ პროდუქტების დეტალური ინფორმაცია და შეიძინეთ | View detailed product information and purchase",
    type: "website",
    url: "https://galakids.ge/products",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids პროდუქტები | Products",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/products",
    languages: {
      ka: "https://galakids.ge/products",
      en: "https://galakids.ge/en/products",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
