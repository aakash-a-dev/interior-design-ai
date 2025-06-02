import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";

let title = "Dream Space Generator";
let description = "Generate your dream space in seconds.";
let ogimage = "https://roomgpt-demo.vercel.app/og-image.png";
let sitename = "Interior AI";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://roomgpt-demo.vercel.app",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
