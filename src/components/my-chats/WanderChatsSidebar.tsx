
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plane, Users, Globe2, MessageSquarePlus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '../ui/input';

export type ChatCategory = 'tripGroupChats' | 'travelBuddies' | 'localHosts';

interface ChatItem {
  id: string;
  name: string;
  avatarUrl: string;
  aiHint: string;
  destinationTag?: string;
  latestMessage: string;
  unread?: boolean;
  type: 'group' | 'buddy' | 'host';
}

interface WanderChatsSidebarProps {
  activeCategory: ChatCategory;
  onSelectCategory: (category: ChatCategory) => void;
  chatItems: ChatItem[];
  onSelectChat: (chatItem: ChatItem) => void;
  selectedChatId?: string | null;
}

export function WanderChatsSidebar({
  activeCategory,
  onSelectCategory,
  chatItems,
  onSelectChat,
  selectedChatId,
}: WanderChatsSidebarProps) {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = [
    { id: 'tripGroupChats', labelKey: 'wanderChatTripGroups', fallback: 'Trip Groups', icon: Plane },
    { id: 'travelBuddies', labelKey: 'wanderChatTravelBuddies', fallback: 'Travel Buddies', icon: Users },
    { id: 'localHosts', labelKey: 'wanderChatLocalHosts', fallback: 'Local Hosts', icon: Globe2 },
  ] as const;

  const filteredChatItems = chatItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.destinationTag && item.destinationTag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <aside className="w-80 md:w-96 bg-[#4d3c2d]/30 backdrop-blur-xl border-r border-yellow-200/20 text-yellow-50/90 flex flex-col h-full">
      <div className="p-4 border-b border-yellow-200/20 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-semibold text-yellow-50/90">
          {getTranslation('wanderChatsTitle', 'WanderChats')}
        </h2>
        <Link href="/profile/phil-harrison" className="flex items-center gap-2 group">
          <Avatar className="h-8 w-8 group-hover:ring-2 group-hover:ring-amber-400 transition-all">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop" alt="Phil" data-ai-hint="user avatar male" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-yellow-50/90 hidden sm:inline group-hover:text-amber-300 transition-colors">
            {getTranslation('philHarrisonName', 'Phil')}
          </span>
        </Link>
      </div>
      <div className="p-4 border-b border-yellow-200/20">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-200/60" />
          <Input
            type="search"
            placeholder={getTranslation('wanderChatsSearchPlaceholder', 'Search chats...')}
            className="pl-9 h-9 text-sm bg-black/20 border-yellow-200/20 placeholder:text-yellow-200/60 focus:border-amber-400 text-yellow-50/90"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-2 border-b border-yellow-200/20">
        <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 justify-center text-xs h-8 transition-all duration-200",
                  isActive ? "bg-amber-600/50 text-white shadow-lg" : "text-yellow-200/80 hover:bg-black/20 hover:text-yellow-50/90"
                )}
                onClick={() => onSelectCategory(category.id)}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {getTranslation(category.labelKey, category.fallback)}
              </Button>
            );
          })}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1.5">
          {filteredChatItems.length > 0 ? filteredChatItems.map(item => (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors duration-150",
                selectedChatId === item.id ? "bg-amber-600/20" : "hover:bg-black/20"
              )}
              onClick={() => onSelectChat(item)}
            >
              <Avatar className="h-10 w-10 border-2 border-yellow-200/20 shadow-sm">
                <AvatarImage src={item.avatarUrl} alt={item.name} data-ai-hint={item.aiHint} />
                <AvatarFallback>{item.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow overflow-hidden">
                <div className="flex items-baseline justify-between">
                  <h4 className={cn("text-sm font-medium truncate", selectedChatId === item.id ? "text-amber-300" : "text-yellow-50/90")}>{item.name}</h4>
                  {item.unread && <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 ml-2"></div>}
                </div>
                {item.destinationTag && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 font-normal border-yellow-200/20 bg-black/20 text-yellow-200/80 mt-0.5">
                    {item.destinationTag}
                  </Badge>
                )}
                <p className="text-xs text-yellow-200/70 truncate mt-0.5">{item.latestMessage}</p>
              </div>
            </div>
          )) : (
            <p className="p-4 text-center text-sm text-yellow-200/70">
              {getTranslation('wanderChatsNoChatsFound', 'No chats found in this category.')}
            </p>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-yellow-200/20">
        <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white hover:opacity-90 transition-opacity shadow-lg">
          <MessageSquarePlus className="h-5 w-5 mr-2" />
          {getTranslation('wanderChatsStartNewChat', 'Start New Chat')}
        </Button>
      </div>
    </aside>
  );
}
