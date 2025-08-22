'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function DriftinTrustSafetySection() {
  const { getTranslation } = useLanguage();

  const handleJoinNow = () => {
    console.log('Join Now clicked');
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-left">
            <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
              {getTranslation('driftinWhyChooseLabel', 'Why Choose Driftin?')}
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {getTranslation('driftinTrustSafetyTitle', 'Trust & Safety')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">
              {getTranslation('driftinTrustSafetyDesc1', 'At Driftin, we prioritize the safety and well-being of our community. Our trusted verification process, secure payments, and responsive support team ensure a seamless and worry-free experience.')}
            </p>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {getTranslation('driftinTrustSafetyDesc2', 'Driftin is committed to building an inclusive, sustainable, and responsible platform. We\'ve implemented robust safety measures, offer transparent pricing, and empower our hosts and travelers to make a positive impact through ethical travel practices.')}
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-lg"
              onClick={handleJoinNow}
            >
              {getTranslation('driftinJoinNowButton', 'Join Now')}
            </Button>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&h=600&fit=crop"
              alt={getTranslation('driftinTrustSafetyImageAlt', 'Smiling person using a modern app interface')}
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-300"
              data-ai-hint="person phone smiling"
            />
            {/* The UI mockup overlay from the reference is complex to replicate perfectly with simple HTML/CSS.
                A data-ai-hint on the main image can suggest this content.
                If needed, a separate absolutely positioned image could be added for the mockup,
                but that adds complexity for responsiveness.
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
