import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  Inter,
  Roboto_Mono,
  Space_Grotesk,
  IBM_Plex_Sans,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const logo = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-logo",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${logo.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
