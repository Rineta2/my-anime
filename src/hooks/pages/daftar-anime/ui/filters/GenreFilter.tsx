import { GenreFilterProps } from '@/hooks/pages/types/Anime'

export default function GenreFilter({ genres, selectedGenre, onFilterChange }: GenreFilterProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text)]">Genre Anime</h2>
            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <button
                        key={genre.genreId}
                        onClick={() => onFilterChange(selectedGenre === genre.title ? null : genre.title)}
                        className={`rounded-lg px-3 py-2 transition-all duration-300 transform hover:scale-105 ${selectedGenre === genre.title
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md'
                            : 'bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)]/80 text-[var(--text)]'
                            }`}
                    >
                        <span className="font-medium text-sm">{genre.title}</span>
                    </button>
                ))}
            </div>
        </div>
    )
} 