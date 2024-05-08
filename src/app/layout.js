import { Manrope } from "next/font/google";
import Layout from "@/components/layout/Layout";
import ReactQueryProvider from "@/config/provider/ReactQueryProvider";
import NextUIThemeProvider from "@/config/provider/NextUIThemeProvider";
// import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import {
  metaDescription,
  metaTitle,
  ogImage,
  siteURL,
} from "@/config/constant";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(siteURL),
  title: {
    default: metaTitle,
    template: `%s - ${metaTitle}`,
  },
  description: metaDescription,
  icons: {
    icon: ogImage,
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    siteName: metaTitle,
    url: siteURL,
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    cardType: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    handle: "@nopaldos",
    site: metaTitle,
    images: [ogImage],
  },
};

export default async function RootLayout({ children }) {
  // const configData = await getAllConfigDataRequest();
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <ReactQueryProvider>
          <NextUIThemeProvider>
            <Layout>{children}</Layout>
          </NextUIThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
