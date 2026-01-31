import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinEmpowerHer - Financial Literacy for Women",
  description:
    "Learn personal finance through fun, bite-sized lessons. Build confidence with money, one lesson at a time.",
};

// Check if Clerk keys are configured
const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes(
    "your_publishable_key",
  );

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  );

  // Only wrap with ClerkProvider if keys are configured
  if (isClerkConfigured) {
    return (
      <ClerkProvider>
        <html lang="en">{body}</html>
      </ClerkProvider>
    );
  }

  return <html lang="en">{body}</html>;
}
