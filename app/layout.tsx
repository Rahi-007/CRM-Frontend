import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display, Salsa } from "next/font/google";
import { cn } from "@/lib/utils";
import ProviderConfig from "@/provider/providerConfig";
import Root from "./Root";
import "./globals.css";

const salsa = Salsa({
  variable: "--font-salsa",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seema's Cloud Talk",
  description: "Team management software distribute the task and Role based Access",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        salsa.variable,
        geistSans.variable,
        geistMono.variable,
        notoSans.variable,
        playfairDisplayHeading.variable
      )}
    >
      <body className="min-h-full">
        <ProviderConfig>
          <Root>{children}</Root>
        </ProviderConfig>
      </body>
    </html>
  );
}
