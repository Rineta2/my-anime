import { AnimeSectionProps } from '@/hooks/pages/types/Anime'

import AnimeCard from '@/hooks/pages/daftar-anime/ui/cards/AnimeCard'

export default function AnimeSection({
    title,
    animeList,
    scheduleData,
    showEstimation = false,
    showReleasedOn = false
}: AnimeSectionProps) {
    if (animeList.length === 0 && (!scheduleData || scheduleData.length === 0)) {
        return null
    }

    return (
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6 pt-6 text-[var(--text)]">{title}</h2>
            <div className="p-6">
                {scheduleData ? (
                    <div className="space-y-6">
                        {scheduleData.map((day) => (
                            <div key={day.day} className="bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden border border-[var(--card-border)]">
                                <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white px-6 py-4">
                                    <h3 className="text-xl font-bold">{day.day}</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                        {day.animeList.map((anime) => (
                                            <AnimeCard
                                                key={anime.animeId}
                                                anime={anime}
                                                showEstimation={showEstimation}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {animeList.map((anime) => (
                            <AnimeCard
                                key={anime.animeId}
                                anime={anime}
                                showReleasedOn={showReleasedOn}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
} 