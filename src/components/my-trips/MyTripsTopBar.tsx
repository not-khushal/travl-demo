
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, CalendarDays, Globe, Smile, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MyTripsTopBarProps {
  onSearch: (query: string) => void;
  onAddTrip: () => void;
}

export function MyTripsTopBar({ onSearch, onAddTrip }: MyTripsTopBarProps) {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="p-4 border-b border-yellow-200/20 bg-[#4d3c2d]/20 backdrop-blur-lg sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-200/60" />
          <Input
            type="search"
            placeholder={getTranslation('myTripsSearchPlaceholder', 'Find your lost skies...')}
            className="pl-10 pr-4 py-2 h-10 rounded-lg border-yellow-200/20 bg-black/20 focus:border-amber-400 text-sm w-full text-yellow-50/90 placeholder:text-yellow-200/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <Button variant="outline" size="sm" className="h-9 text-xs bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
            <CalendarDays className="h-4 w-4 mr-1.5" /> {getTranslation('filterDate', 'Date')}
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
            <Globe className="h-4 w-4 mr-1.5" /> {getTranslation('filterCountry', 'Country')}
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
            <Smile className="h-4 w-4 mr-1.5" /> {getTranslation('filterMoodRelax', 'Relax')}
          </Button>
           <Button variant="outline" size="icon" className="h-9 w-9 bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
             <SlidersHorizontal className="h-4 w-4" />
             <span className="sr-only">{getTranslation('filterMore', 'More Filters')}</span>
           </Button>
        </div>
        <Button
          size="default"
          className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white hover:opacity-90 transition-opacity shadow-lg rounded-lg h-10 px-4 w-full sm:w-auto"
          onClick={onAddTrip}
        >
          <Plus className="h-5 w-5 mr-2" /> {getTranslation('myTripsAddTrip', 'Add Trip')}
        </Button>
      </div>
    </div>
  );
}
