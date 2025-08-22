'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import type { Activity } from './ActivityCard';
import { CalendarEvent } from './CalendarEvent';

export interface TripDay {
  day: number;
  date: string; // e.g., 'Jul 15'
  activities: Activity[];
}

interface CalendarViewProps {
  tripDays: TripDay[];
}

const timeLabels = [
  '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'
];

export function CalendarView({ tripDays }: CalendarViewProps) {
  
  const handleExport = () => {
    console.log("Export to Google Calendar clicked. Functionality to be implemented.");
    alert("Export to Google Calendar functionality is not yet implemented.");
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Calendar <span className="text-muted-foreground font-normal">7 days</span>
        </h3>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={handleExport} className="h-8">
            <Upload className="h-4 w-4 mr-2"/>
            Add to Google Calendar
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        className="grid grid-cols-[40px_repeat(7,1fr)] grid-rows-[auto_auto_repeat(60,minmax(0,1fr))] gap-x-1"
        style={{ height: '75vh' }}
      >
        {/* Empty top-left cell */}
        <div className="col-start-1 row-start-1"></div>

        {/* Day headers */}
        {tripDays.map((dayData, index) => (
          <div key={`header-${dayData.day}`} className="col-start-[var(--col-start)] row-start-1 text-center py-2" style={{ '--col-start': index + 2 } as React.CSSProperties}>
            <p className="text-xs text-muted-foreground">Day</p>
            <p className="text-lg font-semibold">{dayData.day}</p>
          </div>
        ))}
        
        {/* All-day header and events row */}
        <div className="col-start-1 row-start-2 text-xs text-muted-foreground text-center self-center">all-day</div>
        <div className="col-start-2 col-span-7 row-start-2 grid grid-cols-7 grid-rows-1 min-h-[3rem] border-t border-b border-border/50">
           {tripDays.map((dayData) => (
              dayData.activities
                .filter(activity => !activity.time) // Render only activities without a specific time
                .map((activity, activityIndex) => (
                  <CalendarEvent
                    key={`allday-${dayData.day}-${activityIndex}`}
                    event={activity}
                    day={dayData.day}
                  />
                ))
            ))}
        </div>

        {/* Time labels and grid lines */}
        {timeLabels.map((label, index) => {
          // Each hour is 5 rows. Start row is 3.
          const rowStart = 3 + index * 5;
          return (
            <React.Fragment key={label}>
              <div 
                className="row-start-[var(--row-start)] col-start-1 text-xs text-muted-foreground text-right pr-2 -mt-2"
                style={{ gridRowStart: rowStart }}
              >
                {label}
              </div>
              <div 
                className="row-start-[var(--row-start)] col-start-2 col-span-7 border-t border-border/50"
                style={{ gridRowStart: rowStart }}
              ></div>
            </React.Fragment>
          );
        })}
        
        {/* Calendar Events */}
        {tripDays.map((dayData) => (
          dayData.activities
            .filter(activity => !!activity.time) // Render only activities with a specific time
            .map((activity, activityIndex) => (
              <CalendarEvent
                key={`${dayData.day}-${activityIndex}`}
                event={activity}
                day={dayData.day}
              />
            ))
        ))}
      </div>
    </div>
  );
}
