import React from 'react';

import { ServerListProps } from '@/components/ui/home/ui/anime/pages/episode/types/types';

export default function ServerList({ isCheckingServers, availableServers, activeServerId, isLoading, onServerSelect }: ServerListProps) {
    if (isCheckingServers) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-card-border/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative">
                            <div className="h-8 bg-primary/10 rounded-lg w-1/3 mb-4"></div>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((j) => (
                                <div key={j} className="relative">
                                    <div className="h-12 bg-primary/10 rounded-xl"></div>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(availableServers).map(([baseServerName, serverList]) => (
                <div key={baseServerName} className="bg-card-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-card-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-fit">
                    <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                        {baseServerName}
                    </h3>
                    <div className="space-y-4">
                        {serverList.map((server) => (
                            <button
                                key={server.serverId}
                                onClick={() => onServerSelect(server.serverId)}
                                disabled={isLoading}
                                className={`w-full px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base font-medium flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${activeServerId === server.serverId
                                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-card-bg'
                                    : 'bg-card-bg/80 text-text hover:bg-primary/10 hover:text-primary border'
                                    }`}
                            >
                                {activeServerId === server.serverId && (
                                    <>
                                        <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                                        <div className="absolute right-0 top-0 h-full w-1 bg-white/80 animate-pulse"></div>
                                        <div className="absolute left-0 top-0 h-full w-1 bg-white/80 animate-pulse"></div>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
                                    </>
                                )}
                                <div className="flex items-center gap-3 relative z-10">
                                    <svg className={`w-5 h-5 ${activeServerId === server.serverId ? 'animate-bounce' : 'text-primary'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold">{server.quality}</span>
                                </div>
                                <span className={`text-sm relative z-10 ${activeServerId === server.serverId ? 'font-medium' : 'text-text-secondary'}`}>
                                    {activeServerId === server.serverId ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></span>
                                            <span className="animate-pulse">Playing</span>
                                        </span>
                                    ) : 'Click to play'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 