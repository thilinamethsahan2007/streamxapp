'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Timeline from '@/components/franchise/Timeline';
import MovieModal from '@/components/modal/MovieModal';
import { activeFranchises } from '@/lib/franchises';
import { useFranchiseContent } from '@/hooks/useFranchise';
import { getImageUrl } from '@/lib/utils';

export default function FranchiseDetailPage() {
    const params = useParams();
    const franchise = activeFranchises.find(f => f.id === params.id);
    const { data: content, isLoading } = useFranchiseContent(franchise);

    if (!franchise) {
        return (
            <main className="min-h-screen bg-[#141414] flex items-center justify-center">
                <h1 className="text-white text-2xl">Franchise not found</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#141414]">
            <Navbar />

            {/* Hero Header */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={getImageUrl(franchise.backdropPath, 'original')}
                        alt={franchise.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{franchise.name}</h1>
                    <p className="text-gray-300 max-w-2xl text-lg">{franchise.description}</p>
                </div>
            </div>

            {/* Timeline Content */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
                </div>
            ) : (
                <Timeline content={content || []} />
            )}

            <MovieModal />
        </main>
    );
}
