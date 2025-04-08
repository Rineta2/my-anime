import { FiSearch } from 'react-icons/fi'

import { SearchBarProps } from '@/hooks/pages/types/AnimeTerbaru'

export default function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }: SearchBarProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearchSubmit) {
            onSearchSubmit(searchQuery);
        }
    };

    const handleSearchClick = () => {
        if (onSearchSubmit) {
            onSearchSubmit(searchQuery);
        }
    };

    return (
        <div className="relative group flex">
            <div className="relative flex-grow">
                <div
                    className="absolute inset-y-0 left-3 flex items-center pointer-events-none"
                >
                    <FiSearch className="h-5 w-5 group-focus-within:text-primary transition-colors duration-300" />
                </div>

                <input
                    type="text"
                    placeholder="Cari anime..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm sm:text-base"
                />
            </div>

            <button
                onClick={handleSearchClick}
                className="px-4 py-2 bg-primary text-white rounded-r-full hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                Cari
            </button>
        </div>
    )
} 