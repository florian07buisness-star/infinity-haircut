import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });

export const metadata: Metadata = {
  title: "INFINITY haircut — Premium Barber in Götzis",
  description: "Dein Premium Barber im Garnmarkt Götzis. Haarschnitt, Bartrasur, Styling & mehr. ⭐ 5.0 aus 150+ Bewertungen. Jetzt Termin buchen!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
