'use client';

import React from 'react';

import { Servers, QualityServerResponse } from '../types';

interface ServerSelectionProps {
    servers: Servers;
    defaultUrl: string;
}

export default function ServerSelection({ servers, defaultUrl }: ServerSelectionProps) {
    const [currentServerUrl, setCurrentServerUrl] = React.useState(defaultUrl);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isCheckingServers, setIsCheckingServers] = React.useState(true);
    const [availableServers, setAvailableServers] = React.useState<{ [key: string]: Array<{ serverName: string; serverId: string; quality: string }> }>({});

    // Group servers by quality and combine same server names
    const groupedServers = React.useMemo(() => {
        const groups: { [key: string]: Array<{ serverName: string; serverId: string; quality: string }> } = {};

        // Check if servers and qualities exist
        if (!servers?.qualities) {
            return {};
        }

        servers.qualities.forEach(quality => {
            // Check if serverList exists and is not empty
            if (!quality?.serverList?.length) {
                return;
            }

            quality.serverList.forEach(server => {
                // Extract base server name (e.g., "Premium", "Mega", "Nakama")
                const baseServerName = server.title.split(' ')[0];

                if (!groups[baseServerName]) {
                    groups[baseServerName] = [];
                }

                groups[baseServerName].push({
                    serverName: server.title,
                    serverId: server.serverId,
                    quality: quality.title
                });
            });
        });

        // Sort qualities within each server group
        Object.keys(groups).forEach(serverName => {
            groups[serverName].sort((a, b) => {
                const qualityA = parseInt(a.quality);
                const qualityB = parseInt(b.quality);
                return qualityA - qualityB;
            });
        });

        return groups;
    }, [servers]);

    // Check server availability on initial load
    React.useEffect(() => {
        const checkServerAvailability = async () => {
            setIsCheckingServers(true);
            const availableGroups: { [key: string]: Array<{ serverName: string; serverId: string; quality: string }> } = {};

            for (const [baseServerName, serverList] of Object.entries(groupedServers)) {
                const availableServers = await Promise.all(
                    serverList.map(async (server) => {
                        try {
                            const response = await fetch(`/api/server/${server.serverId}`, {
                                headers: {
                                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                                },
                            });

                            const data: QualityServerResponse = await response.json();

                            if (response.ok && data.ok && data.data?.url) {
                                return server;
                            }
                            return null;
                        } catch {
                            return null;
                        }
                    })
                );

                const filteredServers = availableServers.filter((server): server is NonNullable<typeof server> => server !== null);

                if (filteredServers.length > 0) {
                    availableGroups[baseServerName] = filteredServers;
                }
            }

            setAvailableServers(availableGroups);
            setIsCheckingServers(false);
        };

        checkServerAvailability();
    }, [groupedServers]);

    const handleServerSelect = async (serverId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/server/${serverId}`, {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                },
            });

            const data: QualityServerResponse = await response.json();

            if (!response.ok || !data.ok || !data.data?.url) {
                throw new Error('Server not available');
            }

            setCurrentServerUrl(data.data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while loading the video');
        } finally {
            setIsLoading(false);
        }
    };

    // Only show the message if there are no servers at all
    if (!servers?.qualities?.length) {
        return (
            <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-lg">
                <div className="text-center text-text-secondary">
                    <p className="text-lg">No servers available at the moment.</p>
                    <p className="text-sm mt-2">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="text-red-500 text-center p-4">
                            <p className="font-medium">{error}</p>
                            <p className="text-sm mt-2">Please try another server</p>
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

            {/* Server Selection */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                    Available Servers
                </h2>
                {isCheckingServers ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-lg overflow-hidden">
                                <div className="relative">
                                    <div className="h-8 bg-accent/10 rounded-lg w-1/3 mb-4"></div>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="relative">
                                            <div className="h-12 bg-accent/10 rounded-xl"></div>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(availableServers).map(([baseServerName, serverList]) => (
                            <div key={baseServerName} className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-lg">
                                <h3 className="text-2xl font-semibold text-accent mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    {baseServerName}
                                </h3>
                                <div className="space-y-3">
                                    {serverList.map((server) => (
                                        <button
                                            key={server.serverId}
                                            onClick={() => handleServerSelect(server.serverId)}
                                            disabled={isLoading}
                                            className={`w-full px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base font-medium flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed ${currentServerUrl.includes(server.serverId)
                                                ? 'bg-accent text-white hover:bg-accent-hover'
                                                : 'bg-accent/10 text-accent hover:bg-accent/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                {server.quality}
                                            </div>
                                            <span className="text-sm opacity-70">Click to play</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 