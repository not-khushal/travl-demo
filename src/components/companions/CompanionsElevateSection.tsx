
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, MapPin, Users, ShieldCheck } from 'lucide-react';

export function CompanionsElevateSection() {
  const { getTranslation } = useLanguage();

  const benefits = [
    { icon: Users, textKey: 'companionsBenefitLanguage', fallback: 'Multilingual Support: Overcome language barriers effortlessly.' },
    { icon: MapPin, textKey: 'companionsBenefitLocalGems', fallback: 'Hidden Gems Uncovered: Discover places only locals know.' },
    { icon: ShieldCheck, textKey: 'companionsBenefitSafety', fallback: 'Safety & Scam-Proofing: Navigate new places with confidence.' },
    { icon: CheckCircle, textKey: 'companionsBenefitCulture', fallback: 'Cultural Immersion: Understand customs and traditions deeply.' },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden md:flex md:items-center">
          <div className="md:w-1/2 relative aspect-video md:aspect-auto md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&h=600&fit=crop"
              alt={getTranslation('companionsElevateImageAlt', 'Traveler joyfully interacting with a local companion in a scenic European town')}
              fill
              className="object-cover"
              data-ai-hint="traveler local"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-10 lg:p-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {getTranslation('companionsElevateTitle', 'Elevate Your Destination')}
            </h2>
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
              {getTranslation('companionsElevateSubtitle', 'TRAVEL COMPANIONS & EXPERIENCES')}
            </p>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              {getTranslation('companionsElevateDescription', 'Dive into the heart of each destination with our Companions. From hidden gems to insider tips, our local experts will help you navigate with confidence and uncover the true spirit of the places you visit. Experience cultural immersion like never before.')}
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="flex items-start">
                    <Icon className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90 text-sm">
                      {getTranslation(benefit.textKey, benefit.fallback)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md" asChild>
                <Link href="/connect">
                  {getTranslation('companionsElevateButtonFindCompanion', 'Find a Companion')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-md">
                {getTranslation('companionsElevateButtonHowItWorks', 'How It Works')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
