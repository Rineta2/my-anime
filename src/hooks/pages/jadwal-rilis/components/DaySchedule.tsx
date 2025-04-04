import AnimeCard from '@/hooks/pages/jadwal-rilis/components/AnimeCard'

import { DayScheduleProps } from "@/hooks/pages/types/JadwalRilis"

export default function DaySchedule({ day, animeList }: DayScheduleProps) {
    return (
        <div className="bg-card-bg/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-card-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-primary/5">
            <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></span>
                {day}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {animeList.map((anime) => (
                    <AnimeCard key={anime.animeId} anime={anime} />
                ))}
            </div>
        </div>
    )
} 