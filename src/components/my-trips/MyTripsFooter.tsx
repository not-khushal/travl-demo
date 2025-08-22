
'use client';

import React from 'react';
import { Instagram, Linkedin, Youtube, Play, ChevronUp } from 'lucide-react';

export function MyTripsFooter() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-[#2a231f] border-t border-yellow-200/20 py-3 px-4 md:px-6 z-20">
            <div className="flex justify-between items-center text-xs text-yellow-200/70">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/20 text-yellow-200/80 font-serif text-lg shrink-0">
                        N
                    </div>
                    <span>© {currentYear} All right reserved by trvalr AI GmbH</span>
                </div>
                <div className="flex items-center space-x-1">
                    <a href="#" aria-label="TikTok" className="p-1.5 rounded-full hover:bg-black/20 transition-colors">
                        <Play className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-black/20 transition-colors">
                        <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-black/20 transition-colors">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="YouTube" className="p-1.5 rounded-full hover:bg-black/20 transition-colors">
                        <Youtube className="h-4 w-4" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="p-1.5 rounded-full hover:bg-black/20 transition-colors"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
