import { FranchiseContent } from '@/hooks/useFranchise';
import { getImageUrl } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { motion } from 'framer-motion';

interface TimelineProps {
    content: FranchiseContent[];
}

export default function Timeline({ content }: TimelineProps) {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <div className="relative container mx-auto px-4 py-16">
            {/* Vertical Line with Gradient */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600/50 to-transparent -translate-x-1/2 md:translate-x-0" />

            <div className="space-y-16">
                {content.map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                            className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Date Marker with Glow */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                                <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                                <div className="absolute w-8 h-8 bg-red-600/20 rounded-full animate-pulse" />
                            </div>

                            {/* Content Spacer */}
                            <div className="flex-1 w-full md:w-1/2" />

                            {/* Content Card */}
                            <div className={`flex-1 w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                                <div
                                    className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] cursor-pointer"
                                    onClick={() => openModal(item as any)}
                                >
                                    <div className="flex h-40 sm:h-48">
                                        <div className="w-28 sm:w-36 shrink-0 relative overflow-hidden">
                                            <img
                                                src={getImageUrl(item.poster_path, 'w500')}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                        </div>
                                        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden">
                                            {/* Background Glow Effect */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-red-500 text-lg font-bold font-mono">
                                                        {item.release_date ? new Date(item.release_date).getFullYear() : 'TBA'}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-white/10 text-gray-300 border border-white/5">
                                                        {item.media_type === 'movie' ? 'MOVIE' : 'TV SERIES'}
                                                    </span>
                                                    {item.media_type === 'tv' && item.number_of_seasons && (
                                                        <span className="text-[10px] text-gray-400 font-mono">
                                                            {item.number_of_seasons} S • {item.number_of_episodes} E
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 leading-tight group-hover:text-red-500 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                                                    {item.overview}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
