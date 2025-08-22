
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Clock, Sun, Edit3, Trash2, MoreHorizontal, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export interface TripCardProps {
  id: string;
  heroImageUrl: string;
  heroImageAlt: string;
  aiHint: string;
  destination: string;
  location: string;
  date: string;
  duration?: string;
  statusBadge: string;
  statusColor?: string;
  tagline?: string;
  weather?: string;
  tripIcon?: LucideIcon;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddToDiary?: (id: string) => void;
}

export function TripCard({
  id,
  heroImageUrl,
  heroImageAlt,
  aiHint,
  destination,
  location,
  date,
  duration,
  statusBadge,
  statusColor = 'bg-stone-500/20 text-stone-300 border-stone-400/30',
  tagline,
  weather,
  tripIcon: TripIcon,
  onEdit,
  onDelete,
  onAddToDiary,
}: TripCardProps) {
  const { getTranslation } = useLanguage();

  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-xl shadow-2xl overflow-hidden flex flex-col group hover:shadow-yellow-900/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={aiHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="outline" className={cn("text-xs backdrop-blur-sm bg-black/50", statusColor)}>
            {statusBadge}
          </Badge>
          {TripIcon && (
            <div className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full shadow">
              <TripIcon className="h-4 w-4 text-yellow-100/80" />
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-headline text-xl font-bold text-yellow-50/90 mb-1 truncate" title={destination}>
          {destination}
        </h3>
        <div className="flex items-center text-xs text-yellow-200/70 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-xs text-yellow-200/70 mb-3 space-x-3">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            <span>{date}</span>
          </div>
          {duration && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        {tagline && (
          <p className="text-sm text-yellow-100/90 italic mb-3 flex-grow">
            &ldquo;{tagline}&rdquo;
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-yellow-200/70 mt-auto pt-3 border-t border-yellow-200/20">
          {weather && (
            <div className="flex items-center">
              <Sun className="h-4 w-4 mr-1.5 text-amber-400" />
              <span>{weather}</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-yellow-200/70 hover:text-amber-300 hover:bg-black/20"
              onClick={() => onAddToDiary && onAddToDiary(id)}
              title={getTranslation('myTripsAddToDiary', 'Add to Diary')}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
