import CartPage from "./cart";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart",
  description: "Bookshop using Google Books API",
};
export default function Cart() {
  return <CartPage />;
}
