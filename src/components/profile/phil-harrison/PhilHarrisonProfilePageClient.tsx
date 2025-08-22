
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ImageIcon,
  MapPin,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Languages,
  Star,
  Users,
  Mountain,
  UtensilsCrossed,
  Tent,
  Waves,
  Play,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
  Briefcase,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';

// --- Sub-components defined within the same file for this specific page layout ---

// 1. Profile Banner Component
interface ProfileBannerProps {
  name: string;
  tagline: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroImageAiHint: string;
  avatarUrl: string;
  avatarAiHint: string;
}

function ProfileBanner({ name, tagline, heroImageUrl, heroImageAlt, heroImageAiHint, avatarUrl, avatarAiHint }: ProfileBannerProps) {
  return (
    <div className="relative w-full h-[250px] md:h-[300px]">
      <Image
        src={heroImageUrl}
        alt={heroImageAlt}
        fill
        className="object-cover"
        data-ai-hint={heroImageAiHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 md:h-28 md:w-28 flex-shrink-0">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="rounded-full object-cover border-4 border-black/20 shadow-lg"
                data-ai-hint={avatarAiHint}
              />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl md:text-4xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{name}</h1>
              <p className="text-sm md:text-base text-neutral-200" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm" aria-label="My Trips">
                <Link href="/my-trips">
                    <Briefcase className="h-5 w-5" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm" aria-label="My Chats">
                <Link href="/my-chats?category=tripGroupChats">
                    <MessageSquare className="h-5 w-5" />
                </Link>
            </Button>
            <Button
                className="bg-[#d38554] hover:bg-[#c07647] text-white font-semibold rounded-lg px-6 py-2 shadow-lg"
                onClick={() => console.log('Edit Profile clicked')}
            >
                Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Add Post Card Component
interface AddPostCardProps {
  avatarUrl: string;
  avatarAiHint: string;
}

function AddPostCard({ avatarUrl, avatarAiHint }: AddPostCardProps) {
  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-2xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-yellow-50/90">Add Post</h3>
        <Button variant="ghost" size="icon" className="text-yellow-100/70 hover:bg-white/10 h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt="Your avatar" data-ai-hint={avatarAiHint} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full bg-transparent text-yellow-100/90 placeholder:text-yellow-200/60 focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-yellow-100/70 hover:bg-white/10 h-8 w-8">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-yellow-100/70 hover:bg-white/10 h-8 w-8">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        <Button className="bg-[#598d66] hover:bg-[#4a7a55] text-white font-semibold rounded-lg px-6 py-2 text-sm">
          Post
        </Button>
      </div>
    </div>
  );
}


// 3. Feed Card Component
interface FeedItem {
  id: string;
  userName: string;
  userLocation: string;
  avatarUrl: string;
  avatarAiHint: string;
  timestamp: string;
  caption: string;
  imageUrl: string;
  imageAiHint: string;
  likes: string;
  comments: string;
}

interface ProfileFeedCardProps {
  item: FeedItem;
}

function ProfileFeedCard({ item }: ProfileFeedCardProps) {
  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-2xl p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatarUrl} alt={item.userName} data-ai-hint={item.avatarAiHint} />
            <AvatarFallback>{item.userName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-yellow-50/90">{item.userName} <span className="text-yellow-200/70 font-normal">· {item.userLocation}</span></p>
            <p className="text-xs text-yellow-200/60">{item.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-yellow-100/70 hover:bg-white/10 h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-yellow-100/90 pl-1">{item.caption}</p>
      <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={item.imageUrl}
          alt={item.caption}
          fill
          className="object-cover"
          data-ai-hint={item.imageAiHint}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-yellow-100/80 hover:text-white hover:bg-white/10 p-1 h-auto">
          <Heart className="h-5 w-5 mr-2" />
          <span className="text-sm">{item.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-yellow-100/80 hover:text-white hover:bg-white/10 p-1 h-auto">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span className="text-sm">{item.comments}</span>
        </Button>
      </div>
    </div>
  );
}

// 4. Friends List Component
interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  avatarAiHint: string;
  isOnline: boolean;
}

interface FriendsListCardProps {
  friends: Friend[];
}

function FriendsListCard({ friends }: FriendsListCardProps) {
  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-yellow-50/90">Friends</h3>
      <ul className="space-y-3">
        {friends.map(friend => (
          <li key={friend.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint={friend.avatarAiHint} />
                <AvatarFallback>{friend.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-yellow-100/90 group-hover:text-white transition-colors">{friend.name}</span>
            </div>
            {friend.isOnline && <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(74,222,128,0.7)]"></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Stats Card Component
interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-2xl p-4 space-y-4">
      <h3 className="font-headline text-2xl text-yellow-50/90">Stats</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-3 flex items-center gap-4">
            <stat.icon className="h-6 w-6 text-primary" />
            <div>
              <p className="font-bold text-xl text-yellow-50/90">{stat.value}</p>
              <p className="text-sm text-yellow-200/70">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Wander Badges Component
interface BadgeInfo {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
}

interface WanderBadgesCardProps {
  badges: BadgeInfo[];
}

function WanderBadgesCard({ badges }: WanderBadgesCardProps) {
  return (
    <div className="bg-[#4d3c2d]/50 backdrop-blur-lg border border-yellow-200/20 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-yellow-50/90">Wander Badges</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center hover:bg-white/10 transition-colors cursor-pointer">
            <badge.icon className="h-8 w-8 text-primary mb-2" />
            <p className="font-semibold text-xs text-yellow-50/90">{badge.name}</p>
            <p className="text-[10px] text-yellow-200/70">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. Profile Footer Component
function ProfileFooter() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-[#3a2f26] text-neutral-400/80 border-t border-neutral-600/50 py-4 px-4 md:px-8">
            <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-800 text-neutral-400 font-serif text-lg">
                        N
                    </div>
                    <span>© {currentYear} All right reserved by trvalr AI GmbH</span>
                </div>
                <div className="flex items-center space-x-1">
                    <a href="#" aria-label="TikTok" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <Play className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="YouTube" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <Youtube className="h-4 w-4" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

// --- Main Page Client Component ---
export function PhilHarrisonProfilePageClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleHeaderSearchSubmit = () => {
        console.log('Header search submitted on Phil Harrison Profile page:', searchQuery);
    };

    // Data for Phil's profile
    const philProfileData = {
        name: 'Phil Harrison',
        tagline: 'Travelling the world',
        heroImageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&h=500&fit=crop',
        heroImageAlt: 'Vibrant street in Japan at night',
        heroImageAiHint: 'japan street night neon',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&h=160&fit=crop',
        avatarAiHint: 'man portrait smiling',
    };

    const philFeedItems: FeedItem[] = [
      {
        id: 'p1',
        userName: 'Phil Harrison',
        userLocation: 'Tokyo, Japan',
        avatarUrl: philProfileData.avatarUrl,
        avatarAiHint: philProfileData.avatarAiHint,
        timestamp: '5 days ago',
        caption: "Tokyo's energy is electric. Spent the night exploring Shinjuku's neon-lit streets.",
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop',
        imageAiHint: 'tokyo shinjuku neon',
        likes: '2.3K',
        comments: '412',
      },
      {
        id: 'p2',
        userName: 'Phil Harrison',
        userLocation: 'Serengeti, Tanzania',
        avatarUrl: philProfileData.avatarUrl,
        avatarAiHint: philProfileData.avatarAiHint,
        timestamp: '3 weeks ago',
        caption: 'An unforgettable safari in the Serengeti. Witnessing these giants up close is a humbling experience.',
        imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1200&auto=format&fit=crop',
        imageAiHint: 'safari elephant tanzania',
        likes: '3.1K',
        comments: '589',
      },
       {
        id: 'p3',
        userName: 'Phil Harrison',
        userLocation: 'Rome, Italy',
        avatarUrl: philProfileData.avatarUrl,
        avatarAiHint: philProfileData.avatarAiHint,
        timestamp: '1 month ago',
        caption: 'Standing in awe of the Colosseum. You can almost hear the echoes of history.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop',
        imageAiHint: 'rome colosseum sunset',
        likes: '2.5K',
        comments: '450',
      },
    ];

    // Data for the friends list
    const friendsData: Friend[] = [
        { id: 'f1', name: 'Emily Smith', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&fit=crop', avatarAiHint: 'woman smiling', isOnline: true },
        { id: 'f2', name: 'Sophia Chen', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop', avatarAiHint: 'woman adventure', isOnline: true },
        { id: 'f3', name: 'Jack Ryan', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop', avatarAiHint: 'man portrait', isOnline: false },
        { id: 'f4', name: 'Chen W.', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=40&h=40&fit=crop', avatarAiHint: 'person face friendly', isOnline: true },
        { id: 'f5', name: 'Maria L.', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop', avatarAiHint: 'person face kind', isOnline: false},
    ];

    // Data for the stats card
    const statsData: StatItem[] = [
      { icon: MapPin, value: '37', label: 'Countries' },
      { icon: Languages, value: '54', label: 'Adventures' },
      { icon: Star, value: '3', label: 'Upcoming' },
      { icon: Users, value: '19', label: 'Hosted' },
    ];
    
    // Data for the wander badges
    const badgesData: BadgeInfo[] = [
      { id: 'b1', icon: Mountain, name: 'Mountain Conqueror', description: 'Summited 5 major peaks.' },
      { id: 'b2', icon: UtensilsCrossed, name: 'Culinary Explorer', description: 'Tasted cuisine from 20+ countries.' },
      { id: 'b3', icon: Tent, name: 'Wilderness Survivor', description: 'Spent 10 nights camping solo.' },
      { id: 'b4', icon: Waves, name: 'Ocean Wanderer', description: 'Sailed across an ocean.' },
    ];


  return (
    <div className="flex flex-col min-h-screen w-full bg-[#3a2f26] text-white font-sans" style={{ background: 'linear-gradient(to bottom, #2a231f, #433830)' }}>
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <div className="relative">
        <ProfileBanner {...philProfileData} />
      </div>
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <StatsCard stats={statsData} />
            <FriendsListCard friends={friendsData} />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <AddPostCard avatarUrl={philProfileData.avatarUrl} avatarAiHint={philProfileData.avatarAiHint} />
            {philFeedItems.map(item => (
              <ProfileFeedCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <WanderBadgesCard badges={badgesData} />
          </div>
        </div>
      </main>
      <ProfileFooter />
    </div>
  );
}
