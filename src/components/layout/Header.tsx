
'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Globe, Menu, Mic, SendHorizontal, Coins, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useCurrency, type Currency } from '@/contexts/CurrencyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  showCurrencySelector?: boolean;
}

export function Header({
  isScrolled,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  showCurrencySelector = false,
}: HeaderProps) {
  const { availableLanguages, selectedLanguage, setSelectedLanguage, getTranslation } = useLanguage();
  const { availableCurrencies, selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleNavClick = (navItem: string) => {
    console.log('Header - Navigation item clicked:', navItem);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    console.log('Language selected:', language.name);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    console.log('Currency selected:', currency.code);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "border-border/40 shadow-md bg-background/95" : "border-transparent bg-background/80"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        {/* Left Group */}
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex items-center space-x-2" onClick={() => handleNavClick('Logo/Home')}>
            <Globe className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl font-headline text-primary">trvalr</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link href="/mapper" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Mapper')}>
              {getTranslation('mapper', 'Mapper')}
            </Link>
            <Link href="/driftin" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Driftin')}>
              {getTranslation('driftin', 'Driftin')}
            </Link>
            <Link href="/orbit" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Orbit')}>
              {getTranslation('orbit', 'Orbit')}
            </Link>
            <Link href="/smart-trails" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('SmartTrails')}>
              {getTranslation('smartTrails', 'SmartTrails')}
            </Link>
            <Link href="/pricetime" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('PriceTime')}>
              PriceTime
            </Link>
            <Link href="/visascan" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('VisaScan')}>
              VisaScan
            </Link>
            <Link href="/appscout" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('AppScout')}>
              AppScout
            </Link>
          </nav>
        </div>

        {/* Right Group (Search + Buttons) */}
        <div className="flex flex-1 items-center justify-end gap-x-2">
          {isScrolled && (
            <div className="hidden w-full px-4 md:flex">
                <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
                    <Input
                    type="text"
                    placeholder={getTranslation('headerSearchPlaceholder', "Search trvalr...")}
                    className="w-full pr-20 md:pr-24 pl-4 text-sm h-10 rounded-full border-border bg-background/70 focus:border-primary shadow-sm"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') onSearchSubmit(); }}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center space-x-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary hover:bg-muted/30 rounded-full w-8 h-8"
                        onClick={() => console.log('Mic clicked in Header')}
                    >
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Use microphone</span>
                    </Button>
                    <Button
                        variant="default"
                        size="icon"
                        className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground w-8 h-8"
                        onClick={onSearchSubmit}
                    >
                        <SendHorizontal className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                    </div>
                </div>
            </div>
          )}

          {showCurrencySelector && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label={getTranslation('selectCurrency', 'Select Currency')}
                  className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 flex items-center px-2 sm:px-3 h-9"
                >
                  <Coins className="h-5 w-5 mr-1 sm:mr-2" />
                  <span className="text-xs font-medium">{selectedCurrency.code}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
                {availableCurrencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency)}
                    className={cn(
                      selectedCurrency.code === currency.code && "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary",
                      "hover:bg-primary/5 focus:bg-primary/10 flex justify-between items-center"
                    )}
                  >
                    <span>{currency.name} ({currency.symbol})</span>
                    <span className="text-xs opacity-70 ml-2">{currency.code}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label={getTranslation('selectLanguage', 'Select Language')}
                className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 flex items-center px-2 sm:px-3 h-9"
              >
                <Globe className="h-5 w-5 mr-0 sm:mr-1" />
                <span className="hidden sm:inline text-xs">{selectedLanguage.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={cn(
                    selectedLanguage.code === lang.code && "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary",
                    "hover:bg-primary/5 focus:bg-primary/10"
                  )}
                >
                  <span className="mr-2 text-xs w-6 text-center opacity-70">{lang.code.toUpperCase()}</span>
                  {lang.name} {lang.nativeName && lang.name !== lang.nativeName && `(${lang.nativeName})`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label={getTranslation('userProfile', 'User Profile')}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-muted/30 p-1.5 text-foreground/70 hover:bg-primary/10 hover:text-primary"
              >
                <User className="h-5 w-5" />
                <Menu className="h-5 w-5 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                 <Link href="/auth/login">
                    {getTranslation('login', 'Login')}
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/profile/phil-harrison">
                    {getTranslation('userProfile', 'Profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/settings">
                  {getTranslation('settings', 'Settings')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/subscription">
                  {getTranslation('manageSubscription', 'Manage Subscription')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/about">{getTranslation('about', 'About')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/contact">{getTranslation('contact', 'Contact')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/terms">{getTranslation('termsOfService', 'Terms of service')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
