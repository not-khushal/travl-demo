'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { Activity } from './ActivityCard';
import { Car, Hotel, MapPin as AttractionIcon, Sailboat, Utensils, Coffee } from 'lucide-react';

interface CalendarEventProps {
  event: Activity;
  day: number;
}

const typeInfo: { [key: string]: { icon: React.ElementType; color: string } } = {
  Travel: { icon: Car, color: 'bg-purple-200/80 border-purple-400 text-purple-900' },
  Accommodation: { icon: Hotel, color: 'bg-purple-200/80 border-purple-400 text-purple-900' },
  Attraction: { icon: AttractionIcon, color: 'bg-teal-200/80 border-teal-400 text-teal-900' },
  Activity: { icon: Sailboat, color: 'bg-teal-200/80 border-teal-400 text-teal-900' },
  Food: { icon: Utensils, color: 'bg-amber-200/80 border-amber-400 text-amber-900' },
  Break: { icon: Coffee, color: 'bg-stone-200/80 border-stone-400 text-stone-900' },
  default: { icon: AttractionIcon, color: 'bg-gray-200/80 border-gray-400 text-gray-900' },
};

// Helper to convert time string (e.g., "9:30 AM") to a grid row number
const timeToRow = (time?: string): number => {
  if (!time) return 2; // Place in all-day row if no time

  const timeParts = time.split(' ');
  const modifier = timeParts.length > 1 ? timeParts[1].toUpperCase() : 'AM';
  let [hours, minutes] = timeParts[0].split(':').map(Number);
  
  if (isNaN(hours)) return 2;

  if (hours === 12) {
    hours = modifier === 'AM' ? 0 : 12;
  } else if (modifier === 'PM') {
    hours += 12;
  }

  const totalMinutesFromMidnight = hours * 60 + (minutes || 0);
  const startMinutes = 7 * 60; // Grid starts at 7:00 AM

  if (totalMinutesFromMidnight < startMinutes) return 2; 
  
  // Grid starts at row 3 (after headers and all-day row), 5 rows per hour (12-minute intervals)
  return Math.floor((totalMinutesFromMidnight - startMinutes) / 12) + 3;
};

// Helper to parse duration string (e.g., "1.5h", "30min") to row span
const parseDurationToRows = (duration?: string): number => {
  if (!duration) return 5; // Default to 1 hour (5 rows)
  
  let totalMinutes = 0;
  const hourMatch = duration.match(/(\d+\.?\d*)\s*h/);
  const minMatch = duration.match(/(\d+)\s*min/);

  if (hourMatch) {
    totalMinutes += parseFloat(hourMatch[1]) * 60;
  }
  if (minMatch) {
    totalMinutes += parseInt(minMatch[1], 10);
  }
  
  if (totalMinutes === 0) return 5;
  if (totalMinutes < 30) return 3;

  // 5 rows per hour (12 mins per row)
  return Math.max(1, Math.ceil(totalMinutes / 12));
};


export function CalendarEvent({ event, day }: CalendarEventProps) {
  const startRow = timeToRow(event.time);
  const rowSpan = parseDurationToRows(event.duration);
  
  const { icon: Icon, color } = typeInfo[event.type] || typeInfo.default;
  const isAllDay = startRow === 2;

  const style: React.CSSProperties = isAllDay ? {
    gridColumnStart: day + 1,
    gridRowStart: 2,
    zIndex: 10,
  } : {
    gridColumnStart: day + 1,
    gridRow: `${startRow} / span ${rowSpan}`,
    zIndex: 10,
  };

  if(isAllDay) {
    return (
      <div
        style={style}
        className={cn(
          'm-0.5 p-1 rounded-md border text-xs overflow-hidden flex items-center gap-1.5',
          color
        )}
      >
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        <p className="font-semibold leading-tight truncate">{event.title}</p>
      </div>
    );
  }

  return (
    <div
      style={style}
      className={cn(
        'm-0.5 p-2 rounded-lg border text-xs overflow-hidden flex flex-col',
        color
      )}
    >
      <div className="flex items-start gap-1.5">
          <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <div className="flex-grow">
              <p className="font-semibold leading-tight">{event.title}</p>
              <p className="opacity-80 leading-tight">{event.time}</p>
          </div>
      </div>
    </div>
  );
}
