
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { Currency } from '@/contexts/CurrencyContext';

export interface OrderSummaryItemProps {
  id: string;
  imageUrl: string;
  imageAlt: string;
  aiHint: string;
  titleKey: string;
  titleFallback: string;
  dateRangeKey: string;
  dateRangeFallback: string;
  typeBadgeKey: string;
  typeBadgeFallback: string;
  itemDetailsKey: string;
  itemDetailsFallback: string;
  priceKey: string; 
  priceValue: string; 
  targetCurrencyCode?: string; 
  baseCurrencyCode?: string;   
  currencyRates?: Record<string, number>; 
  onReserve?: () => void;
  onDelete?: () => void;
}

const typeBadgeColors: { [key: string]: string } = {
  Accommodation: 'bg-muted text-muted-foreground border-border',
  Activity: 'bg-muted text-muted-foreground border-border',
  default: 'bg-muted text-muted-foreground border-border',
};


export function OrderItemCard({
  imageUrl,
  imageAlt,
  aiHint,
  titleKey,
  titleFallback,
  dateRangeKey,
  dateRangeFallback,
  typeBadgeKey,
  typeBadgeFallback,
  itemDetailsKey,
  itemDetailsFallback,
  priceValue, 
  targetCurrencyCode = 'INR',
  baseCurrencyCode = 'INR',
  currencyRates = { INR: 1.0 },
  onReserve,
  onDelete,
}: OrderSummaryItemProps) {
  const { getTranslation } = useLanguage();

  const title = getTranslation(titleKey, titleFallback);
  const dateRange = getTranslation(dateRangeKey, dateRangeFallback);
  const typeBadgeText = getTranslation(typeBadgeKey, typeBadgeFallback);
  const itemDetails = getTranslation(itemDetailsKey, itemDetailsFallback);

  const badgeColorClass = typeBadgeColors[typeBadgeText] || typeBadgeColors.default;

  let displayPrice = '';
  try {
    const numericPriceInBase = Number(priceValue);
    if (isNaN(numericPriceInBase)) {
      throw new Error('Invalid price value');
    }

    let convertedAmount = numericPriceInBase;
    if (targetCurrencyCode !== baseCurrencyCode && currencyRates && currencyRates[targetCurrencyCode] !== undefined) {
      convertedAmount = numericPriceInBase * currencyRates[targetCurrencyCode];
    } else if (targetCurrencyCode !== baseCurrencyCode) {
       if (baseCurrencyCode === 'INR' && targetCurrencyCode === 'INR') {
         convertedAmount = numericPriceInBase; 
       } else if (targetCurrencyCode !== baseCurrencyCode && (!currencyRates || currencyRates[targetCurrencyCode] === undefined)) {
         console.warn(`Exchange rate for ${targetCurrencyCode} not found. Displaying in base currency ${baseCurrencyCode}.`);
         displayPrice = `${baseCurrencyCode} ${numericPriceInBase.toLocaleString(baseCurrencyCode === 'INR' ? 'en-IN' : undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
       }
    }
    
    if (!displayPrice) {
      const localeForFormatting = targetCurrencyCode === 'INR' ? 'en-IN' : undefined;
      displayPrice = new Intl.NumberFormat(localeForFormatting, {
        style: 'currency',
        currency: targetCurrencyCode,
        currencyDisplay: 'code', 
        minimumFractionDigits: targetCurrencyCode === 'JPY' ? 0 : 2,
        maximumFractionDigits: targetCurrencyCode === 'JPY' ? 0 : 2,
      }).format(convertedAmount);
    }

  } catch (error) {
    console.error("Error formatting price:", error);
    let codeToUse = targetCurrencyCode || baseCurrencyCode; 
    displayPrice = `${codeToUse} ${Number(priceValue).toLocaleString(codeToUse === 'INR' ? 'en-IN' : undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }


  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-border rounded-lg bg-card shadow-sm">
      <div className="flex-shrink-0 w-full sm:w-24 h-20 sm:h-auto relative rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={getTranslation(imageAlt, imageAlt)}
          fill
          className="object-cover"
          data-ai-hint={aiHint}
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-md text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-1">{dateRange}</p>
        <Badge variant="outline" className={cn("text-xs py-0.5 px-1.5 font-normal", badgeColorClass)}>
          {typeBadgeText}
        </Badge>
      </div>
      <div className="flex flex-col items-start sm:items-end sm:text-right mt-2 sm:mt-0 ml-auto flex-shrink-0">
        <p className="text-xs text-muted-foreground mb-0.5">{itemDetails}</p>
        <p className="text-lg font-semibold text-foreground mb-2">
          {displayPrice}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-9 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onReserve}
          >
            {getTranslation('reserveButton', 'Reserve')} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted/30 group"
            onClick={onDelete}
            aria-label={getTranslation('deleteItem', 'Delete item')}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
