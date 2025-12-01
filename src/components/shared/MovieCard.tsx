'use client';

import { getImageUrl, isContentReleased } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { Movie } from 'tmdb-ts';
import { motion } from 'framer-motion';
import { Star, Play, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Badge from './Badge';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const openModal = useModalStore((state) => state.openModal);
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Handle both movies and TV shows
    const isTV = !!(movie as any).name;
    const title = isTV ? (movie as any).name : movie.title;
    const releaseDate = isTV ? (movie as any).first_air_date : movie.release_date;

    const posterUrl = getImageUrl(movie.poster_path || movie.backdrop_path, 'w500');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
                scale: 1.15,
                zIndex: 50,
                transition: { duration: 0.3, delay: 0.5 }
            }}
            className="relative aspect-[2/3] cursor-pointer group rounded-md overflow-hidden"
            onClick={() => openModal(movie)}
            onKeyDown={(e) => e.key === 'Enter' && openModal(movie)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${title}`}
        >
            {/* Movie Poster */}
            {!imageError ? (
                <img
                    src={posterUrl}
                    alt={title}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-300"
                />
            ) : (
                <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-xs text-center px-2">{title}</span>
                </div>
            )}

            {/* Gradient Overlay - Always visible on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content - Shows on hover with delay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isHovered ? 0.5 : 0 }}
                className="absolute inset-0 flex flex-col justify-end p-3"
            >
                {/* Action Buttons */}
                <div className="flex items-center gap-2 mb-2">
                    {isContentReleased(releaseDate) ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-white rounded-full p-2 hover:bg-gray-200 transition transform hover:scale-110"
                        >
                            <Play className="h-4 w-4 fill-black text-black" />
                        </button>
                    ) : (
                        <button className="bg-gray-600/80 rounded-full p-2">
                            <Clock className="h-4 w-4 text-white" />
                        </button>
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal(movie);
                        }}
                        className="ml-auto border-2 border-gray-400 rounded-full p-2 hover:border-white transition transform hover:scale-110"
                    >
                        <ChevronDown className="h-4 w-4 text-white" />
                    </button>
                </div>

                {/* Title and Info */}
                <h3 className="text-white font-bold text-sm line-clamp-1 mb-1">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-white mb-1">
                    {movie.vote_average && movie.vote_average > 0 && (
                        <div className="flex items-center gap-1">
                            <span className="text-green-500 font-semibold">{Math.round(movie.vote_average * 10)}% Match</span>
                        </div>
                    )}
                    {releaseDate && (
                        <span className="text-gray-300">{releaseDate.split('-')[0]}</span>
                    )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                    {/* Recently Added Badge (mock logic: released in current year) */}
                    {releaseDate && new Date(releaseDate).getFullYear() === new Date().getFullYear() && (
                        <Badge variant="red">Recently Added</Badge>
                    )}

                    {/* New Season Badge (mock logic: for TV shows) */}
                    {isTV && (
                        <Badge variant="red">New Season</Badge>
                    )}

                    {isTV && (
                        <span className="text-[10px] border border-gray-400 px-1 text-gray-300 rounded">TV</span>
                    )}
                    {!isContentReleased(releaseDate) && (
                        <Badge variant="orange">Coming Soon</Badge>
                    )}
                    <span className="text-[10px] border border-gray-400 px-1 text-gray-300 rounded">HD</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
