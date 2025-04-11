import React, { useState, useEffect, useRef, useMemo } from 'react';

interface JadwalRilisSidebarProps {
    onFilterChange: (selectedDay: string | null) => void;
}

export default function JadwalRilisSidebar({ onFilterChange }: JadwalRilisSidebarProps) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [currentDay, setCurrentDay] = useState<string | null>(null);
    const initialRender = useRef(true);

    const days = useMemo(() => [
        { id: 'monday', label: 'Monday' },
        { id: 'tuesday', label: 'Tuesday' },
        { id: 'wednesday', label: 'Wednesday' },
        { id: 'thursday', label: 'Thursday' },
        { id: 'friday', label: 'Friday' },
        { id: 'saturday', label: 'Saturday' },
        { id: 'sunday', label: 'Sunday' },
    ], []);

    useEffect(() => {
        // Get current day in user's timezone
        const today = new Date();
        const currentDayIndex = today.getDay();
        // Convert Sunday (0) to 7 for easier mapping
        const dayNumber = currentDayIndex === 0 ? 7 : currentDayIndex;
        // Map day number to our day IDs (1 = monday, 7 = sunday)
        const defaultDay = days[dayNumber - 1].id;
        setCurrentDay(defaultDay);

        // Only set the selected day on initial render
        if (initialRender.current) {
            setSelectedDay(defaultDay);
            onFilterChange(defaultDay);
            initialRender.current = false;
        }
    }, [onFilterChange, days]);

    const handleDayClick = (day: string) => {
        // If clicking the same day that's already selected, deselect it
        if (selectedDay === day) {
            setSelectedDay(null);
            onFilterChange(null);
            return;
        }

        // If clicking a different day, select it
        setSelectedDay(day);
        onFilterChange(day);
    };

    return (
        <aside className="w-full lg:w-96 bg-card-bg/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-20 border border-card-border/50 hover:border-primary/30 transition-all duration-300 order-first lg:order-last">
            <div>
                <h3 className="text-lg font-semibold mb-6 text-text flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></span>
                    Jadwal Hari
                </h3>
                <nav>
                    <ul className="space-y-0 lg:space-y-2 flex lg:block overflow-y-auto lg:overflow-y-hidden">
                        {days.map((day) => (
                            <li key={day.id}>
                                <button
                                    onClick={() => handleDayClick(day.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${selectedDay === day.id
                                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                                        : 'text-text-secondary hover:bg-hover-bg/50 border border-transparent hover:border-primary/10'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{day.label}</span>
                                        {currentDay === day.id && (
                                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
                                                <svg
                                                    className="w-3 h-3"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                                Today
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
} 