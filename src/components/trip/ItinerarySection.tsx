'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, FileEdit, MessageSquare, Maximize, CreditCard, List, Calendar } from 'lucide-react';
import { ItineraryTabs } from './ItineraryTabs';
import { ItineraryDayCard } from './ItineraryDayCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView, type TripDay } from './CalendarView';
import { ActivityCard } from './ActivityCard';

interface ItinerarySectionProps {
  tripTitle: string;
  tripDateRange: string;
}

// Static data remains the same as before
const niceDay1Data = {
  dayTitleKey: 'itineraryDay1NiceTitle',
  dayTitleFallback: 'Day 1: Arrival and Relaxing Evening in Nice',
  date: '15 Jul, 2025',
  descriptionKey: 'itineraryDay1NiceDesc',
  descriptionFallback: 'Arrive in Nice after your long drive from Berlin and check in at Hotel Le Negresco. Spend a relaxing evening strolling along the iconic Promenade des Anglais, enjoying the sea breeze and beautiful sunset. For dinner, indulge in exquisite French cuisine at Le Chantecler, the Michelin-starred restaurant inside your hotel, perfect for a luxurious yet restful first night.',
  linkableTexts: [
    { textKey: 'hotelLeNegresco', textFallback: 'Hotel Le Negresco' },
    { textKey: 'promenadeDesAnglais', textFallback: 'Promenade des Anglais' },
    { textKey: 'leChantecler', textFallback: 'Le Chantecler' },
  ],
  tipsKey: 'itineraryDay1NiceTips',
  tipsFallback: 'After a long drive, keep activities light and enjoy the calming sea views to unwind and adjust to the local time.',
  activities: [
    {
      typeKey: 'activityTypeTravel', fallbackType: 'Travel',
      titleKey: 'activityTravelBerlinNiceTitle', fallbackTitle: 'Drive from Berlin → Nice',
      duration: '12h 30 min',
      icon: 'Car',
      aiHint: 'car dashboard road',
    },
    {
      typeKey: 'activityTypeAccommodation', fallbackType: 'Accommodation',
      titleKey: 'hotelLeNegresco', fallbackTitle: 'Hotel Le Negresco',
      time: '3:00 PM',
      duration: '1h 15min',
      imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=100&h=100&fit=crop', 
      imageAlt: 'Luxury hotel room with a balcony view', 
      aiHint: 'luxury hotel room',
      rating: 9.2,
      reviewsKey: 'hotelReviews', fallbackReviews: 'Wonderful (1719 Reviews)',
      priceKey: 'hotelPrice', fallbackPrice: '₹139,796 per night • 2 guests',
      icon: 'Hotel',
      distanceToNext: '50m walk',
    },
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'promenadeDesAnglais', fallbackTitle: 'Promenade des Anglais',
      time: '4:15 PM',
      duration: '45min',
      imageUrl: 'https://images.unsplash.com/photo-1558996422-5503b3f4137dfe?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'Promenade des Anglais in Nice with its iconic blue chairs', 
      aiHint: 'nice promenade chairs',
      categoryKey: 'attractionCategorySight', fallbackCategory: 'Sightseeing Spot',
      icon: 'Attraction',
    },
  ],
};

