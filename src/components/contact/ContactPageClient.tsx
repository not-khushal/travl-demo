
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  User,
  SendHorizontal,
  Plane,
  Compass,
  Map,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SubtleFooter } from '@/components/layout/SubtleFooter';

const SCROLL_THRESHOLD = 50;

export function ContactPageClient() {
  const { getTranslation } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Contact page:', headerSearchQuery);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Firebase Firestore logic
    console.log('Contact form submitted:', { name, email, message });
    alert(getTranslation('contactFormSubmitAlert', 'Thank you! Your message has been sent.'));
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Firebase Firestore logic
    console.log('Newsletter subscription:', { email: newsletterEmail });
    alert(getTranslation('newsletterSubmitAlert', 'Thank you for subscribing!'));
    setNewsletterEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-x-hidden">
      <Header
        isScrolled={isScrolled}
        searchQuery={headerSearchQuery}
        onSearchQueryChange={setHeaderSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      
      {/* Decorative floating icons */}
      <Plane className="absolute top-24 left-5 h-20 w-20 text-primary/10 -rotate-12 animate-pulse delay-300" />
      <Compass className="absolute top-1/2 right-5 h-16 w-16 text-accent/10 rotate-12 animate-pulse" />
      <Map className="absolute bottom-40 left-1/4 h-12 w-12 text-primary/5 animate-bounce" />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="text-center w-full max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {getTranslation('contactPageTitle', 'Let’s Start a Journey Together 🌍')}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12">
            {getTranslation('contactPageSubtitle', 'Have a question, a travel story, or a partnership idea? Drop us a line! Our team of explorers is always ready to chat about all things travel.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-16">
          {/* Image Column */}
          <div className="relative aspect-square md:aspect-auto rounded-2xl overflow-hidden shadow-2xl min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&h=1000&fit=crop"
              alt="Beautiful travel scenery with a lake and mountains"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="travel scenery lake mountains"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Form Column */}
          <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col justify-center">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                  <User className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelName', 'Name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={getTranslation('formPlaceholderName', 'Your Name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                  <Mail className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelEmail', 'Email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={getTranslation('formPlaceholderEmail', 'you@example.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                  <SendHorizontal className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelMessage', 'Message')}
                </Label>
                <Textarea
                  id="message"
                  placeholder={getTranslation('formPlaceholderMessage', 'Your message here...')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[120px] bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-primary/40 shadow-lg shadow-primary/20"
              >
                {getTranslation('formButtonSendMessage', 'Send Message')}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="w-full max-w-4xl mx-auto bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-8 sm:p-10 text-center mb-12">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-accent" />
                {getTranslation('newsletterTitle', 'Stay Wander-Inspired — Subscribe to trvalr’s Travel Journal')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              {getTranslation('newsletterDescription', 'Get daily updates and travel tips directly in your inbox.')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                    type="email"
                    placeholder={getTranslation('formPlaceholderEmail', 'you@example.com')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="flex-grow bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11"
                />
                <Button type="submit" className="h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                    {getTranslation('formButtonSubscribe', 'Subscribe')}
                </Button>
            </form>
        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
