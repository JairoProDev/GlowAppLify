import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DeepDiveModal } from "@/components/landing/DeepDiveModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlowAppLify - Transform Goals into Execution Boards",
  description: "Transform your goals into actionable execution boards in seconds using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="antialiased h-full">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
        <DeepDiveModal />
      </body>
    </html>
  );
}
