import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App by Qais Sultani",
  description:
    "Realtime Chat Application Developed By Muhammad Qais Sultani Using NextJS.",
  authors: [
    {
      name: "Muhammad Qais Sultani",
      url: "https://www.linkedin.com/in/muhammad-qais-sultani/",
    },
  ],
  creator: "Muhammad Qais Sultani",
  keywords: [
    "Chat Application",
    "Messaging Application",
    "Qais Sultani",
    "ReactJS",
    "NextJS",
    "Realtime Chat Application",
  ],
  openGraph: {
    type: "website",
    title: "Chat App by Qais Sultani",
    description:
      "Realtime Chat Application Developed By Muhammad Qais Sultani Using NextJS.",
    siteName: "Chat App",
    url: "https://github.com/QaisSultani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
