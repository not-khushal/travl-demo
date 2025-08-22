
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Users, DollarSign, Plus, Sparkles, Search, Rocket } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DateRange } from 'react-day-picker';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Re-implement CounterRow from AnimatedSearchBar
const CounterRow = ({
  title,
  subtitle,
  count,
  onDecrement,
  onIncrement,
  min = 0,
}: {
  title: string;
  subtitle?: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
}) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <h5 className="font-medium text-foreground">{title}</h5>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onDecrement}
        disabled={count <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-4 text-center font-semibold text-lg">{count}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

// Re-implement budget options from AnimatedSearchBar
const budgetOptions = [
  { value: 'any', label: 'Any budget' },
  { value: 'budget', label: '$ Budget' },
  { value: 'mid', label: '$$ Mid-range' },
  { value: 'luxury', label: '$$$ Luxury' },
];
const budgetKeys = budgetOptions.map(opt => opt.value);

interface TripSubNavProps {
  title: string;
  itemCount: number;
  
  location: string;
  onLocationChange: (value: string) => void;

  dateRange: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;

  adults: number;
  onAdultsChange: (value: number) => void;
  children: number;
  onChildrenChange: (value: number) => void;

  budget: string;
  onBudgetChange: (value: string) => void;
}

export function TripSubNav({ 
  title, 
  itemCount,
  location,
  onLocationChange,
  dateRange,
  onDateRangeChange,
  adults,
  onAdultsChange,
  children,
  onChildrenChange,
  budget,
  onBudgetChange,
}: TripSubNavProps) {
  const { getTranslation } = useLanguage();
  
  const totalTravelers = adults + children;
  let travelersDisplay = `${totalTravelers} traveler${totalTravelers !== 1 ? 's' : ''}`;

  let durationDisplay = "Select dates";
  if (dateRange?.from && dateRange.to) {
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    durationDisplay = `${days} day${days !== 1 ? 's' : ''}`;
  } else if (dateRange?.from) {
    durationDisplay = format(dateRange.from, 'LLL dd, y');
  }

  const budgetIndex = Math.max(0, budgetKeys.indexOf(budget));
  const selectedBudgetLabel = budgetOptions[budgetIndex]?.label || 'Any budget';

  const handleSliderChange = (newIndex: number) => {
    onBudgetChange(budgetKeys[newIndex]);
  };
  
  const handleSearch = () => {
    console.log("SubNav Search Clicked", {
      location,
      dateRange,
      adults,
      children,
      budget
    });
    alert('Search functionality to be implemented. Check console for values.');
  };

  return (
    <div className="sticky top-16 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">
        
        {/* Left Side: Trip Title */}
        <div className="flex-shrink-0 min-w-0">
          <Button variant="ghost" className="p-1 h-auto text-foreground hover:bg-muted">
            <span className="font-semibold text-sm truncate max-w-[150px] sm:max-w-xs md:max-w-sm" title={title}>
              {title}
            </span>
            <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
          </Button>
        </div>
        
        {/* Center: Trip Parameters (Absolutely Positioned) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center border rounded-full text-sm font-medium shadow-inner bg-muted/30 h-10">
              {/* Location Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-1.5 h-full rounded-l-full hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{location}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-2">
                   <Input
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                  />
                </PopoverContent>
              </Popover>

              <div className="h-4 border-l border-border" />

              {/* Duration/Dates Popover */}
              <Popover>
                 <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-1.5 h-full rounded-none hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{durationDisplay}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 mt-2">
                  <DatePickerWithRange date={dateRange} onSelectDate={onDateRangeChange} />
                </PopoverContent>
              </Popover>

              <div className="h-4 border-l border-border" />

              {/* Travelers Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-1.5 h-full rounded-none hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{travelersDisplay}</Button>
                </PopoverTrigger>
                 <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                    <CounterRow 
                        title="Adults"
                        subtitle="Ages 13 or above"
                        count={adults}
                        onDecrement={() => onAdultsChange(Math.max(1, adults - 1))}
                        onIncrement={() => onAdultsChange(adults + 1)}
                        min={1}
                    />
                    <Separator className="my-2"/>
                    <CounterRow 
                        title="Children"
                        subtitle="Ages 2–12"
                        count={children}
                        onDecrement={() => onChildrenChange(Math.max(0, children - 1))}
                        onIncrement={() => onChildrenChange(children + 1)}
                    />
                </PopoverContent>
              </Popover>
               
              <div className="h-4 border-l border-border" />
              
              {/* Budget Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-1.5 h-full rounded-r-full text-muted-foreground hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{selectedBudgetLabel}</Button>
                </PopoverTrigger>
                 <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                    <h4 className="font-medium text-center text-lg mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                        {selectedBudgetLabel}
                    </p>
                    <Slider
                        value={[budgetIndex]}
                        onValueChange={(value) => handleSliderChange(value[0])}
                        max={budgetKeys.length - 1}
                        step={1}
                        className="my-6"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        {budgetOptions.map(opt => <span key={opt.value}>{opt.label.split(' ')[0]}</span>)}
                    </div>
                </PopoverContent>
              </Popover>
            </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
            <Button asChild variant="outline" className="h-9 hidden sm:flex">
              <Link href={`/appscout?destination=${encodeURIComponent(location)}`}>
                <Rocket className="h-4 w-4 mr-2" />
                AppScout
              </Link>
            </Button>
            <Button
              variant="default"
              className="h-9 relative bg-primary hover:bg-primary/90 rounded-md shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/trip-sync">
                <Sparkles className="h-4 w-4 mr-2" />
                TripSync
              </Link>
            </Button>
             <Button
              variant="default"
              className="h-9 relative bg-accent hover:bg-accent/90 text-accent-foreground rounded-md shadow-lg shadow-accent/20"
              asChild
            >
              <Link href="/autobudgeter">
                <DollarSign className="h-4 w-4 mr-2" />
                AutoBudgeter
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
