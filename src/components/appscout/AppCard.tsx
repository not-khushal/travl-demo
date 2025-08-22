
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { Download, Plus, Star } from 'lucide-react';
import type { App } from './types';

interface AppCardProps {
  app: App;
  index: number;
}

const badgeColors: Record<string, string> = {
  'Safe to Use': 'border-green-300/50 bg-green-500/10 text-green-700 dark:text-green-300',
  'Offline Friendly': 'border-blue-300/50 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  'Local Favorite': 'border-amber-300/50 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Global Favorite': 'border-purple-300/50 bg-purple-500/10 text-purple-700 dark:text-purple-400',
  'Travel Hacks': 'border-rose-300/50 bg-rose-500/10 text-rose-700 dark:text-rose-400',
};

const PlatformIcon = ({ platform }: { platform: 'iOS' | 'Android' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    {platform === 'iOS'
      ? <path d="M13.91,10.43c.38,1.47-.63,2.83-1.63,3.58a3,3,0,0,1-1,.56c-.43.19-.85.34-1.22.52-1.63.78-2.67,2.2-2.82,3.87a1,1,0,0,0,1,.94h.18a1,1,0,0,0,.92-.76,4.64,4.64,0,0,1,1.8-2.52,3.54,3.54,0,0,1,1.7-.82c.49-.13,1-.25,1.44-.41,1.83-.68,2.78-2.31,2.54-4.21a1,1,0,0,0-1-1A.87.87,0,0,0,13.91,10.43ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
      : <path d="m21.64,13.2-3.28-3.28a1,1,0,0,0-1.42,1.42L18.36,13H13a1,1,0,0,0,0,2h5.36l-1.42,1.42a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3.28-3.28A1,1,0,0,0,21.64,13.2ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM11,6a1,1,0,0,0-1,1V9.58l-1.72-.44a1,1,0,0,0-1.14.83l-.58,2.2a1,1,0,0,0,.83,1.14l3.18.82a1,1,0,0,0,1.14-.83l.58-2.2a1,1,0,0,0-.24-1L11,10.42V7A1,1,0,0,0,11,6Z" />}
  </svg>
);

export function AppCard({ app, index }: AppCardProps) {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: index * 0.05, duration: 0.4 } },
  };

  return (
    <TooltipProvider>
      <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <Card className="h-full flex flex-col bg-card/50 backdrop-blur-md border border-border/20 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-start gap-4 p-4">
            <div className="relative h-16 w-16 flex-shrink-0">
                <Image src={app.logoUrl} alt={`${app.name} logo`} fill className="object-contain rounded-lg" data-ai-hint={app.logoAiHint}/>
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-foreground text-lg">{app.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-muted-foreground">{app.rating}</span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col flex-grow">
            <p className="text-sm text-muted-foreground mb-4 h-10">{app.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {app.badges.map(badge => (
                <Badge key={badge} variant="outline" className={`text-xs ${badgeColors[badge] || ''}`}>{badge}</Badge>
              ))}
            </div>
            <div className="mt-auto flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    {app.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add to Packlist</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download now</TooltipContent>
                    </Tooltip>
                </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
