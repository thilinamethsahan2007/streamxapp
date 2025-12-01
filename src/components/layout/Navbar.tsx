'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from '@/components/search/SearchModal';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isFranchisePage = pathname?.startsWith('/franchises');

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 z-50 w-full px-4 py-4 md:px-12 transition-all duration-500',
                    isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black via-black/50 to-transparent'
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-10">
                        <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-black text-[#e50914] tracking-tight">
                            STREAMX
                        </Link>

                        <div className="flex items-center gap-4 md:gap-7">
                            <Link href="/" className="hidden md:block text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                            <Link href="/tv" className="text-xs sm:text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                TV Shows
                            </Link>
                            <Link href="/movies" className="text-xs sm:text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                Movies
                            </Link>
                            <Link href="/franchises" className="text-xs sm:text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                Franchises
                            </Link>
                        </div>
                    </div>

                    {!isFranchisePage && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                    )}
                </div>
            </nav>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
