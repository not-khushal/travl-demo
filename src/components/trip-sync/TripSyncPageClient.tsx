
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { TripSyncDashboardLayout } from './TripSyncDashboardLayout';
import type { TripColumnData, Member } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';

// Mock Data
const tripMembers: Member[] = [
  { id: '1', name: 'Phil Harrison', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop', aiHint: 'man portrait smiling' },
  { id: '2', name: 'Emily Smith', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&fit=crop', aiHint: 'woman portrait friendly' },
  { id: '3', name: 'Alex H.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop', aiHint: 'man portrait glasses' },
  { id: '4', name: 'Maria L.', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop', aiHint: 'woman portrait adventurous' },
];

const initialColumns: TripColumnData[] = [
  {
    id: 'flights',
    title: 'Flights',
    iconColor: 'text-blue-500',
    ideas: [
      { id: 'f1', title: 'Round Trip to NCE', content: 'Lufthansa, 2 layovers, $850', votes: { up: 3, maybe: 1, down: 0 }, comments: 2, image: { src: 'https://logolook.net/wp-content/uploads/2021/11/Lufthansa-Logo.png', aiHint: 'lufthansa logo' } },
      { id: 'f2', title: 'One-way to NCE', content: 'Ryanair, direct, $450', votes: { up: 1, maybe: 1, down: 2 }, comments: 4, image: { src: 'https://logos-world.net/wp-content/uploads/2020/10/Ryanair-Logo.png', aiHint: 'ryanair logo' } },
    ],
  },
  {
    id: 'stays',
    title: 'Stays',
    iconColor: 'text-purple-500',
    ideas: [
      { id: 's1', title: 'Hotel Le Negresco', content: '5-star historic hotel on the promenade.', votes: { up: 4, maybe: 0, down: 0 }, comments: 1, image: { src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&h=400&fit=crop', aiHint: 'luxury hotel room' } },
      { id: 's2', title: 'Airbnb in Old Town', content: 'Charming 2-bedroom with a balcony.', votes: { up: 2, maybe: 2, down: 0 }, comments: 5, image: { src: 'https://images.unsplash.com/photo-1594563703937-fdc640497dcd?q=80&w=600&h=400&fit=crop', aiHint: 'airbnb apartment' } },
      { id: 's3', title: 'MOB HOTEL Cannes', content: 'Modern hotel with a pool and great vibes.', votes: { up: 1, maybe: 2, down: 1 }, comments: 3, image: { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&h=400&fit=crop', aiHint: 'hotel pool luxury' } },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    iconColor: 'text-pink-500',
    ideas: [
      { id: 'a1', title: '3-Wheel Vehicle Tour', content: 'Scenic 2-hour drive along the coast.', votes: { up: 4, maybe: 0, down: 0 }, comments: 1, image: { src: 'https://images.unsplash.com/photo-1520175488228-40a4a44062a4?q=80&w=600&h=400&fit=crop', aiHint: 'vehicle coastal view' } },
      { id: 'a2', title: 'Private Boat Trip', content: "Explore the Lerins Islands.", votes: { up: 3, maybe: 1, down: 0 }, comments: 0, image: { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&h=400&fit=crop', aiHint: 'boat cove' } },
    ],
  },
  {
    id: 'notes',
    title: 'Notes',
    iconColor: 'text-gray-500',
    ideas: [
      { id: 'n1', title: 'Remember to pack sunscreen!', content: 'And hats. The sun can be strong on the Riviera.', votes: { up: 0, maybe: 0, down: 0 }, comments: 0 },
      { id: 'n2', title: 'Car Rental Options', content: 'Need to book a 7-seater van for the group.', votes: { up: 0, maybe: 0, down: 0 }, comments: 0 },
    ],
  },
];

export function TripSyncPageClient() {
  const [columns, setColumns] = useState<TripColumnData[]>(initialColumns);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Search submitted on TripSync page:', searchQuery);
  };

  // Placeholder for drag-and-drop logic
  const moveCard = (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    // This will be implemented in a future step
    console.log(`Moving card ${cardId} from ${fromColumnId} to ${toColumnId} at index ${toIndex}`);
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    // This will be implemented in a future step
    console.log(`Moving column from index ${fromIndex} to ${toIndex}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Header
          isScrolled={isScrolled}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearchSubmit={handleHeaderSearchSubmit}
          showCurrencySelector={false}
        />
        <main className="flex-grow overflow-hidden">
          <TripSyncDashboardLayout
            tripName="French Riviera Escape"
            members={tripMembers}
            columns={columns}
            setColumns={setColumns}
            moveCard={moveCard}
            moveColumn={moveColumn}
          />
        </main>
        <SubtleFooter />
      </div>
    </DndProvider>
  );
}
