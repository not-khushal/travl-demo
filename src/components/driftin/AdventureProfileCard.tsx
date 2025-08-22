
'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

export interface AdventureProfileCardProps {
  id: string;
  mainImageUrl: string;
  mainImageAltKey: string;
  mainImageAltFallback: string;
  mainImageAiHint: string;
  avatarImageUrl: string;
  avatarImageAltKey: string;
  avatarImageAltFallback: string;
  avatarAiHint: string;
  nameKey: string;
  nameFallback: string;
  labelKey: string;
  labelFallback: string;
  locationKey: string;
  locationFallback: string;
}

export function AdventureProfileCard({
  mainImageUrl,
  mainImageAltKey,
  mainImageAltFallback,
  mainImageAiHint,
  avatarImageUrl,
  avatarImageAltKey,
  avatarImageAltFallback,
  avatarAiHint,
  nameKey,
  nameFallback,
  labelKey,
  labelFallback,
  locationKey,
  locationFallback,
}: AdventureProfileCardProps) {
  const { getTranslation } = useLanguage();

  const handleCardClick = () => {
    console.log(`Adventure card clicked: ${getTranslation(nameKey, nameFallback)}`);
  };

  return (
    <div
      className="bg-card rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={mainImageUrl}
          alt={getTranslation(mainImageAltKey, mainImageAltFallback)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={mainImageAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-card">
              <AvatarImage src={avatarImageUrl} alt={getTranslation(avatarImageAltKey, avatarImageAltFallback)} data-ai-hint={avatarAiHint} />
              <AvatarFallback>{getTranslation(nameKey, nameFallback).substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-semibold text-white">{getTranslation(nameKey, nameFallback)}</h3>
              <p className="text-xs text-white/80">{getTranslation(labelKey, labelFallback)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
