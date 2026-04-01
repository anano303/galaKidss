import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "წესები და პირობები | Terms & Conditions",
  description:
    "GalaKids-ს წესები და პირობები. გაეცანით ჩვენი ვებგვერდით სარგებლობის პირობებს. | GalaKids Terms and Conditions. Learn about the terms of using our website.",
  keywords: [
    "galakids",
    "წესები და პირობები",
    "მომსახურების პირობები",
    "terms and conditions",
    "terms of service",
  ],
  openGraph: {
    title: "წესები და პირობები - GalaKids | Terms & Conditions - GalaKids",
    description:
      "გაეცანით ჩვენი ვებგვერდით სარგებლობის პირობებს | Learn about the terms of using our website",
    url: "https://galakids.ge/terms-conditions",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids წესები და პირობები | Terms & Conditions",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/terms-conditions",
    languages: {
      ka: "https://galakids.ge/terms-conditions",
      en: "https://galakids.ge/en/terms-conditions",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
