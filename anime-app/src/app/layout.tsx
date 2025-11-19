import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer.ui";

export const metadata: Metadata = {
  title: "Anime GraphQL Challenge",
  description: "Anime information page powered by a public GraphQL API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
