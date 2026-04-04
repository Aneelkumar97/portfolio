import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppProvider } from "@/contexts/AppContext";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aneel Kumar | Senior Frontend Engineer | React & JavaScript Expert",
  description: "Aneel Kumar - Senior Frontend Engineer with 7+ years of React & JavaScript expertise. Comprehensive showcase of advanced concepts, patterns, and real-world applications.",
  keywords: ["Aneel Kumar", "React", "JavaScript", "Frontend Engineer", "TypeScript", "Next.js", "Portfolio", "Senior Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const root = document.documentElement;
                
                if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  root.classList.add(systemTheme);
                } else {
                  root.classList.add(theme);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AppProvider>
            <ConditionalNavigation />
            {children}
          </AppProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
