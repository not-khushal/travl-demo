
'use client';

import { Button } from '@/components/ui/button';
import { EmojiIcon } from './EmojiIcon';

interface VoteButtonsProps {
  onVote: (type: 'up' | 'maybe' | 'down') => void;
}

export function VoteButtons({ onVote }: VoteButtonsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-green-500/10 hover:border-green-500/50"
        onClick={() => onVote('up')}
      >
        <EmojiIcon emoji="❤️" label="Love" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-yellow-500/10 hover:border-yellow-500/50"
        onClick={() => onVote('maybe')}
      >
        <EmojiIcon emoji="🤔" label="Maybe" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-red-500/10 hover:border-red-500/50"
        onClick={() => onVote('down')}
      >
        <EmojiIcon emoji="❌" label="No" />
      </Button>
    </div>
  );
}
