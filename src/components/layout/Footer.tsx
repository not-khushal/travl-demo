
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Youtube, Play, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export function Footer() {
  const { getTranslation } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', { email: newsletterEmail });
    alert(getTranslation('newsletterSubmitAlert', 'Thank you for subscribing!'));
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-background text-foreground">
      {/* New Subtle Newsletter Signup Section */}
      <section className="relative py-20 md:py-28 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop"
            alt="Ambient travel background of a serene lake and mountains"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.4]"
            data-ai-hint="lake mountains serene"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            {getTranslation('footerNewsletterTitleV2', 'Join the Journey')}
          </h2>
          <p className="text-neutral-200 mb-8 max-w-xl mx-auto">
            {getTranslation('footerNewsletterDescriptionV2', "Receive travel inspiration, stories, and exclusive planning tips directly in your inbox.")}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex items-center justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder={getTranslation('footerNewsletterEmailPlaceholder', "your.email@example.com")}
              className="h-12 bg-white/10 dark:bg-black/20 text-white placeholder:text-neutral-300 border-neutral-400 focus:ring-primary focus:border-primary rounded-l-md rounded-r-none border-r-0"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-md rounded-l-none px-6"
            >
              {getTranslation('footerNewsletterButtonSubscribe', 'Subscribe')}
            </Button>
          </form>
        </div>
      </section>

      {/* Main Footer Links Section */}
      <section className="bg-card py-12 md:py-16 px-[60px]">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left Part: Logo & Tagline */}
          <div className="mb-8 md:mb-0 md:w-1/4 lg:w-1/5">
            <h2 className="text-4xl font-bold text-primary font-headline">trvalr</h2>
            <p className="text-sm text-muted-foreground mt-2">Your AI travel agent.</p>
          </div>

          {/* Right Part: Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 md:w-3/4 lg:w-4/5">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('about', 'About')}</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('contact', 'Contact')}</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('howItWorks', 'How it works')}</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('faq', 'FAQ')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/mapper" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mapper</Link></li>
                <li><Link href="/driftin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Driftin</Link></li>
                <li><Link href="/companions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Companions</Link></li>
                <li><Link href="/connect" className="text-sm text-muted-foreground hover:text-primary transition-colors">Connect</Link></li>
                <li><Link href="/orbit" className="text-sm text-muted-foreground hover:text-primary transition-colors">Orbit</Link></li>
                <li><Link href="/smart-trails" className="text-sm text-muted-foreground hover:text-primary transition-colors">SmartTrails</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('privacyPolicy', 'Privacy')}</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">{getTranslation('termsOfService', 'Terms')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Top Countries</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Spain</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Italy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Maldives</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Indonesia</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Japan</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Countries</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Plan</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Couple Trip Planner</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Family Trip Planner</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar Section */}
      <div className="border-t border-border/50 py-6 px-[60px]">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="mb-4 md:mb-0">
            © {currentYear} All right reserved by trvalr AI GmbH
          </p>
          <div className="flex space-x-3">
            <a href="#" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10">
              <Play className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10">
              <Youtube className="h-5 w-5" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
