'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Globe, Lightbulb, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  aiHint: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Alex Johnson', role: 'Founder & CEO', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop', aiHint: 'male founder' },
  { name: 'Maria Garcia', role: 'Lead AI Engineer', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', aiHint: 'female engineer' },
  { name: 'Chen Wei', role: 'Head of Design', imageUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=200&h=200&fit=crop', aiHint: 'male designer' },
  { name: 'Fatima Ahmed', role: 'Travel Experience Lead', imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=200&h=200&fit=crop', aiHint: 'female traveler' },
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, imageUrl, aiHint }) => (
  <div className="flex flex-col items-center text-center bg-card/30 backdrop-blur-lg border border-border/20 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <Image
      src={imageUrl}
      alt={name}
      width={100}
      height={100}
      className="rounded-full object-cover mb-4 border-2 border-primary/30"
      data-ai-hint={aiHint}
    />
    <h3 className="font-semibold text-lg text-foreground">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
  </div>
);

export function AboutPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-x-hidden">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center py-12 md:py-20">
            <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              About trvalr
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We believe travel is about more than just visiting new places; it’s about creating unforgettable experiences and meaningful connections. trvalr was born from a passion for exploration and a desire to make travel planning seamless, personal, and inspiring for everyone.
            </p>
          </section>

          {/* Mission & Vision Section */}
          <section className="py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&h=800&fit=crop"
                alt="Travelers looking at a map"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                data-ai-hint="travelers map"
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card/50 rounded-full text-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-semibold mb-2">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To empower travelers by transforming complex trip planning into an intuitive, AI-driven conversation. We aim to unlock the world’s hidden gems and make every journey uniquely yours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card/50 rounded-full text-accent">
                   <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-semibold mb-2">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To build a global community of curious explorers, connected by shared experiences and a passion for discovering the world. We envision a future where travel is smarter, more sustainable, and accessible to all.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="py-12 md:py-20">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
              Meet the Explorers Behind trvalr
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map(member => (
                <TeamMemberCard key={member.name} {...member} />
              ))}
            </div>
          </section>

        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
