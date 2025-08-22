'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass } from 'lucide-react';

export function CompanionsHeroSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="relative w-full h-[calc(100vh-7rem)] flex items-center justify-center text-center text-white">
      <Image
        src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1920&h=1080&fit=crop"
        alt={getTranslation('companionsHeroAlt', 'Travelers with local companions exploring a vibrant market')}
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-75"
        data-ai-hint="travelers map"
        priority
      />
      <div className="relative z-10 p-4 md:p-8 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          {getTranslation('companionsHeroTitle', 'Never Travel Alone — Meet the Locals Who Know It Best')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-body text-neutral-200">
          {getTranslation('companionsHeroSubtitle', 'Hire verified, friendly local companions who speak the language, know the culture, and walk you through hidden gems, safe paths, and unforgettable stories.')}
        </p>
        <Button
          className="bg-transparent hover:bg-transparent border border-white/80 text-white rounded-lg backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:ring-primary px-8 py-3 text-lg"
          asChild
        >
          <Link href="/connect">
            <Compass className="mr-2 h-5 w-5" />
            {getTranslation('companionsHeroButton', 'Find a Companion Near Me')}
          </Link>
        </Button>
      </div>
    </section>
  );
}
