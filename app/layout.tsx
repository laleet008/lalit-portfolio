import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ClientChrome } from "@/components/layout/ClientChrome";
import { ClientExtras } from "@/components/layout/ClientExtras";
import { INTRO_SCRIPT, LoadingScreen } from "@/components/layout/LoadingScreen";
import { Footer } from "@/components/layout/Footer";
import { Grain } from "@/components/layout/Grain";
import { Nav } from "@/components/layout/Nav";
import { Providers } from "@/components/layout/Providers";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { profile, site } from "@/content";
import { themeCss, tokens } from "@/lib/theme";
import { cn } from "@/lib/cn";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.title.split(" — ")[0]}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: "website", siteName: site.name, locale: "en_GB", url: "/", images: [{ url: "/og/home.png", width: 1200, height: 630, alt: site.title }] },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: tokens.dark.bg },
    { media: "(prefers-color-scheme: light)", color: tokens.light.bg },
  ],
};

/* Without JS, reveal-animated content must still be visible. */
const noJsCss =
  "[data-reveal],[data-reveal] *,[data-reveal-item],[data-split] *{opacity:1!important;transform:none!important}.dg [data-fade],.dg [data-draw]{opacity:1!important;translate:none!important;stroke-dashoffset:0!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(display.variable, sans.variable, mono.variable)}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noJsCss }} />
        </noscript>
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[60] -translate-y-24 print:hidden bg-fg px-4 py-3 font-mono text-meta uppercase text-bg transition-transform focus:translate-y-0"
          >
            {site.skipLink}
          </a>
          <Nav email={profile.email} />
          {children}
          <Footer />
          <Grain />
          <LoadingScreen name={site.name} skipLabel={site.loading.skip} />
          <ClientChrome />
          <RevealObserver />
          <ClientExtras />
        </Providers>
      </body>
    </html>
  );
}
