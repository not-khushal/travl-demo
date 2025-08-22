
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plane, Map, Tag, Flag, BookOpen, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export type TripCategory = 'takeoffLane' | 'trailboard' | 'vibeTagged' | 'milesBehind' | 'soulLogs';

interface MyTripsSidebarProps {
  activeCategory: TripCategory;
  onSelectCategory: (category: TripCategory) => void;
}

export function MyTripsSidebar({ activeCategory, onSelectCategory }: MyTripsSidebarProps) {
  const { getTranslation } = useLanguage();

  const categories = [
    { id: 'takeoffLane', labelKey: 'myTripsTakeoffLane', fallback: 'Takeoff Lane', icon: Plane },
    { id: 'trailboard', labelKey: 'myTripsTrailboard', fallback: 'Trailboard', icon: Map },
    { id: 'vibeTagged', labelKey: 'myTripsVibeTagged', fallback: 'Vibe Tagged', icon: Tag },
    { id: 'milesBehind', labelKey: 'myTripsMilesBehind', fallback: 'Miles Behind', icon: Flag },
    { id: 'soulLogs', labelKey: 'myTripsSoulLogs', fallback: 'Soul Logs', icon: BookOpen },
  ] as const;

  return (
    <aside className="w-20 md:w-64 bg-[#4d3c2d]/30 backdrop-blur-xl border-r border-yellow-200/20 text-yellow-50/90 flex flex-col justify-between transition-all duration-300 ease-in-out">
      <div>
        {/* Header section similar to WanderChats */}
        <div className="p-4 border-b border-yellow-200/20 flex items-center justify-between">
            <h2 className="font-headline text-2xl font-semibold text-yellow-50/90 hidden md:block">
              {getTranslation('myTripsMenu', 'My Trips')}
            </h2>
            <Link href="/profile/phil-harrison" className="flex items-center gap-2 group md:ml-auto">
              <Avatar className="h-8 w-8 group-hover:ring-2 group-hover:ring-amber-400 transition-all">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop" alt="Phil" data-ai-hint="user avatar male" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </Link>
        </div>
        <nav className="space-y-2 p-3">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={'ghost'}
                className={cn(
                  "w-full justify-start text-sm h-10 px-3 transition-all duration-200 group",
                  isActive 
                    ? "bg-amber-600/30 text-amber-200 shadow-inner shadow-black/20 ring-1 ring-amber-500/50" 
                    : "text-yellow-200/70 hover:bg-black/20 hover:text-amber-300"
                )}
                onClick={() => onSelectCategory(category.id)}
              >
                <Icon className={cn("h-5 w-5 mr-0 md:mr-3 transition-colors", isActive ? "text-amber-300" : "text-yellow-200/70 group-hover:text-amber-300")} />
                <span className="hidden md:inline">{getTranslation(category.labelKey, category.fallback)}</span>
                {isActive && <span className="hidden md:inline ml-auto h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>}
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="space-y-2 mt-auto p-3 border-t border-yellow-200/20">
         <Button
            variant="ghost"
            className="w-full justify-start text-sm h-10 px-3 text-yellow-200/70 hover:bg-black/20 hover:text-amber-300"
          >
            <Settings className="h-5 w-5 mr-0 md:mr-3" />
            <span className="hidden md:inline">{getTranslation('settings', 'Settings')}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm h-10 px-3 text-yellow-200/70 hover:bg-red-900/40 hover:text-red-300"
          >
            <LogOut className="h-5 w-5 mr-0 md:mr-3" />
            <span className="hidden md:inline">{getTranslation('logout', 'Logout')}</span>
          </Button>
      </div>
    </aside>
  );
}
