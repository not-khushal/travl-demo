
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { MidSection } from '@/components/home/MidSection';
import { Footer } from '@/components/layout/Footer';
import { TravelExplorerSection } from '@/components/home/TravelExplorerSection';
import { StickyExplorerNav } from '@/components/home/StickyExplorerNav';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components that are below the fold
const FeaturesShowcaseSection = dynamic(() =>
  import('@/components/home/FeaturesShowcaseSection').then((mod) => mod.FeaturesShowcaseSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const PerfectTripSection = dynamic(() =>
  import('@/components/home/PerfectTripSection').then((mod) => mod.PerfectTripSection),
  { loading: () => <Skeleton className="h-[400px] w-full" /> }
);
const TopTripsSection = dynamic(() =>
  import('@/components/home/TopTripsSection').then((mod) => mod.TopTripsSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const EveryStepSection = dynamic(() =>
  import('@/components/home/EveryStepSection').then((mod) => mod.EveryStepSection),
  { loading: () => <Skeleton className="h-[600px] w-full" /> }
);


const SCROLL_THRESHOLD = 50;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tripQuery, setTripQuery] = useState('');
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const explorerSectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

    if (explorerSectionRef.current) {
      const { top } = explorerSectionRef.current.getBoundingClientRect();
      // Show sticky nav when the top of the TravelExplorerSection is at or above the header height (approx 80px)
      setShowStickyNav(top <= 80);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted:', searchQuery);
  };

  const handleHeroTripQuerySubmit = () => {
    console.log('Hero trip query submitted:', tripQuery);
    if (tripQuery.trim()) {
      router.push('/trip-details');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />

      <AnimatePresence>
        {showStickyNav && <StickyExplorerNav />}
      </AnimatePresence>
      
      <main className="flex-grow">
        <HeroSection
          tripQuery={tripQuery}
          onTripQueryChange={setTripQuery}
          onTripQuerySubmit={handleHeroTripQuerySubmit}
        />
        
        <div ref={explorerSectionRef}>
          <TravelExplorerSection />
        </div>
        
        <MidSection />
        <FeaturesShowcaseSection />
        <PerfectTripSection />
        <TopTripsSection />
        <EveryStepSection />
      </main>
      <Footer />
    </div>
  );
}
