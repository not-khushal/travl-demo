
'use client';

import React from 'react';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, MessageCircle, MoreHorizontal } from 'lucide-react';
import type { TripIdea } from './types';
import { VoteButtons } from './VoteButtons';
import { VoteResults } from './VoteResults';
import { motion } from 'framer-motion';

const ItemTypes = {
  CARD: 'card',
};

interface TripIdeaCardProps {
  idea: TripIdea;
  index: number;
  columnId: string;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
}

interface DraggedItem {
  id: string;
  originalIndex: number;
  originalColumnId: string;
  type: string;
}

export function TripIdeaCard({ idea, index, columnId, moveCard }: TripIdeaCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id: idea.id, originalIndex: index, originalColumnId: columnId, type: ItemTypes.CARD }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DraggedItem, monitor) {
      if (!ref.current) {
        return;
      }
      // Placeholder for hover logic
    },
  });

  drag(drop(ref));

  return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        ref={preview}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="group relative"
    >
      <Card ref={ref} className="p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
            <GripVertical className="h-5 w-5 text-muted-foreground/50 cursor-grab -ml-1 -mt-1" />
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>

        {idea.image && (
          <div className="relative aspect-video w-full rounded-md overflow-hidden mb-3">
            <Image src={idea.image.src} alt={idea.title} fill className="object-cover" data-ai-hint={idea.image.aiHint} />
          </div>
        )}

        <h4 className="font-semibold text-sm text-foreground mb-1">{idea.title}</h4>
        {idea.content && <p className="text-xs text-muted-foreground mb-3">{idea.content}</p>}

        <VoteResults votes={idea.votes} />
        
        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between">
          <VoteButtons onVote={(type) => console.log(`Voted ${type} for ${idea.id}`)} />
          {idea.comments > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{idea.comments}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
