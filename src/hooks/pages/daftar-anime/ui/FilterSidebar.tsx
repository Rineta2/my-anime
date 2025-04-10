import { FilterSidebarProps } from '@/hooks/pages/types/Anime'

import GenreFilter from '@/hooks/pages/daftar-anime/ui/filters/GenreFilter'

import ScheduleFilter from '@/hooks/pages/daftar-anime/ui/filters/ScheduleFilter'

import StatusFilter from '@/hooks/pages/daftar-anime/ui/filters/StatusFilter'

import TypeFilter from '@/hooks/pages/daftar-anime/ui/filters/TypeFilter'

export default function FilterSidebar({
    genres,
    scheduleDays,
    selectedGenre,
    selectedDay,
    selectedStatus,
    selectedType,
    onFilterChange
}: FilterSidebarProps) {
    return (
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sticky top-24 h-fit overflow-y-auto max-h-[calc(100vh-8rem)] transform transition-all duration-300 hover:shadow-xl border border-[var(--card-border)] z-10">
            <h1 className="text-3xl font-bold mb-8 text-[var(--text)]">Daftar Anime</h1>

            <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onFilterChange={(value) => onFilterChange('genre', value)}
            />

            <ScheduleFilter
                scheduleDays={scheduleDays}
                selectedDay={selectedDay}
                onFilterChange={(value) => onFilterChange('day', value)}
            />

            <StatusFilter
                selectedStatus={selectedStatus}
                onFilterChange={(value) => onFilterChange('status', value)}
            />

            <TypeFilter
                selectedType={selectedType}
                onFilterChange={(value) => onFilterChange('type', value)}
            />
        </div>
    )
} 