const niceDay2Data = {
  dayTitleKey: 'itineraryDay2NiceTitleNew',
  dayTitleFallback: "Day 2: Vibrant Markets, Old Town Charm & Scenic Drive",
  date: '16 Jul, 2025',
  descriptionKey: 'itineraryDay2NiceDescNew',
  descriptionFallback: "Start your day with a visit to the vibrant Cours Saleya Flower Market to experience local colors and flavors. Then explore the charming Nice Old Town (Vieux Nice) with its narrow streets and lively atmosphere. Enjoy lunch at La Petite Maison, known for its refined Niçoise cuisine. In the afternoon, embark on the exciting From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle tour, a fun and unique way to discover the French Riviera's highlights. End the day with a casual dinner at Bistrot d'Antoine, a local favorite with a cozy ambiance.",
  linkableTexts: [
    { textKey: 'coursSaleya', textFallback: 'Cours Saleya Flower Market' },
    { textKey: 'vieuxNice', textFallback: 'Nice Old Town (Vieux Nice)' },
    { textKey: 'laPetiteMaison', textFallback: 'La Petite Maison' },
    { textKey: 'fromNice2HourScenicDrive', textFallback: 'From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle' },
    { textKey: 'bistrotDAntoine', textFallback: "Bistrot d'Antoine" },
  ],
  tipsKey: 'itineraryDay2NiceTipsNew',
  tipsFallback: "Book the 3-wheel vehicle tour in advance to secure your preferred time and enjoy a memorable adventure.",
  activities: [
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'activityCoursSaleyaTitle', fallbackTitle: 'Cours Saleya Flower Market',
      time: '10:00 AM',
      duration: '1h',
      imageUrl: 'https://images.unsplash.com/photo-1562916568-3654054a140f?q=80&w=400&h=300&fit=crop',
      imageAlt: 'Colorful flowers at a bustling market', 
      aiHint: 'flower market',
      categoryKey: 'attractionCategoryMarket', fallbackCategory: 'Market Visit',
      icon: 'Attraction',
      distanceToNext: '200m walk',
    },
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'activityNiceOldTownTitle', fallbackTitle: 'Nice Old Town (Vieux Nice)',
      time: '11:00 AM',
      duration: '1.5h',
      imageUrl: 'https://images.unsplash.com/photo-1588892955217-a9a3b2598322?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'Charming colorful street in Nice Old Town', 
      aiHint: 'nice old town',
      categoryKey: 'attractionCategoryCultural', fallbackCategory: 'Cultural Exploration',
      icon: 'Attraction',
      distanceToNext: '500m walk',
    },
    {
      typeKey: 'activityTypeActivity', fallbackType: 'Activity',
      titleKey: 'activityScenicDrive3WheelTitle', fallbackTitle: 'From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle',
      time: '2:00 PM',
      duration: '2 hours',
      imageUrl: 'https://images.unsplash.com/photo-1520175488228-40a4a44062a4?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'A fun 3-wheel vehicle parked on a scenic road', 
      aiHint: 'vehicle coastal view',
      personsKey: 'activityScenicDrive3WheelPersons', fallbackPersons: '2 person',
      icon: 'Car',
    },
  ],
};

const niceDay3Data = {
  dayTitleKey: 'itineraryDay3NiceNewTitle',
  dayTitleFallback: 'Day 3: Art, Views & Departure to Cannes',
  date: '17 Jul, 2025',
  descriptionKey: 'itineraryDay3NiceNewDesc',
  descriptionFallback: "After checking out from Hotel Le Negresco, visit the Marc Chagall National Museum to immerse in beautiful art. Then take a leisurely walk through Massena Square (Place Masséna) and nearby Castle Hill (Colline du Château) for panoramic views of Nice and the coastline. Have a light lunch at Café de Turin, famous for its seafood. Depart for Cannes by car in the early afternoon, a short 1-hour drive, ready for the next leg of your luxury trip.",
  linkableTexts: [
      { textKey: 'hotelLeNegresco', textFallback: 'Hotel Le Negresco' },
      { textKey: 'marcChagallMuseum', textFallback: 'Marc Chagall National Museum' },
      { textKey: 'massenaSquare', textFallback: 'Massena Square (Place Masséna)' },
      { textKey: 'castleHill', textFallback: 'Castle Hill (Colline du Château)' },
      { textKey: 'cafeDeTurin', textFallback: 'Café de Turin' },
  ],
  tipsKey: 'itineraryDay3NiceNewTips',
  tipsFallback: 'Morning visits are best to avoid crowds and enjoy cooler temperatures before your drive to Cannes.',
  activities: [
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'marcChagallMuseumActivityTitle', fallbackTitle: 'Marc Chagall National Museum',
      time: '9:30 AM',
      duration: '1.5h',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&h=300&fit=crop',
      imageAlt: 'Interior of an art museum with stained glass', 
      aiHint: 'art museum',
      categoryKey: 'attractionCategoryMuseum', fallbackCategory: 'Museum',
      icon: 'Attraction',
      distanceToNext: '1.5km walk',
    },
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'massenaSquareActivityTitle', fallbackTitle: 'Massena Square (Place Masséna)',
      time: '11:00 AM',
      duration: '30min',
      imageUrl: 'https://images.unsplash.com/photo-1562916568-3654054a140f?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'The fountain and statues at Massena Square in Nice', 
      aiHint: 'nice square',
      categoryKey: 'attractionCategorySight', fallbackCategory: 'Sightseeing Spot',
      icon: 'Attraction',
      distanceToNext: '800m walk',
    },
  ],
};

