'use client';

import { useTrendingMovies, useTrendingAll } from '@/hooks/useMovies';
import { useTrendingTvShows } from '@/hooks/useTvShows';
import { getImageUrl, isContentReleased } from '@/lib/utils';
import { Info, Play, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Movie } from 'tmdb-ts';
import { useModalStore } from '@/store/modalStore';
import { useRouter } from 'next/navigation';

interface HeroBannerProps {
    variant?: 'home' | 'movie' | 'tv';
}

export default function HeroBanner({ variant = 'home' }: HeroBannerProps) {
    const { data: movies } = useTrendingMovies();
    const { data: tvShows } = useTrendingTvShows();
    const { data: all } = useTrendingAll();

    const [content, setContent] = useState<any>(null);
    const openModal = useModalStore((state) => state.openModal);
    const router = useRouter();

    useEffect(() => {
        let data: any[] = [];
        if (variant === 'movie') data = movies || [];
        else if (variant === 'tv') data = tvShows || [];
        else data = all || [];

        if (data && data.length > 0) {
            const randomContent = data[Math.floor(Math.random() * data.length)];
            setContent(randomContent);
        }
    }, [movies, tvShows, all, variant]);

    if (!content) return <div className="h-[95vh] w-full bg-[#141414] animate-pulse" />;

    const title = content.title || content.name;
    const overview = content.overview;
    const backdropPath = content.backdrop_path;
    const releaseDate = content.release_date || content.first_air_date;
    const id = content.id;
    const isTV = !!content.name;

    return (
        <div className="relative h-[80vh] md:h-[90vh] w-full">
            <div className="absolute inset-0">
                <img
                    src={getImageUrl(backdropPath, 'original')}
                    alt={title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            </div>

            {/* Stronger bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[#141414] to-transparent z-10" />

            <div className="relative z-20 flex h-full items-center px-4 md:px-12 lg:px-16">
                <div className="max-w-xl lg:max-w-2xl space-y-4 md:space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-shadow leading-tight">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl line-clamp-3 text-shadow max-w-xl text-gray-200">
                        {overview}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {isContentReleased(releaseDate) ? (
                            <button
                                onClick={() => router.push(isTV ? `/watch/tv/${id}` : `/watch/movie/${id}`)}
                                className="flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-md font-bold hover:bg-white/80 transition-all text-base md:text-lg shadow-lg"
                            >
                                <Play className="h-5 w-5 md:h-6 md:w-6 fill-black" />
                                Play
                            </button>
                        ) : (
                            <button
                                disabled
                                className="flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gray-600/70 text-white rounded-md font-bold cursor-not-allowed text-base md:text-lg"
                            >
                                <Clock className="h-5 w-5 md:h-6 md:w-6" />
                                Coming Soon
                            </button>
                        )}
                        <button
                            onClick={() => content && openModal(content)}
                            className="flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gray-500/70 text-white rounded-md font-semibold hover:bg-gray-500/50 transition-all text-base md:text-lg backdrop-blur-sm"
                        >
                            <Info className="h-5 w-5 md:h-6 md:w-6" />
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
