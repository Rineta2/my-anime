import { FiSearch } from 'react-icons/fi'

import { SearchBarProps } from '@/hooks/pages/types/AnimeTerbaru'

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 group-focus-within:text-primary transition-colors duration-300" />
            </div>

            <input
                type="text"
                placeholder="Cari anime..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-56 md:w-64 lg:w-72 pl-10 pr-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm sm:text-base"
            />
        </div>
    )
} 