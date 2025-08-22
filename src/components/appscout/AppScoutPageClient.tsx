
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Rocket, Edit, ListPlus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppCategory, App } from './types';
import { AppCategoryTabs } from './AppCategoryTabs';
import { AppCard } from './AppCard';
import { Input } from '@/components/ui/input';
import { AppFilterButtons } from './AppFilterButtons';

// Expanded mock data for demonstration
const appData: Record<string, App[]> = {
  tokyo: [
    { id: 'gojek-jp', name: 'GO', logoUrl: 'https://placehold.co/64x64/2dd4bf/ffffff/png?text=GO', logoAiHint: 'go logo', description: 'Japan\'s most popular taxi-hailing app. Reliable and easy to use.', badges: ['Local Favorite', 'Safe to Use'], rating: 4.7, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['essentials', 'highly-rated'] },
    { id: 'uber-jp', name: 'Uber', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/512px-Uber_logo_2018.png', logoAiHint: 'uber logo', description: 'Available in major cities, but with fewer cars than local apps.', badges: ['Global Favorite'], rating: 4.6, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['highly-rated'] },
    { id: 'suica-jp', name: 'Suica', logoUrl: 'https://placehold.co/64x64/22c55e/ffffff/png?text=S', logoAiHint: 'suica logo', description: 'The essential IC card for all public transit, now on your phone.', badges: ['Local Favorite', 'Offline Friendly'], rating: 4.9, platforms: ['iOS', 'Android'], category: 'publicTransit', tags: ['essentials', 'free', 'offline', 'highly-rated'] },
    { id: 'paypay-jp', name: 'PayPay', logoUrl: 'https://placehold.co/64x64/ef4444/ffffff/png?text=P', logoAiHint: 'paypay logo', description: 'The leading mobile payment app in Japan, widely accepted.', badges: ['Local Favorite'], rating: 4.8, platforms: ['iOS', 'Android'], category: 'payments', tags: ['essentials', 'free', 'highly-rated'] },
    { id: 'gurunavi-jp', name: 'Gurunavi', logoUrl: 'https://placehold.co/64x64/f97316/ffffff/png?text=G', logoAiHint: 'gurunavi logo', description: 'Discover and book restaurants, with English menus available.', badges: ['Local Favorite'], rating: 4.5, platforms: ['iOS', 'Android'], category: 'foodDelivery', tags: ['free'] },
  ],
  paris: [
    { id: 'g7-fr', name: 'G7', logoUrl: 'https://placehold.co/64x64/1e40af/ffffff/png?text=G7', logoAiHint: 'g7 logo', description: 'The largest taxi network in Paris. Book in advance.', badges: ['Local Favorite', 'Safe to Use'], rating: 4.5, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['essentials'] },
    { id: 'uber-fr', name: 'Uber', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/512px-Uber_logo_2018.png', logoAiHint: 'uber logo', description: 'Widely available in Paris and often cheaper than taxis.', badges: ['Global Favorite'], rating: 4.7, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['highly-rated'] },
    { id: 'citymapper-fr', name: 'Citymapper', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Citymapper_logo.svg/512px-Citymapper_logo.svg.png', logoAiHint: 'citymapper logo', description: 'The ultimate transit app for real-time directions.', badges: ['Offline Friendly', 'Global Favorite'], rating: 4.9, platforms: ['iOS', 'Android'], category: 'publicTransit', tags: ['essentials', 'offline', 'free', 'highly-rated'] },
    { id: 'toogoodtogo-fr', name: 'Too Good To Go', logoUrl: 'https://placehold.co/64x64/f97316/ffffff/png?text=TGTG', logoAiHint: 'too good to go logo', description: 'Fight food waste by buying unsold food from local bakeries.', badges: ['Travel Hacks'], rating: 4.8, platforms: ['iOS', 'Android'], category: 'travelHacks', tags: ['free', 'highly-rated'] },
  ],
  london: [
    { id: 'uber-uk', name: 'Uber', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/512px-Uber_logo_2018.png', logoAiHint: 'uber logo', description: 'The most popular ride-hailing app in London.', badges: ['Global Favorite'], rating: 4.8, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['essentials', 'highly-rated'] },
    { id: 'citymapper-uk', name: 'Citymapper', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Citymapper_logo.svg/512px-Citymapper_logo.svg.png', logoAiHint: 'citymapper logo', description: 'Essential for navigating the Tube and bus network.', badges: ['Offline Friendly', 'Global Favorite'], rating: 4.9, platforms: ['iOS', 'Android'], category: 'publicTransit', tags: ['essentials', 'offline', 'free', 'highly-rated'] },
    { id: 'deliveroo-uk', name: 'Deliveroo', logoUrl: 'https://placehold.co/64x64/00ccbc/ffffff/png?text=D', logoAiHint: 'deliveroo logo', description: 'Wide selection of restaurant and grocery delivery.', badges: ['Local Favorite'], rating: 4.7, platforms: ['iOS', 'Android'], category: 'foodDelivery', tags: ['highly-rated'] },
  ],
  cairo: [
    { id: 'swvl-eg', name: 'Swvl', logoUrl: 'https://placehold.co/64x64/f59e0b/ffffff/png?text=S', logoAiHint: 'swvl logo', description: 'Book affordable and comfortable bus rides across the city.', badges: ['Local Favorite'], rating: 4.4, platforms: ['iOS', 'Android'], category: 'publicTransit', tags: ['essentials'] },
    { id: 'talabat-eg', name: 'Talabat (Otlob)', logoUrl: 'https://placehold.co/64x64/fb923c/ffffff/png?text=T', logoAiHint: 'talabat logo', description: 'The leading food delivery app in Egypt for all your cravings.', badges: ['Local Favorite'], rating: 4.6, platforms: ['iOS', 'Android'], category: 'foodDelivery', tags: [] },
    { id: 'uber-eg', name: 'Uber', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/512px-Uber_logo_2018.png', logoAiHint: 'uber logo', description: 'A reliable option for getting around Cairo.', badges: ['Global Favorite'], rating: 4.5, platforms: ['iOS', 'Android'], category: 'rideHailing', tags: ['highly-rated'] },
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function AppScoutPageComponent() {
  const searchParams = useSearchParams();
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for AppScout feature
  const [activeCategory, setActiveCategory] = useState<AppCategory>('rideHailing');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [destinationSearch, setDestinationSearch] = useState('');

  const [currentCity, setCurrentCity] = useState("Tokyo");
  const [currentFlag, setCurrentFlag] = useState("🇯🇵");

  const updateCity = (query: string) => {
    let city = 'tokyo'; // Default
    let flag = '🇯🇵';
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('paris') || lowerQuery.includes('riviera')) {
        city = 'paris';
        flag = '🇫🇷';
    } else if (lowerQuery.includes('cairo')) {
        city = 'cairo';
        flag = '🇪🇬';
    } else if (lowerQuery.includes('london')) {
        city = 'london';
        flag = '🇬🇧';
    } else if (lowerQuery.includes('tokyo')) {
        city = 'tokyo';
        flag = '🇯🇵';
    }
    
    setCurrentCity(city.charAt(0).toUpperCase() + city.slice(1));
    setCurrentFlag(flag);
    console.log(`Searching for apps in: ${city}`);
  }
  
  useEffect(() => {
    const destinationFromURL = searchParams.get('destination');
    if (destinationFromURL) {
      const decodedDestination = decodeURIComponent(destinationFromURL);
      setDestinationSearch(decodedDestination);
      updateCity(decodedDestination);
    }
  }, [searchParams]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on AppScout page:', headerSearchQuery);
  };
  
  const handleDestinationSearch = () => {
      updateCity(destinationSearch);
  };

  const filteredApps = useMemo(() => {
    const cityKey = currentCity.toLowerCase();
    let appsForCity = appData[cityKey] || [];
    
    // Filter by active category
    appsForCity = appsForCity.filter(app => app.category === activeCategory);

    // Filter by active tags (Essentials, Offline, etc.)
    if (activeFilters.length > 0) {
        appsForCity = appsForCity.filter(app => 
            activeFilters.every(filterId => {
                if (filterId === 'highly-rated') return app.rating >= 4.7;
                if (filterId === 'free') return app.tags.includes('free');
                if (filterId === 'offline') return app.tags.includes('offline');
                if (filterId === 'essentials') return app.tags.includes('essentials');
                return true;
            })
        );
    }
    
    return appsForCity;
  }, [currentCity, activeCategory, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={headerSearchQuery}
        onSearchQueryChange={setHeaderSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <motion.div
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {/* Section 1: Header + Context Block */}
          <motion.section variants={itemVariants} className="text-center mb-10 md:mb-12">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Land like a local
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the must-have apps for wherever you're going—before you even board.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 bg-card/40 backdrop-blur-md border border-border/30 max-w-md mx-auto p-3 rounded-xl shadow-lg">
                <p className="text-sm text-foreground">
                    Showing apps for <span className="font-semibold">{currentFlag} {currentCity}</span>
                </p>
            </div>
          </motion.section>

          {/* Section 3: Search + Filter Tool */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Type your destination... e.g., Paris"
                        className="w-full h-12 pl-12 pr-4 text-base rounded-full bg-card/60 border-border/40 shadow-inner"
                        value={destinationSearch}
                        onChange={(e) => setDestinationSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleDestinationSearch(); }}
                    />
                </div>
                 <AppFilterButtons activeFilters={activeFilters} onToggleFilter={toggleFilter} />
            </div>
          </motion.section>


          {/* Section 2: Interactive Local Apps Dashboard */}
          <motion.section variants={itemVariants}>
            <AppCategoryTabs activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

            <AnimatePresence>
                <motion.div 
                    key={activeCategory + activeFilters.join('-') + currentCity} // Re-trigger animation on category or filter change
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredApps.length > 0 ? (
                      filteredApps.map((app, index) => (
                        <AppCard key={app.id} app={app} index={index} />
                      ))
                  ) : (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                          <p>No apps found for this category and filter combination.</p>
                      </div>
                  )}
                </motion.div>
            </AnimatePresence>
          </motion.section>
            
          {/* Section 4: Export (Placeholder) */}
          <motion.section variants={itemVariants} className="mt-12 text-center">
             <Button>
                <ListPlus className="h-4 w-4 mr-2" />
                Add All Essentials to Trip
             </Button>
          </motion.section>

        </motion.div>
      </main>
      <SubtleFooter />
    </div>
  );
}

export function AppScoutPageClient() {
    return (
        // Suspense boundary is required for useSearchParams to work during initial render
        <React.Suspense fallback={<div>Loading...</div>}>
            <AppScoutPageComponent />
        </React.Suspense>
    );
}

