import React from 'react';

import { VideoPlayerProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

export default function VideoPlayer({ currentServerUrl, isLoading, error, currentQuality }: VideoPlayerProps) {
    return (
        <div className="mockup-browser border border-card-border/50 bg-black/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="bg-card-bg/50 backdrop-blur-sm border-b border-card-border/50 flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div className="text-sm text-white/80 flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{currentQuality ? `${currentQuality}p` : 'Select Quality'}</span>
                </div>
            </div>
            <div className="aspect-video relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 backdrop-blur-sm">
                        <div className="text-center p-8 max-w-md">
                            <div className="w-20 h-20 mx-auto mb-6 text-red-500 animate-pulse">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-red-500 mb-3">{error.title}</h3>
                            <p className="text-lg text-red-400 mb-3">{error.description}</p>
                            <p className="text-base text-red-400">{error.suggestion}</p>
                        </div>
                    </div>
                )}
                <iframe
                    src={currentServerUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="eager"
                />
            </div>
        </div>
    );
} 