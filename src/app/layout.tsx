"use client";

import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

import Header from "../components/header/header";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store"

import { PersistGate } from "redux-persist/integration/react";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const openSans = Open_Sans({
  variable: "--font-open_sans",
  subsets: ["latin"],
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
        <Header/>
        {children}
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
