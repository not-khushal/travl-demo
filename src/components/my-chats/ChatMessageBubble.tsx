
'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface MessageProps {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  avatarUrl: string;
  aiHint: string;
  isCurrentUser: boolean; // To determine alignment and styling
  profilePath?: string;
}

export function ChatMessageBubble({
  sender,
  text,
  timestamp,
  avatarUrl,
  aiHint,
  isCurrentUser,
  profilePath,
}: MessageProps) {
  const avatarElement = (
    <Avatar className={cn("h-8 w-8 self-end mb-1 flex-shrink-0", isCurrentUser ? "ml-2" : "mr-2")}>
      <AvatarImage src={avatarUrl} alt={sender} data-ai-hint={aiHint} />
      <AvatarFallback>{sender.substring(0, 1)}</AvatarFallback>
    </Avatar>
  );

  return (
    <div
      className={cn(
        "flex items-end gap-2 max-w-[75%] md:max-w-[65%]",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {profilePath ? (
        <Link href={profilePath} passHref>
          {avatarElement}
        </Link>
      ) : (
        avatarElement
      )}
      <div
        className={cn(
          "p-3 rounded-xl min-w-[80px]",
          isCurrentUser
            ? "bg-amber-800/80 text-white rounded-br-none"
            : "bg-[#4d3c2d]/70 text-yellow-50/90 rounded-bl-none"
        )}
      >
        {!isCurrentUser && (
          <p className="text-xs font-medium text-amber-400 mb-0.5">{sender}</p>
        )}
        <p className="text-sm leading-snug whitespace-pre-wrap">{text}</p>
        <p
          className={cn(
            "text-[10px] mt-1.5",
            isCurrentUser ? "text-right text-amber-200/90" : "text-left text-yellow-200/70"
          )}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}
