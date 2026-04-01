import { CartPage } from "@/modules/cart/components/cart-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კალათა | Cart",
  description:
    "თქვენი შეკვეთის კალათა GalaKids ონლაინ მაღაზიაში. განხილეთ შერჩეული პროდუქტები და განაგრძეთ შეკვეთის პროცესი. | Your shopping cart at GalaKids online store. Review selected products and proceed to checkout.",
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
    "კალათა",
    "შეკვეთა",
    "ყიდვა",
    "checkout",
    "ონლაინ შოპინგი",
    "cart",
    "order",
    "purchase",
    "online shopping",
  ],
  openGraph: {
    title: "კალათა - GalaKids | Cart - GalaKids",
    description:
      "თქვენი შერჩეული პროდუქტები შეკვეთისთვის | Your selected products for checkout",
    url: "https://galakids.ge/cart",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids კალათა | Cart",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <div className="Container">
      <CartPage />
    </div>
  );
}
