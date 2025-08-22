
import type { LucideIcon } from 'lucide-react';

export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  aiHint: string;
}

export interface TripIdea {
  id: string;
  title: string;
  content?: string;
  image?: {
    src: string;
    aiHint: string;
  };
  votes: {
    up: number;
    maybe: number;
    down: number;
  };
  comments: number;
}

export interface TripColumnData {
  id: string;
  title: string;
  iconColor?: string;
  ideas: TripIdea[];
}
