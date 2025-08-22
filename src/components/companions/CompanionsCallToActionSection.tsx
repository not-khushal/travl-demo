
'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, UserPlus } from 'lucide-react';

export function CompanionsCallToActionSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto bg-card/70 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl border border-border/20">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {getTranslation('companionsCTATitle', 'Ready to Explore with a Local?')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            {getTranslation('companionsCTASubtitle', 'Your unforgettable journey, enriched by local wisdom and genuine connection, is just a click away.')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => console.log('Find Your Local Companion Today clicked')}
            >
              {getTranslation('companionsCTAButtonFindCompanion', 'Find Your Local Companion Today')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 rounded-md shadow-md hover:shadow-lg transition-shadow"
              onClick={() => console.log('Become a Companion clicked')}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {getTranslation('companionsCTAButtonBecomeCompanion', 'Become a Companion')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

