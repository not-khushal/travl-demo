'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Calendar, Bell, MessageSquare, ChevronDown, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TripColumnData, Member } from './types';
import { TripIdeaCard } from './TripIdeaCard';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface TripSyncDashboardLayoutProps {
  tripName: string;
  members: Member[];
  columns: TripColumnData[];
  setColumns: React.Dispatch<React.SetStateAction<TripColumnData[]>>;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
}

export function TripSyncDashboardLayout({
  tripName,
  members,
  columns,
}: TripSyncDashboardLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(columns[0]?.id || 'flights');

  const activeColumn = useMemo(() => {
    return columns.find(column => column.id === activeTab);
  }, [activeTab, columns]);

  const sortedIdeas = useMemo(() => {
    if (!activeColumn) return { mostLiked: [], others: [] };

    const sorted = [...activeColumn.ideas].sort((a, b) => b.votes.up - a.votes.up);

    const mostLiked = sorted.slice(0, 3);
    const others = sorted.slice(3).length > 0 ? sorted.slice(3) : [...sorted].reverse();

    return { mostLiked, others };
  }, [activeColumn]);

  return (
    <div className="flex h-full w-full bg-transparent text-foreground">
      <aside className="w-64 flex-shrink-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg border-r border-border/60 flex flex-col">
        <div className="p-4 border-b border-border/60">
          <Button variant="ghost" className="w-full justify-between h-auto p-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-lg">🇫🇷</span>
              </div>
              <span className="font-semibold text-sm truncate">{tripName}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Members ({members.length})</h3>
            <div className="space-y-3">
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.aiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2"/>
              Invite Member
            </Button>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop" alt="Phil Harrison" data-ai-hint="man portrait smiling"/>
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="flex-grow overflow-hidden">
                <p className="text-sm font-semibold truncate">Phil Harrison</p>
                <p className="text-xs text-muted-foreground truncate">phil.harrison@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-border/60">
          <h1 className="text-lg font-semibold">Trip Board</h1>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="h-9">
              <Link href="/trip-details">
                <Calendar className="h-4 w-4 mr-2" />
                Itinerary
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setIsChatOpen(!isChatOpen)}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-start gap-4 mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow w-fit">
              <TabsList className="h-10 p-1 bg-muted rounded-full">
                {columns.map(column => (
                  <TabsTrigger
                    key={column.id}
                    value={column.id}
                    className="h-8 rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    {column.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab} className="hidden"></TabsContent>
            </Tabs>
            <Button variant="outline" className="h-10 rounded-full px-4 bg-muted/50 border-border/60 flex-shrink-0 mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="space-y-8">
            {activeColumn && (
              <>
                {sortedIdeas.mostLiked.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Most Liked</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedIdeas.mostLiked.map(idea => (
                        <Card key={idea.id} className="p-0">
                          <TripIdeaCard
                            idea={idea}
                            index={0}
                            columnId={activeTab}
                            moveCard={() => {}}
                          />
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab !== 'notes' && sortedIdeas.others.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Other Options

                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedIdeas.others.map(idea => (
                        <Card key={idea.id} className="p-0">
                          <TripIdeaCard
                            idea={idea}
                            index={0}
                            columnId={activeTab}
                            moveCard={() => {}}
                          />
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {sortedIdeas.mostLiked.length === 0 && sortedIdeas.others.length === 0 && (
                  <div className="flex items-center justify-center p-12 text-center text-muted-foreground">
                    <p>No ideas in this category yet. Add a new one!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {isChatOpen && (
        <aside className="w-80 flex-shrink-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg border-l border-border/60">
           <div className="p-4 h-full flex flex-col items-center justify-center text-center">
             <MessageSquare className="h-10 w-10 text-muted-foreground mb-4"/>
             <h3 className="font-semibold text-foreground">Group Chat</h3>
             <p className="text-sm text-muted-foreground">Chat panel coming soon!</p>
           </div>
        </aside>
      )}
    </div>
  );
}