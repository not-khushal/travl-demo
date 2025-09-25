'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileEdit, MessageSquare, ShoppingBag, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { ItinerarySection } from '@/components/trip/ItinerarySection';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { TripSubNav } from '@/components/trip/TripSubNav';
import type { DateRange } from "react-day-picker";

// Added: 1. Import the lightbox component, its styles, and the necessary types
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Slide } from "yet-another-react-lightbox";

const tripData = {
    titleKey: 'tripDetailsTitle',
    titleFallback: '7-Day Luxury Couple Escape French Riviera',
    tags: [
        { key: 'tripDetailsTagLuxuryCouple', fallback: 'Luxury couple', color: 'bg-blue-100 text-blue-800 border-blue-300' },
        { key: 'tripDetailsTagRomanticGetaway', fallback: 'Romantic getaway', color: 'bg-purple-100 text-purple-800 border-purple-300' },
        { key: 'tripDetailsTagFrenchRiviera', fallback: 'French riviera', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    ],
    dateRangeKey: 'tripDetailsDateRange',
    dateRangeFallback: 'Jul 15 – 22',
    travelersKey: 'tripDetailsTravelers',
    travelersFallback: '2 travellers',
    travelerCount: 2,
    images: [
        { src: 'https://images.unsplash.com/photo-1567599672391-17b31d92e431?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2aWVyYXxlbnwwfDB8MHx8fDA%D', alt: 'Stunning view of the calanques in Cassis, French Riviera', aiHint: 'cassis calanques', main: true },
        { src: 'https://images.unsplash.com/photo-1614918616986-d88642582e9b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVpZmZlbCUyMHRvd2VyfGVufDB8MHwwfHx8MA%3D%3D', alt: 'Luxurious hotel room with a view of the Eiffel Tower', aiHint: 'luxury hotel paris' },
        { src: 'https://images.unsplash.com/photo-1723986377037-22a9422e065a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9udG1hcnRyZSUyMHBhcmlzfGVufDB8MHwwfHx8MA%3D%3D', alt: 'Charming cobblestone street in Montmartre, Paris', aiHint: 'charming street paris' },
        { src: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&h=300&fit=crop', alt: 'Vibrant display of fresh produce at a French market', aiHint: 'french market produce' },
        { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&h=300&fit=crop', alt: 'Cozy and romantic dinner setting in a French bistro', aiHint: 'romantic dinner bistro' },
    ],
    overviewTitleKey: 'tripDetailsOverviewTitle',
    overviewTitleFallback: 'Trip Overview',
    overviewTextKey: 'tripDetailsOverviewText',
    overviewTextFallback: "This 7-day luxury couple escape along the stunning French Riviera offers the perfect blend of romantic seaside strolls, luxurious accommodations, and exciting water adventures in iconic destinations like Nice, Cannes, and Saint-Tropez. Experience unforgettable moments of relaxation and connection while exploring vibrant old towns, pristine beaches, and breathtaking coastal views.",
    highlightsTitleKey: 'tripDetailsHighlightsTitle',
    highlightsTitleFallback: 'Highlights',
    highlights: [
        { key: 'tripDetailsHighlight1', fallback: "Stay at the iconic Hotel Le Negresco in Nice with elegant period decor" },
        { key: 'tripDetailsHighlight2', fallback: "Explore Nice's charming Old Town and vibrant Cours Saleya Flower Market" },
        { key: 'tripDetailsHighlight3', fallback: "Enjoy a scenic 2-hour drive along the French Riviera in a unique 3-wheel vehicle" },
        { key: 'tripDetailsHighlight4', fallback: "Private boat trip to Lerins Islands and Cap d'Antibes in Cannes" },
    ],
    actionButtons: [
        { icon: Download, labelKey: 'tripDetailsActionDownload', fallback: 'Download' },
        { icon: FileEdit, labelKey: 'tripDetailsActionEdit', fallback: 'Edit' },
        { icon: MessageSquare, labelKey: 'tripDetailsActionShare', fallback: 'Share' },
        { icon: ShoppingBag, labelKey: 'tripDetailsActionSave', fallback: 'Save' },
    ],
    budgetValue: 'Luxury',
    tripItemCount: 40,
};

// Added: Custom function to render each lightbox slide with a consistent size.
function ConsistentSizedSlide({ slide }: { slide: Slide }) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            {/* This inner div enforces a consistent 16:9 aspect ratio */}
            <div className="relative aspect-video w-full max-w-4xl">
                <Image
                    fill
                    alt={slide.alt || ""}
                    src={slide.src}
                    loading="eager"
                    draggable={false}
                    // 'contain' ensures the whole image is visible within the 16:9 frame.
                    // You can change this to 'cover' if you want to fill the frame, cropping the image.
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
}

export default function TripDetailsPage() {
    const { getTranslation } = useLanguage();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isScrolled, setIsScrolled] = React.useState(false);
    
    // Added: 2. State to manage lightbox visibility and current image index
    const [lightboxIndex, setLightboxIndex] = React.useState(-1);

    // State for the interactive sub-nav
    const [location, setLocation] = React.useState(tripData.tags.find(t => t.key === 'tripDetailsTagFrenchRiviera')?.fallback || 'French Riviera');
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({ from: new Date(2025, 6, 15), to: new Date(2025, 6, 22) });
    const [adults, setAdults] = React.useState(tripData.travelerCount);
    const [children, setChildren] = React.useState(0);
    const [budget, setBudget] = React.useState('luxury');

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHeaderSearchSubmit = () => {
        console.log('Header search submitted:', searchQuery);
    };

    const mainImage = tripData.images.find(img => img.main) || tripData.images[0];
    const galleryImages = tripData.images.filter(img => !img.main).slice(0, 4);
    const remainingImageCount = tripData.images.length - 1 - galleryImages.length;

    // Added: Function to open the lightbox at a specific image index
    const openLightbox = (imageSrc: string) => {
        const imageIndex = tripData.images.findIndex(img => img.src === imageSrc);
        if (imageIndex > -1) {
            setLightboxIndex(imageIndex);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <Header
                isScrolled={isScrolled}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onSearchSubmit={handleHeaderSearchSubmit}
                showCurrencySelector={false}
            />
            <TripSubNav
                title={getTranslation(tripData.titleKey, tripData.titleFallback)}
                itemCount={tripData.tripItemCount}
                location={location}
                onLocationChange={setLocation}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                adults={adults}
                onAdultsChange={setAdults}
                children={children}
                onChildrenChange={setChildren}
                budget={budget}
                onBudgetChange={setBudget}
            />
            <main className="flex-grow py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <section className="grid md:grid-cols-5 gap-x-8 gap-y-6 mb-8 md:mb-12">
                        <div className="md:col-span-2 flex flex-col">
                            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                {getTranslation(tripData.titleKey, tripData.titleFallback)}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {tripData.tags.map((tag) => (
                                    <Badge key={tag.key} variant="outline" className={`font-medium ${tag.color}`}>
                                        {getTranslation(tag.key, tag.fallback)}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-6">
                                <span>{getTranslation(tripData.dateRangeKey, tripData.dateRangeFallback)}</span>
                                <span className="mx-2">·</span>
                                <span>{getTranslation(tripData.travelersKey, tripData.travelersFallback).replace('{count}', tripData.travelerCount.toString())}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {tripData.actionButtons.map((btn) => (
                                    <Button
                                        key={btn.labelKey}
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full h-10 w-10 border-border hover:bg-muted/50"
                                        aria-label={getTranslation(btn.labelKey, btn.fallback)}
                                        onClick={() => console.log(`${getTranslation(btn.labelKey, btn.fallback)} clicked`)}
                                    >
                                        <btn.icon className="h-5 w-5 text-foreground/80" />
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden shadow-lg h-full">
                            {/* Added: onClick handler and cursor-pointer to the main image */}
                            <div className="relative aspect-[4/3] md:aspect-auto cursor-pointer" onClick={() => openLightbox(mainImage.src)}>
                                {mainImage && (
                                    <Image
                                        src={mainImage.src}
                                        alt={mainImage.alt}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={mainImage.aiHint}
                                        priority
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {galleryImages.map((image, index) => (
                                    // Added: onClick handler and cursor-pointer to each gallery image
                                    <div key={index} className="relative aspect-square cursor-pointer" onClick={() => openLightbox(image.src)}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={image.aiHint}
                                        />
                                        {index === 3 && remainingImageCount > 0 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold">
                                                +{remainingImageCount}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                            {getTranslation(tripData.overviewTitleKey, tripData.overviewTitleFallback)}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {getTranslation(tripData.overviewTextKey, tripData.overviewTextFallback)}
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-foreground mb-6">
                            {getTranslation(tripData.highlightsTitleKey, tripData.highlightsTitleFallback)}
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            {tripData.highlights.map((highlight) => (
                                <li key={highlight.key} className="flex items-start">
                                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                                    <span className="text-foreground">
                                        {getTranslation(highlight.key, highlight.fallback)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <ItinerarySection tripTitle={getTranslation(tripData.titleKey, tripData.titleFallback)} tripDateRange={getTranslation(tripData.dateRangeKey, tripData.dateRangeFallback)} />

                </div>
            </main>
            <SubtleFooter />

            {/* Added: 4. The Lightbox component itself, now with a custom render function for consistent sizing */}
            <Lightbox
                open={lightboxIndex > -1}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={tripData.images}
                // Use the custom render function for each slide
                render={{ slide: ConsistentSizedSlide }}
            />
        </div>
    );
}