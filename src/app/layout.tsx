
import type { Metadata } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext'; // Added import
import { ThemeProvider } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'trvalr',
  description: 'Plan your next adventure with trvalr',
};

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "font-body antialiased transition-colors duration-300",
          playfairDisplay.variable,
          ptSans.variable
      )}>
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider> {/* Wrapped with CurrencyProvider */}
              {children}
              <Toaster />
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
