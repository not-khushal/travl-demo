
'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Added TabsContent
import { CarFront, Anchor, Palmtree } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import type { ReactNode } from "react";

interface ItineraryTabsProps {
  children: ReactNode; // To accept TabsContent as children
}

export function ItineraryTabs({ children }: ItineraryTabsProps) {
  const { getTranslation } = useLanguage();

  const tabs = [
    { value: "nice", labelKey: "locationNice", fallbackLabel: "Nice", icon: CarFront, count: 1 },
    { value: "cannes", labelKey: "locationCannes", fallbackLabel: "Cannes", icon: Anchor, count: 2 },
    { value: "sttropez", labelKey: "locationStTropez", fallbackLabel: "Saint-Tropez", icon: Palmtree, count: 3 },
  ];

  return (
    <Tabs defaultValue="nice" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:max-w-md bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center justify-center gap-2 px-1 py-1.5 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
          >
            <span className="bg-foreground text-background rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              {tab.count}
            </span>
            <tab.icon className="h-4 w-4 hidden sm:inline-block" />
            {getTranslation(tab.labelKey, tab.fallbackLabel)}
          </TabsTrigger>
        ))}
      </TabsList>
      {children} {/* Render TabsContent here */}
    </Tabs>
  );
}
