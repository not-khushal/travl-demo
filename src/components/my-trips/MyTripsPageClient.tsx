
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MyTripsLayout } from './MyTripsLayout';
import { MyTripsSidebar, type TripCategory } from './MyTripsSidebar';
import { MyTripsTopBar } from './MyTripsTopBar';
import { TripCard, type TripCardProps } from './TripCard';
import { SoulLogsSection } from './SoulLogsSection';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plane, Edit3, Map, Tag, Flag, BookOpen, Waves, Mountain } from 'lucide-react';
import { MyTripsFooter } from './MyTripsFooter';

const upcomingTripsData: TripCardProps[] = [
  {
    id: 'trip1',
    heroImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Paris Eiffel Tower',
    aiHint: 'paris eiffel tower',
    destination: 'Parisian Dream',
    location: 'Paris, France',
    date: 'Oct 20 - Oct 28, 2024',
    duration: '8 days',
    statusBadge: 'Upcoming',
    statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    tagline: 'Chasing art and croissants',
    weather: '15°C, Sunny',
    tripIcon: Plane,
  },
  {
    id: 'trip2',
    heroImageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Kyoto Temple',
    aiHint: 'kyoto temple autumn',
    destination: 'Kyoto Serenity',
    location: 'Kyoto, Japan',
    date: 'Nov 05 - Nov 12, 2024',
    duration: '7 days',
    statusBadge: 'Confirmed',
    statusColor: 'bg-green-500/20 text-green-300 border-green-400/30',
    tagline: 'Autumn leaves and ancient temples',
    weather: '18°C, Cloudy',
    tripIcon: Plane,
  },
];

const savedTripsData: TripCardProps[] = [
  {
    id: 'trip3',
    heroImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Rome Colosseum',
    aiHint: 'rome colosseum historic',
    destination: 'Roman Holiday',
    location: 'Rome, Italy',
    date: 'Spring 2025',
    duration: '5 days',
    statusBadge: 'Saved',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    tagline: 'Exploring ancient ruins',
    weather: 'TBD',
    tripIcon: Map,
  },
];

const vibeTaggedTripsData: TripCardProps[] = [
  {
    id: 'vibe1',
    heroImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Relaxing on a beach in Maldives',
    aiHint: 'maldives beach relaxing',
    destination: 'Maldives Relaxation',
    location: 'Maldives',
    date: 'Tagged: Anytime',
    statusBadge: 'Relaxing',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    tagline: 'Pure bliss and turquoise waters',
    tripIcon: Waves,
  },
  {
    id: 'vibe2',
    heroImageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Hiking in the mountains',
    aiHint: 'mountain hiking adventure',
    destination: 'Mountain Adventure',
    location: 'Patagonia, Argentina',
    date: 'Tagged: Summer',
    statusBadge: 'Adventure',
    statusColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    tagline: 'Conquering peaks and finding thrills',
    tripIcon: Mountain,
  },
  {
    id: 'vibe3',
    heroImageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c97489?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Night market in Thailand',
    aiHint: 'thailand night market food',
    destination: 'Foodie Exploration',
    location: 'Bangkok, Thailand',
    date: 'Tagged: Culinary',
    statusBadge: 'Foodie',
    statusColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    tagline: 'A journey for the taste buds',
    tripIcon: Plane,
  },
];

const milesBehindTripsData: TripCardProps[] = [
  {
    id: 'past1',
    heroImageUrl: 'https://images.unsplash.com/photo-1526481280643-33c94628b67c?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Senso-ji Temple in Tokyo',
    aiHint: 'tokyo temple night',
    destination: 'Tokyo Neon & Tradition',
    location: 'Tokyo, Japan',
    date: 'May 10 - May 18, 2023',
    duration: '8 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Lost in translation and city lights',
    tripIcon: Plane,
  },
  {
    id: 'past2',
    heroImageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'The Trevi Fountain in Rome',
    aiHint: 'rome trevi fountain',
    destination: 'Roman Holiday',
    location: 'Rome, Italy',
    date: 'Sep 02 - Sep 08, 2022',
    duration: '6 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Walking through history\'s pages',
    tripIcon: Plane,
  },
  {
    id: 'past3',
    heroImageUrl: 'https://images.unsplash.com/photo-1549977810-37e06b23a5a2?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Santorini, Greece',
    aiHint: 'santorini greece',
    destination: 'Grecian Getaway',
    location: 'Santorini, Greece',
    date: 'Jun 15 - Jun 22, 2021',
    duration: '7 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Sunsets and seascapes',
    tripIcon: Plane,
  },
  {
    id: 'past4',
    heroImageUrl: 'https://images.unsplash.com/photo-1505832073689-114b06d36509?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Northern lights over Iceland',
    aiHint: 'iceland aurora borealis',
    destination: 'Icelandic Wonders',
    location: 'Reykjavík, Iceland',
    date: 'Dec 01 - Dec 07, 2022',
    duration: '7 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Chasing auroras and frozen waterfalls',
    tripIcon: Plane,
  },
];


const SCROLL_THRESHOLD = 50;

export function MyTripsPageClient() {
  const { getTranslation } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<TripCategory>('takeoffLane');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);


  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHeaderScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on MyTrips page:', searchQuery);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'takeoffLane':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {upcomingTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'trailboard':
         return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {savedTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'vibeTagged':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {vibeTaggedTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'milesBehind':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {milesBehindTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'soulLogs':
        return <SoulLogsSection />;
      default:
        return <div className="p-6 text-center text-yellow-200/70">{getTranslation('myTripsSelectCategory', 'Select a category to see your trips.')}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#2a231f] via-[#3a2f26] to-[#433830] text-yellow-50/90">
       <Header
        isScrolled={isHeaderScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <MyTripsLayout
        sidebar={<MyTripsSidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />}
        topBar={<MyTripsTopBar onSearch={() => {}} onAddTrip={() => {}} />}
      >
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </MyTripsLayout>
      <MyTripsFooter />
    </div>
  );
}
