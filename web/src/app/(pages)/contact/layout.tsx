import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონტაქტი | Contact",
  description:
    "დაგვიკავშირდით GalaKids-ს გუნდს. ჩვენ მზად ვართ გიპასუხოთ თქვენს შეკითხვებს და მოგემსახუროთ საუკეთესო ხარისხით. | Contact GalaKids team. We are ready to answer your questions and provide the best service.",
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
    "კონტაქტი",
    "საკონტაქტო ინფორმაცია",
    "მხარდაჭერა",
    "მომსახურება",
    "GalaKids",
    "contact",
    "support",
    "customer service",
  ],
  openGraph: {
    title: "კონტაქტი - GalaKids | Contact - GalaKids",
    description:
      "დაგვიკავშირდით და მიიღეთ პროფესიონალური კონსულტაცია | Contact us and get professional consultation",
    url: "https://galakids.ge/contact",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids კონტაქტი | Contact",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/contact",
    languages: {
      ka: "https://galakids.ge/contact",
      en: "https://galakids.ge/en/contact",
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
