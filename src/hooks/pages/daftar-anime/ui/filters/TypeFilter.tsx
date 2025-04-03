import { TypeFilterProps } from '@/hooks/pages/types/Anime'

export default function TypeFilter({ selectedType, onFilterChange }: TypeFilterProps) {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--text)]">Type</h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onFilterChange(selectedType === 'TV' ? null : 'TV')}
                        className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedType === 'TV'
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                            : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                            }`}
                    >
                        <span className="font-medium text-sm">TV Series</span>
                    </button>
                    <button
                        onClick={() => onFilterChange(selectedType === 'Movie' ? null : 'Movie')}
                        className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedType === 'Movie'
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                            : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                            }`}
                    >
                        <span className="font-medium text-sm">Movie</span>
                    </button>
                    <button
                        onClick={() => onFilterChange(selectedType === 'OVA' ? null : 'OVA')}
                        className={`rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 ${selectedType === 'OVA'
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                            : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                            }`}
                    >
                        <span className="font-medium text-sm">OVA</span>
                    </button>
                </div>
            </div>
        </div>
    )
} 