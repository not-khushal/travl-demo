
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, SendHorizontal, Wand2, Lightbulb, CalendarDays, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  tripQuery: string;
  onTripQueryChange: (query: string) => void;
  onTripQuerySubmit: () => void;
}

export function HeroSection({
  tripQuery,
  onTripQueryChange,
  onTripQuerySubmit,
}: HeroSectionProps) {
  const { getTranslation } = useLanguage();

  const handleSuggestionClick = (suggestionTextKey: string, fallbackText: string) => {
    const translatedSuggestion = getTranslation(suggestionTextKey, fallbackText);
    onTripQueryChange(translatedSuggestion);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTripQuerySubmit();
  };


  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] md:min-h-[700px] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden p-4">
      {/* Video Background */}
      <video
        src="https://firebasestudio.googleapis.com/v0/b/project-journi-63405.appspot.com/o/assets%2Ftravel-collage.mp4?alt=media&token=d1f86828-971c-43f5-a400-a8b301726a8c"
        className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 z-0 object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop"
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-4xl w-full mx-auto">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-up" style={{ animationDelay: '0.2s', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
          {getTranslation('heroHeadlinePart1', "Hey, I'm ")}
          <span className="text-primary">Journi</span>
          {getTranslation('heroHeadlinePart2', ", your personal trip planner")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.4s', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          {getTranslation('heroSubheadline', "Tell me what you want, and I'll handle the rest: flights, hotels, itineraries, in seconds.")}
        </p>

        <div className="w-full max-w-3xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <form className="relative flex items-center gap-2" onSubmit={handleFormSubmit}>
            <Textarea
              placeholder={getTranslation('heroCtaPlaceholder', "Create a 7-day Paris itinerary for a birthday getaway")}
              className="w-full h-16 pr-24 pl-6 py-4 text-lg bg-white/10 dark:bg-black/20 text-white placeholder:text-neutral-300 rounded-full border-2 border-white/20 focus:border-primary shadow-lg resize-none backdrop-blur-sm"
              value={tripQuery}
              onChange={(e) => onTripQueryChange(e.target.value)}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-300 hover:text-white hover:bg-white/20 rounded-full w-10 h-10"
                onClick={() => console.log('Mic clicked in Hero')}
                type="button"
                aria-label="Use microphone"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                variant="default"
                size="icon"
                className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground w-10 h-10"
                aria-label="Submit trip query"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
           <Button variant="ghost" className="rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20" onClick={() => handleSuggestionClick('heroSuggestionNewTrip', 'Create a new trip')}>
            <Wand2 className="mr-2 h-4 w-4" />
            {getTranslation('heroSuggestionNewTrip', 'Create a new trip')}
          </Button>
          <Button variant="ghost" className="rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20" onClick={() => handleSuggestionClick('heroSuggestionInspire', 'Inspire me where to go')}>
            <Lightbulb className="mr-2 h-4 w-4" />
            {getTranslation('heroSuggestionInspire', 'Inspire me where to go')}
          </Button>
          <Button variant="ghost" className="rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20" onClick={() => handleSuggestionClick('heroSuggestionWeekend', 'Weekend getaways')}>
            <CalendarDays className="mr-2 h-4 w-4" />
            {getTranslation('heroSuggestionWeekend', 'Weekend getaways')}
          </Button>
          <Button
            asChild
            variant="ghost"
            className="rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
          >
            <Link href="/how-it-works">
              <Info className="mr-2 h-4 w-4" />
              {getTranslation('heroSuggestionHowItWorks', 'How it works')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
