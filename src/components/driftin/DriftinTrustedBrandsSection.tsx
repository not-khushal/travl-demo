
'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface BrandLogoProps {
  nameKey: string;
  nameFallback: string;
  logoSrc: string;
  logoAltKey: string;
  logoAltFallback: string;
  aiHint: string;
}

const brands: BrandLogoProps[] = [
  {
    nameKey: 'brandBookingCom',
    nameFallback: 'Booking.com',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1024px-Booking.com_logo.svg.png',
    logoAltKey: 'brandBookingComLogoAlt',
    logoAltFallback: 'Booking.com Logo',
    aiHint: 'booking.com logo',
  },
  {
    nameKey: 'brandTripAdvisor',
    nameFallback: 'TripAdvisor',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2020/11/Tripadvisor-Logo.png',
    logoAltKey: 'brandTripAdvisorLogoAlt',
    logoAltFallback: 'TripAdvisor Logo',
    aiHint: 'tripadvisor logo',
  },
  {
    nameKey: 'brandAirbnb',
    nameFallback: 'Airbnb',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo.png',
    logoAltKey: 'brandAirbnbLogoAlt',
    logoAltFallback: 'Airbnb Logo',
    aiHint: 'airbnb logo',
  },
  {
    nameKey: 'brandExpedia',
    nameFallback: 'Expedia',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2021/02/Expedia-Logo.png',
    logoAltKey: 'brandExpediaLogoAlt',
    logoAltFallback: 'Expedia Logo',
    aiHint: 'expedia logo',
  },
];

export function DriftinTrustedBrandsSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {getTranslation('driftinTrustedBrandsTitle', 'Trusted by Leading Brands')}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto">
          {getTranslation('driftinTrustedBrandsSubtitle', 'Driftin partners with reputable companies to provide our community with exclusive benefits and a reliable experience.')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 items-center justify-center">
          {brands.map((brand) => (
            <div key={brand.nameKey} className="flex flex-col items-center">
              <div className="bg-card rounded-full p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow mb-3 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <Image
                  src={brand.logoSrc}
                  alt={getTranslation(brand.logoAltKey, brand.logoAltFallback)}
                  width={100}
                  height={80}
                  className="object-contain"
                  data-ai-hint={brand.aiHint}
                />
              </div>
              <p className="text-sm font-medium text-foreground">
                {getTranslation(brand.nameKey, brand.nameFallback)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
