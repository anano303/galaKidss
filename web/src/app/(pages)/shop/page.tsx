import { Suspense } from "react";
import ShopContent from "./ShopContent";
import HeartLoading from "@/components/HeartLoading/HeartLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მაღაზია | Shop",
  description:
    "იყიდეთ ტანსაცმელი, ფეხსაცმელი და აქსესუარები GalaKids ონლაინ მაღაზიაში. ფართო ასორტიმენტი, მაღალი ხარისხი და ხელმისაწვდომი ფასები. | Shop clothing, shoes and accessories at GalaKids online store. Wide selection, high quality and affordable prices.",
  keywords: [
    "galaKids",
    "",
    " ტანსაცმელი",
    " ფეხსაცმელი",
    " აქსესუარები",
    " ონლაინ მაღაზია",
    " მაღაზია",
    " ტანსაცმლის მაღაზია",
    " ფეხსაცმლის მაღაზია",
    " აქსესუარების მაღაზია",
    " ონლაინ მაღაზია საქართველოში",
    " მაღაზია საქართველოში",
    " მაისურები",
    " შარვლები",
    " კაბები",
    " ფეხსაცმელი",
    " აქსესუარები",
    "clothing for kids",
    "shoes for kids",
    "accessories for kids",
    "online store for kids",
    "kids online store",
    "galaKids store",
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "მაღაზია",
    "ონლაინ შოპინგი",
    "საქართველო",
    "მოდა",
    "clothing",
    "shoes",
    "accessories",
    "shop",
    "online shopping",
    "Georgia",
    "fashion",
  ],
  openGraph: {
    title:
      "GalaKids მაღაზია - ტანსაცმელი და აქსესუარები | Shop - Clothing and Accessories",
    description:
      "ყიდვა-გაყიდვა ტანსაცმელი, ფეხსაცმელი და აქსესუარების ფართო ასორტიმენტით | Shop wide selection of clothing, shoes and accessories",
    url: "https://galakids.ge/shop",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids მაღაზია | Shop",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/shop",
    languages: {
      ka: "https://galakids.ge/shop",
      en: "https://galakids.ge/en/shop",
    },
  },
};

const ShopPage = () => {
  return (
    <div>
      <Suspense fallback={<HeartLoading size="medium" />}>
        <ShopContent />
      </Suspense>
    </div>
  );
};

export default ShopPage;
