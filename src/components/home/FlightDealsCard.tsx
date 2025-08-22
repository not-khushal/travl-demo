'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plane, ExternalLink } from 'lucide-react';

interface FlightDealProps {
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  airline: string;
  airlineLogoUrl: string;
  price: string;
  duration: string;
}

const FlightDealRow: React.FC<FlightDealProps> = ({ fromCity, fromCode, toCity, toCode, airline, airlineLogoUrl, price, duration }) => {
  return (
    <div className="flex items-center gap-4 py-3">
      <Image 
        src={airlineLogoUrl} 
        alt={`${airline} logo`} 
        width={32} 
        height={32} 
        className="rounded-full object-contain bg-white p-0.5"
        data-ai-hint={`${airline.toLowerCase()} logo`}
      />
      <div className="flex-grow grid grid-cols-3 items-center gap-2">
        <div className="text-left">
          <div className="font-bold text-lg text-foreground">{fromCode}</div>
          <div className="text-xs text-muted-foreground">{fromCity}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">{duration}</div>
          <div className="relative h-px bg-border my-1">
            <Plane className="h-4 w-4 text-muted-foreground bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1" />
          </div>
          <div className="text-xs text-primary font-medium">{airline}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg text-foreground">{toCode}</div>
          <div className="text-xs text-muted-foreground">{toCity}</div>
        </div>
      </div>
      <div className="text-right w-20 flex-shrink-0">
          <div className="font-semibold text-lg text-foreground">{price}</div>
          <div className="text-xs text-muted-foreground">Round trip</div>
      </div>
    </div>
  );
}

const flightDealsData: FlightDealProps[] = [
    {
        fromCity: 'Berlin', fromCode: 'BER', toCity: 'Majorca', toCode: 'PMI', duration: '2h 45m', price: '$125', airline: 'Ryanair', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/10/Ryanair-Logo.png'
    },
    {
        fromCity: 'New York', fromCode: 'JFK', toCity: 'London', toCode: 'LHR', duration: '7h 15m', price: '$450', airline: 'British Airways', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/British-Airways-Logo.png'
    },
    {
        fromCity: 'Tokyo', fromCode: 'HND', toCity: 'Seoul', toCode: 'ICN', duration: '2h 20m', price: '$180', airline: 'Korean Air', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2021/04/Korean-Air-Logo.png'
    },
    {
        fromCity: 'Los Angeles', fromCode: 'LAX', toCity: 'Sydney', toCode: 'SYD', duration: '15h 5m', price: '$950', airline: 'Qantas', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/Qantas-Logo-1984-2007.png'
    },
    {
        fromCity: 'Dubai', fromCode: 'DXB', toCity: 'Istanbul', toCode: 'IST', duration: '4h 30m', price: '$320', airline: 'Emirates', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png'
    },
    {
        fromCity: 'Singapore', fromCode: 'SIN', toCity: 'Bali', toCode: 'DPS', duration: '2h 40m', price: '$150', airline: 'Singapore Airlines', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/07/Singapore-Airlines-Logo.png'
    },
];


export const FlightDealsCard: React.FC = () => {
  return (
    <Card 
      className="overflow-hidden rounded-xl w-full p-0 bg-card h-full flex flex-col border-none"
    >
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-2xl font-semibold text-foreground">Top Flight Deals</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Based on your preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-grow flex flex-col">
        <div className="flex-grow divide-y divide-border/50">
          {flightDealsData.map((deal, index) => (
            <FlightDealRow key={index} {...deal} />
          ))}
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <p>Powered by Skyscanner</p>
          <Button variant="outline" size="sm" className="h-8">
            View All Deals <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
