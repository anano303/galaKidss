import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy",
  description:
    "GalaKids-ს კონფიდენციალურობის პოლიტიკა. გაიგეთ როგორ ვიცავთ და ვმუშავებთ თქვენს პირად ინფორმაციასთან. | GalaKids privacy policy. Learn how we protect and handle your personal information.",
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
    "კონფიდენციალურობა",
    "პოლიტიკა",
    "პირადი ინფორმაცია",
    "მონაცემთა დაცვა",
    "GDPR",
    "privacy",
    "policy",
    "personal information",
    "data protection",
  ],
  openGraph: {
    title: "კონფიდენციალურობის პოლიტიკა - GalaKids | Privacy Policy - GalaKids",
    description:
      "გაიგეთ როგორ ვიცავთ თქვენს პირად ინფორმაციას | Learn how we protect your personal information",
    url: "https://galakids.ge/privacy-policy",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids კონფიდენციალურობის პოლიტიკა | Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/privacy-policy",
    languages: {
      ka: "https://galakids.ge/privacy-policy",
      en: "https://galakids.ge/en/privacy-policy",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
