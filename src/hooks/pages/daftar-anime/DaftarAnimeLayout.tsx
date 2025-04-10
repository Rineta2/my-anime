"use client"

import React, { useState } from 'react'

import { Anime, ScheduleDay, Genre } from '@/hooks/pages/types/Anime'

import { getAnimeList } from "@/hooks/pages/daftar-anime/utils/FetchDaftarAnime";

import DaftarAnimeTerbaruSkelaton from '@/hooks/pages/daftar-anime/DaftarAnimeTerbaruSkelaton'

import FilterSidebar from '@/hooks/pages/daftar-anime/ui/FilterSidebar'

import AnimeSection from '@/hooks/pages/daftar-anime/ui/sections/AnimeSection'

import { useAnimeFilters } from '@/hooks/pages/daftar-anime/hooks/useAnimeFilters'

import { filterAnime, filterScheduleData } from '@/hooks/pages/daftar-anime/utils/filterAnime'

export default function DaftarAnimeLayout() {
    const {
        selectedGenre,
        selectedDay,
        selectedStatus,
        selectedType,
        handleFilterChange
    } = useAnimeFilters()

    const [animeData, setAnimeData] = useState<{
        schedule: { days: ScheduleDay[] };
        ongoing: { animeList: Anime[] };
        completed: { animeList: Anime[] };
        recent: { animeList: Anime[] };
        popular: { animeList: Anime[] };
        movies: { animeList: Anime[] };
        genres: { genreList: Genre[] };
    } | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Fetch data on component mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAnimeList();
                if (!response.ok || !response.data) {
                    throw new Error('Invalid API response structure')
                }

                // Ensure we have the correct data structure
                const animeData = {
                    schedule: { days: response.data.schedule?.days || [] },
                    ongoing: { animeList: response.data.ongoing?.animeList || [] },
                    completed: { animeList: response.data.completed?.animeList || [] },
                    recent: { animeList: response.data.recent?.animeList || [] },
                    popular: { animeList: response.data.popular?.animeList || [] },
                    movies: { animeList: response.data.movies?.animeList || [] },
                    genres: { genreList: response.data.genres?.genreList || [] }
                }

                setAnimeData(animeData)
            } catch {
                setError('Failed to load anime data. Please try again later.')
            }
        }
        fetchData()
    }, [])

    if (error) {
        return (
            <section className="min-h-screen py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                </div>
            </section>
        )
    }

    if (!animeData) {
        return (
            <DaftarAnimeTerbaruSkelaton />
        )
    }

    // Apply filters to all sections
    const filteredOngoingData = filterAnime(animeData.ongoing.animeList, selectedGenre, selectedType, selectedStatus)
    const filteredCompletedData = filterAnime(animeData.completed.animeList, selectedGenre, selectedType, selectedStatus)
    const filteredRecentData = filterAnime(animeData.recent.animeList, selectedGenre, selectedType, selectedStatus)
    const filteredPopularData = filterAnime(animeData.popular.animeList, selectedGenre, selectedType, selectedStatus)
    const filteredMoviesData = filterAnime(animeData.movies.animeList, selectedGenre, selectedType, selectedStatus)
    const filteredScheduleData = filterScheduleData(
        animeData.schedule.days,
        selectedDay,
        selectedGenre,
        selectedType,
        selectedStatus
    )

    return (
        <section className="min-h-screen py-20 bg-[var(--background)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12 order-last lg:order-first">
                        {!selectedGenre && !selectedDay && !selectedStatus && !selectedType ? (
                            <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
                                <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Pilih Filter untuk Menampilkan Anime</h2>
                                <p className="text-[var(--text-secondary)]">
                                    Gunakan filter di sidebar untuk menampilkan daftar anime yang sesuai dengan preferensi Anda.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Schedule Section */}
                                {!selectedStatus && !selectedType && filteredScheduleData.length > 0 && (
                                    <AnimeSection
                                        title={selectedDay ? `Jadwal Anime ${selectedDay}` : 'Jadwal Anime Mingguan'}
                                        animeList={[]}
                                        scheduleData={filteredScheduleData}
                                        showEstimation={true}
                                    />
                                )}

                                {/* Ongoing Section */}
                                {filteredOngoingData.length > 0 && (
                                    <AnimeSection
                                        title="Anime Ongoing"
                                        animeList={filteredOngoingData}
                                    />
                                )}

                                {/* Completed Section */}
                                {filteredCompletedData.length > 0 && (
                                    <AnimeSection
                                        title="Anime Selesai"
                                        animeList={filteredCompletedData}
                                    />
                                )}

                                {/* Popular Section */}
                                {filteredPopularData.length > 0 && (
                                    <AnimeSection
                                        title="Anime Populer"
                                        animeList={filteredPopularData}
                                    />
                                )}

                                {/* Movies Section */}
                                {filteredMoviesData.length > 0 && (
                                    <AnimeSection
                                        title="Anime Movies"
                                        animeList={filteredMoviesData}
                                    />
                                )}
                            </>
                        )}

                        {/* Recent Section */}
                        <AnimeSection
                            title="Anime Terbaru"
                            animeList={filteredRecentData}
                            showReleasedOn={true}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 order-first lg:order-last">
                        <FilterSidebar
                            genres={animeData.genres.genreList}
                            scheduleDays={animeData.schedule.days}
                            selectedGenre={selectedGenre}
                            selectedDay={selectedDay}
                            selectedStatus={selectedStatus}
                            selectedType={selectedType}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
