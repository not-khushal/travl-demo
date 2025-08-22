'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActivityCard, type Activity } from "./ActivityCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, Footprints } from 'lucide-react';

interface LinkableText {
  textKey: string;
  textFallback: string;
}

interface ItineraryDayCardProps {
  dayTitleKey: string;
  dayTitleFallback: string;
  date: string;
  descriptionKey: string;
  descriptionFallback: string;
  linkableTexts: LinkableText[];
  tipsKey: string;
  tipsFallback: string;
  activities: Activity[];
}

// Helper to escape regex special characters
function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function ItineraryDayCard({
  dayTitleKey,
  dayTitleFallback,
  date,
  descriptionKey,
  descriptionFallback,
  linkableTexts,
  tipsKey,
  tipsFallback,
  activities,
}: ItineraryDayCardProps) {
  const { getTranslation } = useLanguage();

  const formatDescription = (textToFormat: string, linksToApply: LinkableText[]) => {
    const translatedText = getTranslation(descriptionKey, textToFormat);
    const translatedLinks = linksToApply.map(link => ({
      original: getTranslation(link.textKey, link.textFallback),
      key: link.textKey, // for unique key in map
    }));

    if (translatedLinks.length === 0) return [translatedText];

    const regexParts = translatedLinks.map(link => escapeRegex(link.original));
    const regex = new RegExp(`(${regexParts.join('|')})`, 'g');

    const elements: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(translatedText)) !== null) {
      const matchedText = match[0];

      if (match.index > lastIndex) {
        elements.push(translatedText.substring(lastIndex, match.index));
      }
      elements.push(
        <a href="#" key={`link-${match.index}-${matchedText}`} className="text-primary hover:underline">
          {matchedText}
        </a>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < translatedText.length) {
      elements.push(translatedText.substring(lastIndex));
    }
    return elements;
  };


  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline py-3 px-0">
          <div className="flex justify-between items-center w-full">
            <h4 className="text-md font-semibold text-foreground text-left">{getTranslation(dayTitleKey, dayTitleFallback)}</h4>
            <span className="text-sm text-muted-foreground mr-4">{date}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {formatDescription(descriptionFallback, linkableTexts)}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{getTranslation('tips', 'Tips')}:</span> {getTranslation(tipsKey, tipsFallback)}
          </p>
          <div className="pl-1 border-l-2 border-border ml-1">
            {activities.map((activity, index) => (
              <div key={index} className={index > 0 ? "mt-3" : ""}>
                <ActivityCard {...activity} />
                {activity.distanceToNext && index < activities.length - 1 && (
                  <div className="ml-4 pl-4 flex items-center text-xs text-muted-foreground pt-3">
                    <Footprints className="h-3.5 w-3.5 mr-2 text-primary/80" />
                    <span>{activity.distanceToNext}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pl-1"> {/* Aligned with activities, added margin top */}
            <Button variant="outline" className="rounded-full text-sm">
              <Plus className="mr-2 h-4 w-4" /> {getTranslation('addActivity', 'Add')}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
