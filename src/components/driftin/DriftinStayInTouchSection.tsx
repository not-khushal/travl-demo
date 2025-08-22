'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export function DriftinStayInTouchSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[450px] rounded-lg overflow-hidden shadow-xl order-last md:order-first">
            <Image
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&h=450&fit=crop"
              alt={getTranslation('driftinStayInTouchImageAlt', 'People collaborating around a laptop, staying in touch')}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-300"
              data-ai-hint="people laptop collaboration"
            />
          </div>
          <div className="text-left md:order-last">
            <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
              {getTranslation('driftinConnectWithUsLabel', 'Connect with Us')}
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {getTranslation('driftinStayInTouchTitle', 'Stay in Touch')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {getTranslation('driftinStayInTouchDesc', 'Follow us on social media, sign up for our newsletter, or reach out to our team to learn more about Driftin and how we can help you unlock unforgettable travel experiences.')}
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-lg"
              asChild
            >
              <Link href="/contact">{getTranslation('driftinContactUsButton', 'Contact Us')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
