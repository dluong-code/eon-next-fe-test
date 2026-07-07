import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "E.ON Next Meter Reading",
  description: "Submit your electricity meter readings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AppRouterCacheProvider options={{ key: "css" }}>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
