import { ScheduleFilterProps } from '@/hooks/pages/types/Anime'

export default function ScheduleFilter({ scheduleDays, selectedDay, onFilterChange }: ScheduleFilterProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text)]">Jadwal Anime</h2>
            <div className="flex flex-wrap gap-2">
                {scheduleDays.map((day) => (
                    <button
                        key={day.day}
                        onClick={() => onFilterChange(selectedDay === day.day ? null : day.day)}
                        className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedDay === day.day
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                            : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                            }`}
                    >
                        <span className="font-medium text-sm">{day.day}</span>
                    </button>
                ))}
            </div>
        </div>
    )
} 