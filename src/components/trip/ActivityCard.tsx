'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Car, Hotel, MapPin as AttractionIcon, Clock, Star, ChevronRight, Users, Sailboat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Activity {
  type: string; 
  title: string; 
  duration?: string; 
  persons?: string; 
  imageUrl?: string;
  imageAlt?: string;
  aiHint?: string;
  rating?: number;
  reviews?: string; 
  price?: string; 
  discount?: string;
  category?: string; 
  icon: 'Car' | 'Hotel' | 'Attraction' | 'Sailboat';
  distanceToNext?: string;
  isBookingView?: boolean;
}

const iconComponents = {
  Car: Car,
  Hotel: Hotel,
  Attraction: AttractionIcon,
  Sailboat: Sailboat,
};

const badgeColors: { [key: string]: string } = {
  default: 'bg-gray-100 text-gray-700 border-gray-300',
  Travel: 'bg-sky-100 text-sky-700 border-sky-300',
  Accommodation: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  Attraction: 'bg-amber-100 text-amber-700 border-amber-300',
  Activity: 'bg-rose-100 text-rose-700 border-rose-300',
};

export function ActivityCard({
  type,
  title,
  duration,
  persons,
  imageUrl,
  imageAlt = "Activity image",
  aiHint = "activity placeholder",
  rating,
  reviews,
  price,
  discount,
  category,
  icon,
  isBookingView = false,
}: Activity) {
  const { getTranslation } = useLanguage();
  const IconComponent = iconComponents[icon];
  const badgeColorClass = badgeColors[type] || badgeColors.default;

  const handleCardClick = () => {
    console.log(`ActivityCard clicked: ${title}`);
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer relative group",
        !isBookingView && "ml-4"
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={80}
              height={80}
              className="rounded-md object-cover aspect-square"
              data-ai-hint={aiHint}
            />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <Badge variant="outline" className={`text-xs ${badgeColorClass} mb-1`}>{type}</Badge>
          </div>
          <h5 className="font-semibold text-foreground text-sm">{title}</h5>
          
          {(duration || persons) && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {duration && <Clock className="h-3 w-3 mr-1" />}
              {duration && <span>{duration}</span>}
              {duration && persons && <span className="mx-1">•</span>}
              {persons && <Users className="h-3 w-3 mr-1" />}
              {persons && <span>{persons}</span>}
            </div>
          )}

          {type === getTranslation('activityTypeAccommodation', 'Accommodation') && (
            <>
              {(rating || reviews) && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {rating && <Badge variant="secondary" className="bg-green-600 text-white px-1.5 py-0.5 text-xs mr-1">{rating.toFixed(1)}</Badge>}
                  {reviews && <span>{reviews}</span>}
                </div>
              )}
              <div className="flex items-center text-xs mt-0.5">
                {discount && (
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300 mr-2 px-1.5 py-0.5">
                    {discount}
                  </Badge>
                )}
                {price && <span className="text-muted-foreground">{price}</span>}
              </div>
            </>
          )}

          {type === getTranslation('activityTypeAttraction', 'Attraction') && category && (
            <p className="text-xs text-muted-foreground mt-1">{category}</p>
          )}
        </div>
        {isBookingView ? (
          <div className="flex flex-col items-end justify-center h-full ml-4">
              <Button variant="outline" size="sm" className="h-8">Manage</Button>
          </div>
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 group-hover:text-primary" />
        )}
      </div>
    </div>
  );
}