const cannesDay3Data = {
  date: '17 Jul, 2025',
  activities: [
    {
      typeKey: 'activityTypeTravel', fallbackType: 'Travel',
      titleKey: 'activityTravelNiceCannesTitle', fallbackTitle: 'Drive from Nice → Cannes',
      time: '1:00 PM',
      duration: '42 min',
      icon: 'Car',
      aiHint: 'car dashboard road',
    },
    {
      typeKey: 'activityTypeAccommodation', fallbackType: 'Accommodation',
      titleKey: 'mobHotelCannesActivityTitle', fallbackTitle: 'MOB HOTEL Cannes',
      time: '2:00 PM',
      duration: '1.5h',
      imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'Swimming pool at MOB HOTEL Cannes', 
      aiHint: 'hotel pool luxury',
      rating: 8.4,
      reviewsKey: 'mobHotelReviewsCannes', fallbackReviews: 'Very Good (198 Reviews)',
      discountKey: 'mobHotelDiscount', fallbackDiscount: '15% off',
      priceKey: 'mobHotelPriceCannes', fallbackPrice: '₹24,108 per night • 2 guests',
      icon: 'Hotel',
      distanceToNext: '2km walk',
    },
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'leSuquetAttractionTitleCannes', fallbackTitle: 'Le Suquet',
      time: '4:00 PM',
      duration: '1.5h',
      imageUrl: 'https://images.unsplash.com/photo-1616686417942-0f0438a0f9f8?q=80&w=400&h=300&fit=crop', 
      imageAlt: 'View of Cannes harbor from Le Suquet old town', 
      aiHint: 'cannes harbor view',
      categoryKey: 'attractionCategoryGeneral', fallbackCategory: 'Attraction',
      icon: 'Attraction',
    },
  ],
};

const cannesDay4Data = {
  date: '18 Jul, 2025',
  activities: [
    {
      typeKey: 'activityTypeActivity', fallbackType: 'Activity',
      titleKey: 'cannesPrivateBoatTrip', fallbackTitle: "Cannes: Private Boat Trip to Lerins Islands & Cap d'Antibes",
      time: '10:00 AM',
      duration: '3 hours',
      imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=400&h=300&fit=crop',
      imageAlt: "A boat near the Lerins Islands in Cannes", 
      aiHint: 'boat cove',
      personsKey: 'cannesPrivateBoatTripPersons', fallbackPersons: '2 person',
      icon: 'Sailboat',
    },
  ],
};

const cannesDay5Data = {
  date: '19 Jul, 2025',
  activities: [
    {
      typeKey: 'activityTypeAttraction', fallbackType: 'Attraction',
      titleKey: 'marcheForvilleActivityTitle', fallbackTitle: 'Marché Forville',
      time: '9:00 AM',
      duration: '1h',
      imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=100&h=100&fit=crop', 
      imageAlt: 'Fresh produce at Marché Forville', 
      aiHint: 'french market',
      categoryKey: 'attractionCategoryMarket', fallbackCategory: 'Market Visit',
      icon: 'Attraction',
      distanceToNext: '600m walk',
    },
  ],
};

