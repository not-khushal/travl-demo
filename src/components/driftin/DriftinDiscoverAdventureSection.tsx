'use client';

import { AdventureProfileCard, type AdventureProfileCardProps } from './AdventureProfileCard';
import { useLanguage } from '@/contexts/LanguageContext';

const adventureProfiles: AdventureProfileCardProps[] = [
  {
    id: 'adventure-1',
    mainImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile1Alt',
    mainImageAltFallback: 'Man smiling in a natural setting',
    mainImageAiHint: 'man portrait street',
    avatarImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar1Alt',
    avatarImageAltFallback: 'John S.',
    avatarAiHint: 'man face',
    nameKey: 'adventureProfile1Name',
    nameFallback: 'John S.',
    labelKey: 'adventureProfile1Label',
    labelFallback: 'Superhost',
    locationKey: 'adventureProfile1Location',
    locationFallback: 'Global',
  },
  {
    id: 'adventure-2',
    mainImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile2Alt',
    mainImageAltFallback: 'Woman relaxing on a couch',
    mainImageAiHint: 'woman portrait smiling',
    avatarImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar2Alt',
    avatarImageAltFallback: 'Emily R.',
    avatarAiHint: 'woman face',
    nameKey: 'adventureProfile2Name',
    nameFallback: 'Emily R.',
    labelKey: 'adventureProfile2Label',
    labelFallback: 'Recent Traveler',
    locationKey: 'adventureProfile2Location',
    locationFallback: 'Europe',
  },
  {
    id: 'adventure-3',
    mainImageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile3Alt',
    mainImageAltFallback: 'Woman with a thoughtful expression',
    mainImageAiHint: 'woman portrait fashion',
    avatarImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar3Alt',
    avatarImageAltFallback: 'Sarah L.',
    avatarAiHint: 'woman face serene',
    nameKey: 'adventureProfile3Name',
    nameFallback: 'Sarah L.',
    labelKey: 'adventureProfile3Label',
    labelFallback: 'Explorer',
    locationKey: 'adventureProfile3Location',
    locationFallback: 'Asia',
  },
];

export function DriftinDiscoverAdventureSection() {
  const { getTranslation } = useLanguage();

  const handleSeeMoreClick = () => {
    console.log('Discover Adventure - See More clicked');
  };

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
          {getTranslation('driftinExploreLabel', 'Explore Driftin')}
        </p>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {getTranslation('driftinDiscoverAdventureTitle', 'Discover Your Next Adventure')}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto">
          {getTranslation('driftinDiscoverAdventureSubtitle', 'Browse a curated selection of unique accommodations and connect with passionate hosts around the world.')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {adventureProfiles.map((profile) => (
            <AdventureProfileCard key={profile.id} {...profile} />
          ))}
        </div>

        <button
          onClick={handleSeeMoreClick}
          className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
        >
          {getTranslation('driftinSeeMoreLink', 'See More')}
        </button>
      </div>
    </section>
  );
}
