
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessageBubble, type MessageProps } from './ChatMessageBubble';
import { Compass, Home, ImagePlus, Paperclip, Mic, Send, Palette, Map, CalendarDays, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WanderChatsMainProps {
  chatName: string;
  location?: string;
  dateRange?: string;
  groupMembers?: { name: string; avatarUrl: string; aiHint: string }[]; // For group chats
  messages: MessageProps[];
}

const placeholderAmbientImage = "https://images.unsplash.com/photo-1517524206127-48bbd363f357?q=80&w=1200&auto=format&fit=crop";
const placeholderAiHint = "desert landscape sunset";

export function WanderChatsMain({
  chatName,
  location,
  dateRange,
  groupMembers,
  messages,
}: WanderChatsMainProps) {
  const { getTranslation } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src={placeholderAmbientImage}
          alt={getTranslation('wanderChatAmbientBgAlt', 'Ambient travel background')}
          layout="fill"
          objectFit="cover"
          className="blur-sm"
          data-ai-hint={placeholderAiHint}
        />
         <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Chat Header */}
      <header className="relative z-10 p-4 border-b border-yellow-200/20 bg-[#4d3c2d]/20 backdrop-blur-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-yellow-200/20">
            <AvatarImage src={`https://placehold.co/40x40/94a3b8/1e293b.png?text=${chatName.substring(0,1)}`} alt={chatName} data-ai-hint="chat avatar" />
            <AvatarFallback>{chatName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-yellow-50/90 text-lg">{chatName}</h3>
            {(location || dateRange) && (
              <div className="flex items-center text-xs text-yellow-200/70 gap-2">
                {location && <><MapPin className="h-3 w-3" /><span>{location}</span></>}
                {location && dateRange && <span>•</span>}
                {dateRange && <><CalendarDays className="h-3 w-3" /><span>{dateRange}</span></>}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
            <Compass className="h-3.5 w-3.5 mr-1.5" /> {getTranslation('wanderChatInviteToAdventure', 'Invite to Adventure')}
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-black/20 text-yellow-200/80 border-yellow-200/20 hover:bg-black/40 hover:text-white">
            <Home className="h-3.5 w-3.5 mr-1.5" /> {getTranslation('wanderChatHostAtStay', 'Host at My Stay')}
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 md:p-6 space-y-4 relative z-10" ref={scrollAreaRef as any}>
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} {...msg} />
        ))}
      </ScrollArea>

      {/* Message Input Area */}
      <footer className="relative z-10 p-3 md:p-4 border-t border-yellow-200/20 bg-[#4d3c2d]/20 backdrop-blur-lg">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" type="button" className="h-9 w-9 text-yellow-200/70 hover:text-amber-400">
              <ImagePlus className="h-5 w-5" />
              <span className="sr-only">{getTranslation('wanderChatAddImage', 'Add Image')}</span>
            </Button>
            <Button variant="ghost" size="icon" type="button" className="h-9 w-9 text-yellow-200/70 hover:text-amber-400">
              <Palette className="h-5 w-5" />
              <span className="sr-only">{getTranslation('wanderChatAddSketch', 'Add Sketch')}</span>
            </Button>
             <Button variant="ghost" size="icon" type="button" className="h-9 w-9 text-yellow-200/70 hover:text-amber-400">
              <Map className="h-5 w-5" />
              <span className="sr-only">{getTranslation('wanderChatAddLocation', 'Add Location')}</span>
            </Button>
          </div>
          <Textarea
            placeholder={getTranslation('wanderChatMessagePlaceholder', 'Type a memory, thought or plan…')}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as any);
              }
            }}
            rows={1}
            className="flex-grow resize-none bg-black/20 border-yellow-200/20 placeholder:text-yellow-200/60 focus:border-amber-400 text-yellow-50/90 max-h-24 text-sm py-2.5 px-3.5"
          />
          <Button type="submit" size="icon" className="h-9 w-9 bg-amber-600 text-black hover:bg-amber-700 rounded-full flex-shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">{getTranslation('wanderChatSendButton', 'Send')}</span>
          </Button>
        </form>
      </footer>
    </main>
  );
}
