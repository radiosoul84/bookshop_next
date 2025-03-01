import ProfilePage from "./profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "User Profile",
  description: "Bookshop using Google Books API",
};

export default function Profile() {
  return <ProfilePage />;
}
