import Link from 'next/link';
import { Franchise } from '@/lib/franchises';
import { getImageUrl } from '@/lib/utils';

interface FranchiseCardProps {
    franchise: Franchise & { isCustom?: boolean };
}

export default function FranchiseCard({ franchise }: FranchiseCardProps) {
    const href = franchise.isCustom
        ? `/franchises/search?q=${encodeURIComponent(franchise.name)}`
        : `/franchises/${franchise.id}`;

    return (
        <Link href={href} className="group relative block aspect-video overflow-hidden rounded-lg bg-gray-900">
            <img
                src={getImageUrl(franchise.backdropPath, 'w500')}
                alt={franchise.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-60 group-hover:opacity-40"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{franchise.name}</h3>
                {franchise.updatedAt && (
                    <p className="text-[10px] text-gray-300 mt-1 font-mono opacity-80">
                        Updated: {new Date(franchise.updatedAt).toLocaleDateString()}
                    </p>
                )}
            </div>
        </Link>
    );
}
