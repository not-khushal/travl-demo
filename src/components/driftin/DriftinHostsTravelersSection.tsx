
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface Profile {
  id: string;
  nameKey: string;
  nameFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  imageUrl: string;
  aiHint: string;
  profilePath?: string; // Optional path for navigation
}

const profiles: Profile[] = [
  {
    id: 'john',
    nameKey: 'profileJohnDoeName',
    nameFallback: 'John Doe',
    descriptionKey: 'profileJohnDoeDesc',
    descriptionFallback: 'Superhost with 5 years experience hosting travelers',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&fit=crop',
    aiHint: 'man travel',
  },
  {
    id: 'emily',
    nameKey: 'profileEmilySmithName',
    nameFallback: 'Emily Smith',
    descriptionKey: 'profileEmilySmithDesc',
    descriptionFallback: 'Frequent traveler exploring the globe and making new connections',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop',
    aiHint: 'woman adventure',
    profilePath: '/profile/emily-smith', // Path for Emily Smith
  },
  {
    id: 'tom',
    nameKey: 'profileTomWilsonName',
    nameFallback: 'Tom Wilson',
    descriptionKey: 'profileTomWilsonDesc',
    descriptionFallback: 'Dedicated host and experienced traveler ready to share local tips',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop',
    aiHint: 'man city',
  },
];

export function DriftinHostsTravelersSection() {
  const { getTranslation } = useLanguage();
  const router = useRouter();

  const handleViewProfile = (profilePath?: string, profileName?: string) => {
    if (profilePath) {
      router.push(profilePath);
    } else {
      console.log(`View profile clicked for: ${profileName || 'Unknown Profile'}, but no profilePath provided.`);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
          {getTranslation('driftinExperiencesLabel', 'Driftin Experiences')}
        </p>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {getTranslation('driftinHostsTravelersTitle', 'Hosts & Travelers')}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          {getTranslation('driftinHostsTravelersSubtitle', 'Meet our talented hosts and adventurous travelers who make our community vibrant.')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-center p-6"> {/* Removed card-like styling here */}
              <Avatar className="w-32 h-32 md:w-36 md:h-36 mb-6 border-4 border-background shadow-md">
                <AvatarImage src={profile.imageUrl} alt={getTranslation(profile.nameKey, profile.nameFallback)} data-ai-hint={profile.aiHint} />
                <AvatarFallback>{getTranslation(profile.nameKey, profile.nameFallback).substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="font-headline text-2xl font-semibold text-foreground mb-2">
                {getTranslation(profile.nameKey, profile.nameFallback)}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 h-12 overflow-hidden">
                {getTranslation(profile.descriptionKey, profile.descriptionFallback)}
              </p>
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/70"
                onClick={() => handleViewProfile(profile.profilePath, getTranslation(profile.nameKey, profile.nameFallback))}
              >
                {getTranslation('viewProfileButton', 'View Profile')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
