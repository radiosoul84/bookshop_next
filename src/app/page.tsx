import Head from "next/head";
import Slider from "@/components/slider/slider";
import Shop from "@/components/shop/shop";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "BookShop: Books",
  description: "Bookshop using Google Books API",
};

export default function Home() {
  return (
    <>
      <Slider />
      <Shop />
    </>
  );
}
