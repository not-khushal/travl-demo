
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, ListChecks, ShieldCheck, Sparkles } from 'lucide-react';

export function CompanionsGroupAdventuresSection() {
  const { getTranslation } = useLanguage();

  const benefits = [
    { icon: ListChecks, textKey: 'companionsGroupBenefitCustom', fallback: 'Customized itineraries for diverse group interests.' },
    { icon: ShieldCheck, textKey: 'companionsGroupBenefitLogistics', fallback: 'Smooth logistics and coordination for hassle-free travel.' },
    { icon: Sparkles, textKey: 'companionsGroupBenefitShared', fallback: 'Shared memorable experiences and deeper cultural connections.' },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden md:flex md:items-center">
          <div className="md:w-1/2 p-6 md:p-10 lg:p-12">
            <Users className="h-10 w-10 text-primary mb-3" />
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {getTranslation('companionsGroupTitle', 'Travel Together, Explore Deeper')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              {getTranslation('companionsGroupDescription', 'Planning a trip for your family, friends, or colleagues? Our local companions specialize in creating unforgettable group experiences. From coordinating logistics to crafting personalized tours that cater to everyone\'s interests, they ensure your group adventure is seamless, engaging, and truly local.')}
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
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md" asChild>
              <Link href="/connect">
                {getTranslation('companionsGroupButtonHire', 'Hire Companions')}
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative aspect-video md:aspect-auto md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&h=600&fit=crop"
              alt={getTranslation('companionsGroupImageAlt', 'Diverse group of travelers joyfully exploring a scenic location with their local companion')}
              fill
              className="object-cover"
              data-ai-hint="group travel companion diverse"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
