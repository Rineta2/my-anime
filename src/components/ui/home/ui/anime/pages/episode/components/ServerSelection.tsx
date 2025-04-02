'use client';

import React from 'react';

import { ServerSelectionProps, ErrorResponse, ServerResponse, AvailableServers, ServerInfo } from '@/components/ui/home/ui/anime/pages/episode/types/types';

import { checkServer, groupServers } from '@/components/ui/home/ui/anime/pages/episode/components/utils/serverUtils';

import VideoPlayer from '@/components/ui/home/ui/anime/pages/episode/components/ui/VideoPlayer';

import ServerList from '@/components/ui/home/ui/anime/pages/episode/components/ui/ServerList';

export default function ServerSelection({ servers, defaultUrl }: ServerSelectionProps) {
    const [currentServerUrl, setCurrentServerUrl] = React.useState(defaultUrl);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<ErrorResponse | null>(null);
    const [isCheckingServers, setIsCheckingServers] = React.useState(true);
    const [activeServerId, setActiveServerId] = React.useState<string>('');
    const [availableServers, setAvailableServers] = React.useState<AvailableServers>({});
    const [retryCount, setRetryCount] = React.useState(0);
    const maxRetries = 3;
    const [currentQuality, setCurrentQuality] = React.useState<string>('');

    // Group servers by quality and combine same server names
    const groupedServers = React.useMemo(() => groupServers(servers), [servers]);

    // Check server availability on initial load
    React.useEffect(() => {
        const checkServerAvailability = async () => {
            setIsCheckingServers(true);
            setError(null);
            const availableGroups: AvailableServers = {};

            try {
                for (const [baseServerName, serverList] of Object.entries(groupedServers)) {
                    const availableServers = await Promise.all(
                        serverList.map(async (server: ServerInfo) => {
                            const isAvailable = await checkServer(server.serverId);
                            return isAvailable ? server : null;
                        })
                    );

                    const filteredServers = availableServers.filter((server): server is ServerInfo => server !== null);
                    if (filteredServers.length > 0) {
                        availableGroups[baseServerName] = filteredServers;
                    }
                }

                setAvailableServers(availableGroups);
                if (Object.keys(availableGroups).length === 0 && retryCount < maxRetries) {
                    setRetryCount(prev => prev + 1);
                }
            } catch (err) {
                console.error('Error checking server availability:', err);
                setError({
                    title: 'Server Tidak Tersedia',
                    description: 'Terjadi kesalahan saat mencoba mengakses server',
                    suggestion: 'Silakan coba server lain atau coba lagi nanti'
                });
            } finally {
                setIsCheckingServers(false);
            }
        };

        checkServerAvailability();
    }, [groupedServers, retryCount]);

    const handleServerSelect = async (serverId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            setActiveServerId(serverId);

            const response = await fetch(`/api/server/${serverId}`, {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                },
            });

            const data: ServerResponse = await response.json();

            if (!response.ok || !data.ok) {
                if (data.error) {
                    setError(data.error);
                    return;
                }
                throw new Error('Server tidak tersedia saat ini');
            }

            if (!data.data?.url) {
                setError({
                    title: 'Server Tidak Tersedia',
                    description: 'Server yang Anda pilih sedang tidak dapat diakses',
                    suggestion: 'Silakan coba server lain yang tersedia'
                });
                return;
            }

            // Find the quality for the selected server
            const selectedServer = Object.values(availableServers)
                .flat()
                .find(server => server.serverId === serverId);

            if (selectedServer) {
                setCurrentQuality(selectedServer.quality);
            }

            setCurrentServerUrl(data.data.url);
        } catch {
            setError({
                title: 'Server Tidak Tersedia',
                description: 'Terjadi kesalahan saat mencoba mengakses server',
                suggestion: 'Silakan coba server lain atau coba lagi nanti'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Only show the message if there are no servers at all
    if (!servers?.qualities?.length) {
        return (
            <div className="bg-card-bg/50 backdrop-blur-sm p-8 rounded-3xl border border-card-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 text-accent animate-pulse">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">Tidak Ada Server Tersedia</h3>
                    <p className="text-text-secondary text-lg">Mohon coba lagi nanti atau periksa kembali episode yang dipilih.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <VideoPlayer
                currentServerUrl={currentServerUrl}
                isLoading={isLoading}
                error={error}
                currentQuality={currentQuality}
            />

            <div className="space-y-6">
                <h2 className="text-4xl font-bold text-text flex items-center gap-4">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                    <span className="text-2xl">Server Tersedia</span>
                </h2>
                <ServerList
                    isCheckingServers={isCheckingServers}
                    availableServers={availableServers}
                    activeServerId={activeServerId}
                    isLoading={isLoading}
                    onServerSelect={handleServerSelect}
                />
            </div>
        </div>
    );
} 