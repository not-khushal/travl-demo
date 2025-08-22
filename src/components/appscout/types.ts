
export type AppCategory =
  | 'rideHailing'
  | 'foodDelivery'
  | 'publicTransit'
  | 'payments'
  | 'events'
  | 'travelHacks';

export interface App {
  id: string;
  name: string;
  logoUrl: string;
  logoAiHint: string;
  description: string;
  badges: string[];
  rating: number;
  platforms: ('iOS' | 'Android')[];
  category: AppCategory;
  tags: string[]; // e.g., 'essentials', 'free', 'offline', 'highly-rated'
}
