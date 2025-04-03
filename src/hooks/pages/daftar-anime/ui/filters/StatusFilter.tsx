import { StatusFilterProps } from '@/hooks/pages/types/Anime'

export default function StatusFilter({ selectedStatus, onFilterChange }: StatusFilterProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text)]">Status</h2>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange(selectedStatus === 'Ongoing' ? null : 'Ongoing')}
                    className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedStatus === 'Ongoing'
                        ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                        : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                        }`}
                >
                    <span className="font-medium text-sm">Ongoing</span>
                </button>
                <button
                    onClick={() => onFilterChange(selectedStatus === 'Completed' ? null : 'Completed')}
                    className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedStatus === 'Completed'
                        ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                        : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                        }`}
                >
                    <span className="font-medium text-sm">Completed</span>
                </button>
            </div>
        </div>
    )
} 