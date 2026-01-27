import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Improves font loading performance
});

export const metadata: Metadata = {
  title: "Sunnah Steps Initiative - Reviving the Sunnah",
  description: "An educational and community-focused initiative committed to reviving the Sunnah of the Prophet Muhammad ﷺ in daily life through practical application.",
  // Adding icons ensures your client's site looks professional in browser tabs
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}