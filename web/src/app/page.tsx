// import HomePagesHead from "@/components/homePagesHead/homePagesHead";
// import HomePageShop from "@/components/homePageShop/homePageShop";
// import TopItems from "@/components/TopItems/TopItems";
// import PinkCharacter from "@/components/PinkCharacter/PinkCharacter";
// // import HomePageAds from "@/components/home-page-ads/home-page-ads";

// const Home = () => {
//   return (
//     <div>
//       <HomePagesHead />

//       <TopItems />
//       {/* <HomePageAds /> */}
//       <div
//         className="site-timer-container"
//         style={{ position: "relative", zIndex: 20 }}
//       >
//         {/* ...existing site-timer code... */}
//       </div>
//       <HomePageShop />
//       <PinkCharacter />
//     </div>
//   );
// };

// export default Home;

import EntryGate from "./EntryGate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მთავარი გვერდი | Home Page",
  description:
    "GalaKids - ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. აღმოაჩინეთ მაღალი ხარისხის პროდუქტები და სწრაფი მიწოდება. | GalaKids - Online store for clothing, shoes and accessories in Georgia. Discover high-quality products and fast delivery.",
  keywords: [
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
    "clothing for pipinikas",
    "shoes for pipinikas",
    "accessories for pipinikas",
    "online store for pipinikas",
    "pipinika online store",
    "pipinika store",
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "ონლაინ მაღაზია",
    "საქართველო",
    "მოდა",
    "შოპინგი",
    "clothing",
    "shoes",
    "accessories",
    "online shop",
    "Georgia",
    "fashion",
    "shopping",
  ],
  openGraph: {
    title:
      "GalaKids - ტანსაცმლისა და აქსესუარების ონლაინ მაღაზია | Clothing & Accessories Online Store",
    description:
      "აღმოაჩინეთ ექსკლუზიური ტანსაცმელი, ფეხსაცმელი და აქსესუარები GalaKids-ში | Discover exclusive clothing, shoes and accessories at GalaKids",
    url: "https://galakids.ge",
    images: [
      {
        url: "https://galakids.ge/logo.png",
        width: 1200,
        height: 630,
        alt: "GalaKids - ონლაინ მაღაზია | Online Store",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge",
    languages: {
      ka: "https://galakids.ge",
      en: "https://galakids.ge/en",
    },
  },
};

export default function Home() {
  return <EntryGate />;
}
