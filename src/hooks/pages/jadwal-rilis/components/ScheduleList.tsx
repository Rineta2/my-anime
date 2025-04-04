import DaySchedule from '@/hooks/pages/jadwal-rilis/components/DaySchedule'

import { ScheduleListProps } from "@/hooks/pages/types/JadwalRilis"

export default function ScheduleList({ schedule, selectedDay }: ScheduleListProps) {
    const filteredDays = selectedDay
        ? schedule.data.days.filter(day => day.day.toLowerCase() === selectedDay)
        : schedule.data.days;

    return (
        <div className="grid gap-8">
            {filteredDays.map((daySchedule) => (
                <DaySchedule
                    key={daySchedule.day}
                    day={daySchedule.day}
                    animeList={daySchedule.animeList}
                />
            ))}
        </div>
    )
} 