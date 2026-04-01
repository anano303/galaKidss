import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "შესვლა | Login",
  description:
    "შედით თქვენს GalaKids ანგარიშში. მარტივი და უსაფრთხო ავტორიზაცია ონლაინ შოპინგისთვის. | Log in to your GalaKids account. Simple and secure authorization for online shopping.",
  keywords: [
    "GalaKids",
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
    "შესვლა",
    "ავტორიზაცია",
    "ანგარიში",
    "ლოგინი",
    "GalaKids",
    "login",
    "authorization",
    "account",
    "sign in",
  ],
  openGraph: {
    title: "შესვლა - GalaKids | Login - GalaKids",
    description:
      "შედით თქვენს ანგარიშში უსაფრთხოდ | Log in to your account securely",
    url: "https://galakids.ge/login",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids შესვლა | Login",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/login",
    languages: {
      ka: "https://galakids.ge/login",
      en: "https://galakids.ge/en/login",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