const stTropezDay5Data = {
    date: '19 Jul, 2025',
    activities: [
        {
          typeKey: 'activityTypeTravel', fallbackType: 'Travel',
          titleKey: 'activityTravelCannesStTropezTitle', fallbackTitle: 'Drive from Cannes → Saint-Tropez',
          time: '11:00 AM',
          duration: '1h 28 min',
          icon: 'Car',
          aiHint: 'car dashboard road',
        },
        {
          typeKey: 'activityTypeAccommodation', fallbackType: 'Accommodation',
          titleKey: 'villaCosyHotelSpaActivityTitle', fallbackTitle: 'Villa Cosy, hotel & spa',
          time: '1:00 PM',
          duration: '2h',
          imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=100&h=100&fit=crop', 
          imageAlt: 'Luxurious spa at Villa Cosy', 
          aiHint: 'resort pool',
          rating: 9.2,
          reviewsKey: 'villaCosyHotelSpaReviews', fallbackReviews: 'Wonderful (231 Reviews)',
          priceKey: 'villaCosyHotelSpaPrice', fallbackPrice: '₹365,789 per night • 2 guests',
          icon: 'Hotel',
          distanceToNext: '1.2km walk',
        },
    ],
};

const stTropezDay6Data = {
    date: '20 Jul, 2025',
    activities: [
        {
          typeKey: 'activityTypeActivity', fallbackType: 'Activity',
          titleKey: 'coteDAzurSailingTourActivityTitle', fallbackTitle: "Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour",
          time: '9:00 AM',
          duration: '3 hours',
          imageUrl: 'https://images.unsplash.com/photo-1510528445852-a602d18c1483?q=80&w=400&h=300&fit=crop',
          imageAlt: "Catamaran sailing on the Côte d'Azur", 
          aiHint: 'catamaran sailing',
          personsKey: 'coteDAzurSailingTourPersons', fallbackPersons: '2 person',
          icon: 'Sailboat',
          distanceToNext: '3km drive',
        },
    ],
};

const stTropezDay7Data = {
    date: '21 Jul, 2025',
    activities: [
        {
          typeKey: 'activityTypeActivity', fallbackType: 'Activity',
          titleKey: 'stTropezKayakExperienceActivityTitle', fallbackTitle: "Saint-Tropez: Kayak Experience in Ramatuelle Reserve",
          time: '10:00 AM',
          duration: '3 hours',
          imageUrl: 'https://images.unsplash.com/photo-1581454159339-01a719918349?q=80&w=400&h=300&fit=crop',
          imageAlt: "Kayaking in the clear waters of Ramatuelle Reserve", 
          aiHint: 'kayak sea',
          personsKey: 'stTropezKayakExperiencePersons', fallbackPersons: '2 person',
          icon: 'Sailboat',
          distanceToNext: '4km drive',
        },
    ],
};

const stTropezDay8Data = {
    date: '22 Jul, 2025',
    activities: [
        {
          typeKey: 'activityTypeTravel', fallbackType: 'Travel',
          titleKey: 'activityTravelStTropezBerlinTitle', fallbackTitle: 'Drive from Saint-Tropez → Berlin',
          time: '9:00 AM',
          duration: '13h 45 min',
          icon: 'Car',
          aiHint: 'car dashboard road',
        },
    ],
};


