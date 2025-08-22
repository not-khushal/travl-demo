'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function DriftinHeroSection() {
  const { getTranslation } = useLanguage();

  const handleExploreListings = () => {
    console.log('Explore Listings clicked');
    // Navigate to listings page or perform search
  };

  return (
    <section className="relative w-full h-[calc(100vh-7rem)] flex items-center justify-center text-center text-white">
      <Image
        src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1920&h=1080&fit=crop"
        alt={getTranslation('driftinHeroAlt', 'Travelers with a map in a scenic location')}
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-75"
        data-ai-hint="travelers map"
        priority
      />
      <div className="relative z-10 p-4 md:p-8 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {getTranslation('driftinHeroTitle', 'Welcome to Driftin')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-body">
          {getTranslation('driftinHeroSubtitle', 'Driftin is a modern couch surfing platform that connects hosts and travelers. Discover unique stays, build connections, and experience the world from a local\'s perspective.')}
        </p>
        <Button
          className="bg-transparent hover:bg-transparent border border-white/80 text-white rounded-lg backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:ring-primary px-8 py-3 text-lg"
          onClick={handleExploreListings}
        >
          {getTranslation('driftinHeroButton', 'Explore Listings')}
        </Button>
      </div>
    </section>
  );
}