export function ItinerarySection({ tripTitle, tripDateRange }: ItinerarySectionProps) {
  const { getTranslation } = useLanguage();
  const router = useRouter(); 

  // Combine all data for calendar view
  const tripDays: TripDay[] = [
    { day: 1, date: 'Jul 15', activities: niceDay1Data.activities },
    { day: 2, date: 'Jul 16', activities: niceDay2Data.activities },
    { day: 3, date: 'Jul 17', activities: [...niceDay3Data.activities, ...cannesDay3Data.activities] },
    { day: 4, date: 'Jul 18', activities: cannesDay4Data.activities },
    { day: 5, date: 'Jul 19', activities: [...cannesDay5Data.activities, ...stTropezDay5Data.activities] },
    { day: 6, date: 'Jul 20', activities: stTropezDay6Data.activities },
    { day: 7, date: 'Jul 21', activities: stTropezDay7Data.activities },
  ];

  const allBookings = [
    niceDay1Data.activities[1], // Hotel Le Negresco
    niceDay2Data.activities[2], // 3-Wheel Vehicle
    cannesDay3Data.activities[1], // MOB HOTEL Cannes
    cannesDay4Data.activities[0], // Private Boat Trip
    stTropezDay5Data.activities[1], // Villa Cosy, hotel & spa
    stTropezDay6Data.activities[0], // Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour
    stTropezDay7Data.activities[0], // Saint-Tropez: Kayak Experience in Ramatuelle Reserve
  ].filter(Boolean); // Filter out any potential undefined items
  

  const mapActivityData = (activity: any) => ({
    type: getTranslation(activity.typeKey, activity.fallbackType),
    title: getTranslation(activity.titleKey, activity.fallbackTitle),
    duration: activity.durationKey ? getTranslation(activity.durationKey, activity.fallbackDuration) : activity.duration,
    persons: activity.personsKey ? getTranslation(activity.personsKey, activity.fallbackPersons) : undefined,
    reviews: activity.reviewsKey ? getTranslation(activity.reviewsKey, activity.fallbackReviews) : undefined,
    price: activity.priceKey ? getTranslation(activity.priceKey, activity.fallbackPrice) : undefined,
    discount: activity.discountKey ? getTranslation(activity.discountKey, activity.fallbackDiscount) : undefined,
    category: activity.categoryKey ? getTranslation(activity.categoryKey, activity.fallbackCategory) : undefined,
    imageUrl: activity.imageUrl,
    imageAlt: activity.imageAlt || `${getTranslation(activity.titleKey, activity.fallbackTitle)} image`,
    aiHint: activity.aiHint || 'placeholder',
    icon: activity.icon,
    rating: activity.rating,
    time: activity.time,
    distanceToNext: activity.distanceToNext,
  });

  const handleCheckout = () => {
    router.push('/order-summary');
  };

  return (
    <section className="py-8 md:py-12">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <Tabs defaultValue="itinerary" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-muted p-1 rounded-lg">
                <TabsTrigger value="itinerary" className="flex items-center gap-2"><List className="h-4 w-4" />Itinerary</TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2"><Calendar className="h-4 w-4" />Calendar</TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Bookings</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="itinerary">
              <ItineraryTabs>
                <TabsContent value="nice">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {getTranslation('niceFranceLocation', 'Nice, France')} ({getTranslation('niceDurationDays', '1 - 3 Days')})
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getTranslation('niceDescriptionIntro', 'Nice is a stunning city on the French Riviera known for its beautiful beaches, vibrant old town, and luxury shopping. It’s perfect for couples looking to explore cultural sites and en...')}
                      <button className="text-primary hover:underline text-sm ml-1">{getTranslation('readMore', 'Read more')}</button>
                    </p>
                  </div>
                  <ItineraryDayCard
                    dayTitleKey={niceDay1Data.dayTitleKey}
                    dayTitleFallback={niceDay1Data.dayTitleFallback}
                    date={niceDay1Data.date}
                    descriptionKey={niceDay1Data.descriptionKey}
                    descriptionFallback={niceDay1Data.descriptionFallback}
                    linkableTexts={niceDay1Data.linkableTexts}
                    tipsKey={niceDay1Data.tipsKey}
                    tipsFallback={niceDay1Data.tipsFallback}
                    activities={niceDay1Data.activities.map(mapActivityData)}
                  />
                  <ItineraryDayCard
                    dayTitleKey={niceDay2Data.dayTitleKey}
                    dayTitleFallback={niceDay2Data.dayTitleFallback}
                    date={niceDay2Data.date}
                    descriptionKey={niceDay2Data.descriptionKey}
                    descriptionFallback={niceDay2Data.descriptionFallback}
                    linkableTexts={niceDay2Data.linkableTexts}
                    tipsKey={niceDay2Data.tipsKey}
                    tipsFallback={niceDay2Data.tipsFallback}
                    activities={niceDay2Data.activities.map(mapActivityData)}
                  />
                  <ItineraryDayCard
                    dayTitleKey={niceDay3Data.dayTitleKey}
                    dayTitleFallback={niceDay3Data.dayTitleFallback}
                    date={niceDay3Data.date}
                    descriptionKey={niceDay3Data.descriptionKey}
                    descriptionFallback={niceDay3Data.descriptionFallback}
                    linkableTexts={niceDay3Data.linkableTexts}
                    tipsKey={niceDay3Data.tipsKey}
                    tipsFallback={niceDay3Data.tipsFallback}
                    activities={niceDay3Data.activities.map(mapActivityData)}
                  />
                </TabsContent>
                <TabsContent value="cannes">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                        {getTranslation('cannesFranceLocation', 'Cannes, France')} {getTranslation('cannesFranceDurationSuffix', '(3 - 5 Days)')}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getTranslation('cannesDescriptionIntro', "Cannes is a glamorous city on the French Riviera, famous for its luxurious beaches, the prestigious Cannes Film Festival, and its charming old town. It's perfect for couples...")}
                      <button className="text-primary hover:underline text-sm ml-1">{getTranslation('readMore', 'Read more')}</button>
                    </p>
                  </div>
                  <ItineraryDayCard
                    dayTitleKey="itineraryDay3CannesTitle"
                    dayTitleFallback="Day 3: Arrival and Leisurely Exploration of Cannes"
                    date={cannesDay3Data.date}
                    descriptionKey="itineraryDay3CannesDesc"
                    descriptionFallback="Arrive in Cannes and check into MOB HOTEL. Explore the historic Le Suquet quarter and stroll along La Croisette Boulevard."
                    linkableTexts={[]}
                    tipsKey="itineraryDay3CannesTips"
                    tipsFallback="Enjoy the sunset from Le Suquet for amazing views."
                    activities={cannesDay3Data.activities.map(mapActivityData)}
                  />
                  <ItineraryDayCard
                    dayTitleKey="itineraryDay4CannesTitle"
                    dayTitleFallback="Day 4: Private Boat Adventure and Beach Relaxation"
                    date={cannesDay4Data.date}
                    descriptionKey="itineraryDay4CannesDesc"
                    descriptionFallback="Enjoy a private boat trip to the Lerins Islands and Cap d'Antibes. Relax on Plage de la Croisette in the afternoon."
                    linkableTexts={[]}
                    tipsKey="itineraryDay4CannesTips"
                    tipsFallback="Book the boat trip early to avoid midday heat."
                    activities={cannesDay4Data.activities.map(mapActivityData)}
                  />
                   <ItineraryDayCard
                    dayTitleKey="itineraryDay5CannesTitle"
                    dayTitleFallback="Day 5: Market Visit and Scenic Departure"
                    date={cannesDay5Data.date}
                    descriptionKey="itineraryDay5CannesDesc"
                    descriptionFallback="Visit the vibrant Marché Forville and stroll around the Port of Cannes before departing for Saint-Tropez."
                    linkableTexts={[]}
                    tipsKey="itineraryDay5CannesTips"
                    tipsFallback="Arrive at the market early for the best selection."
                    activities={cannesDay5Data.activities.map(mapActivityData)}
                  />
                </TabsContent>
                <TabsContent value="sttropez">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                        {getTranslation('stTropezFranceLocation', 'Saint-Tropez, France')} {getTranslation('stTropezFranceDurationSuffix', '(5 - 8 Days)')}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getTranslation('stTropezDescriptionIntro', "Saint-Tropez is a glamorous and iconic destination on the French Riviera, famous for its luxurious beaches, vibrant nightlife, and charming old town. It's perfect for couples seeking beautiful sandy shores and engaging water sports in a sophisticated setting. The town also offers exclusive shopping and exquisite dining experiences that will delight both adults and kids alike.")}
                      <button className="text-primary hover:underline text-sm ml-1">{getTranslation('readMore', 'Read more')}</button>
                    </p>
                  </div>
                   <ItineraryDayCard
                    dayTitleKey="itineraryDay5StTropezTitle"
                    dayTitleFallback="Day 5: Arrival and Leisure in Saint-Tropez"
                    date={stTropezDay5Data.date}
                    descriptionKey="itineraryDay5StTropezDesc"
                    descriptionFallback="Arrive from Cannes and check into Villa Cosy. Explore the charming St-Tropez Market and enjoy dinner at a Michelin-starred restaurant."
                    linkableTexts={[]}
                    tipsKey="itineraryDay5StTropezTips"
                    tipsFallback="Take it easy on arrival day to enjoy the market's atmosphere."
                    activities={stTropezDay5Data.activities.map(mapActivityData)}
                  />
                   <ItineraryDayCard
                    dayTitleKey="itineraryDay6StTropezTitle"
                    dayTitleFallback="Day 6: Sailing and Beach Relaxation"
                    date={stTropezDay6Data.date}
                    descriptionKey="itineraryDay6StTropezDesc"
                    descriptionFallback="Embark on a half-day catamaran sailing tour. Relax at the iconic Pampelonne Beach."
                    linkableTexts={[]}
                    tipsKey="itineraryDay6StTropezTips"
                    tipsFallback="Bring swimwear and sun protection."
                    activities={stTropezDay6Data.activities.map(mapActivityData)}
                  />
                  <ItineraryDayCard
                    dayTitleKey="itineraryDay7StTropezTitle"
                    dayTitleFallback="Day 7: Kayaking and Cultural Exploration"
                    date={stTropezDay7Data.date}
                    descriptionKey="itineraryDay7StTropezDesc"
                    descriptionFallback="Start with a kayak experience in Ramatuelle Reserve. Visit the St-Tropez Citadel and the Annonciade Museum."
                    linkableTexts={[]}
                    tipsKey="itineraryDay7StTropezTips"
                    tipsFallback="Wear comfortable shoes for walking."
                    activities={stTropezDay7Data.activities.map(mapActivityData)}
                  />
                   <ItineraryDayCard
                    dayTitleKey="itineraryDay8StTropezTitle"
                    dayTitleFallback="Day 8: Departure Day and Relaxation"
                    date={stTropezDay8Data.date}
                    descriptionKey="itineraryDay8StTropezDesc"
                    descriptionFallback="Enjoy a leisurely breakfast at Sénéquier and prepare for your departure."
                    linkableTexts={[]}
                    tipsKey="itineraryDay8StTropezTips"
                    tipsFallback="Keep the day light to avoid stress before the long drive."
                    activities={stTropezDay8Data.activities.map(mapActivityData)}
                  />
                </TabsContent>
              </ItineraryTabs>
            </TabsContent>

            <TabsContent value="calendar">
                <CalendarView tripDays={tripDays.map(day => ({...day, activities: day.activities.map(mapActivityData)}))} />
            </TabsContent>

            <TabsContent value="bookings">
              <div className="space-y-4">
                <div className="px-1">
                  <h3 className="text-xl font-semibold text-foreground">Your Confirmed Bookings</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your reservations and view details for each booked item on your trip.
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  {allBookings.map((activity, index) => (
                      <ActivityCard key={`booking-${index}`} {...mapActivityData(activity)} isBookingView={true} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1571981878347-4b355949a717?q=80&w=600&h=450&fit=crop"
              alt={getTranslation('mapAltText', 'Map of French Riviera')}
              width={600}
              height={450}
              className="w-full object-cover"
              data-ai-hint="map region france"
            />
            <Button variant="secondary" className="absolute bottom-4 left-4 rounded-full shadow-md text-sm">
              {getTranslation('modifyRoute', 'Modify Route')}
            </Button>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-md">
              <Maximize className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 border rounded-lg bg-card shadow">
            <h4 className="font-semibold text-foreground mb-1">{tripTitle}</h4>
            <p className="text-sm text-muted-foreground mb-4">{tripDateRange}</p>
            <div className="flex items-center space-x-2 mb-3">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9" aria-label={getTranslation('tripDetailsActionDownload', 'Download')}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9" aria-label={getTranslation('tripDetailsActionEdit', 'Edit')}>
                <FileEdit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 bg-green-100 border-green-300 text-green-700 hover:bg-green-200" aria-label={getTranslation('shareViaWhatsApp', 'Share via WhatsApp')}>
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleCheckout} 
            >
              <CreditCard className="mr-2 h-4 w-4" /> {getTranslation('checkout', 'Check out')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
