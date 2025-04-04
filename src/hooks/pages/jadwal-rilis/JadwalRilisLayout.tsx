"use client"

import React, { useEffect, useState } from 'react'

import { ScheduleResponse } from "@/hooks/pages/types/JadwalRilis"

import JadwalRilisSkeleton from "@/hooks/pages/jadwal-rilis/JadwalRilisSkelaton"

import JadwalRilisSidebar from "@/hooks/pages/jadwal-rilis/JadwalRilisSidebar"

import ErrorJadwalRilis from "@/hooks/pages/jadwal-rilis/announcement/ErrorJadwalRilis"

import Schedule from "@/hooks/pages/jadwal-rilis/announcement/Schedule"

import ScheduleList from '@/hooks/pages/jadwal-rilis/components/ScheduleList'

export default function JadwalRilisLayout() {
    const [schedule, setSchedule] = useState<ScheduleResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedDay, setSelectedDay] = useState<string | null>(null)

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('/api/anime/schedule', {
                    headers: {
                        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
                    }
                })
                const data = await response.json()
                if (data.ok && data.data) {
                    if (data.data.days && Array.isArray(data.data.days)) {
                        setSchedule(data)
                    } else {
                        setError('Invalid data structure: missing days array')
                    }
                } else {
                    setError(data.error || 'Invalid data format received')
                }
            } catch {
                setError('Failed to fetch schedule data')
            } finally {
                setLoading(false)
            }
        }

        fetchSchedule()
    }, [])

    const handleFilterChange = (day: string | null) => {
        setSelectedDay(day);
    };

    if (loading) {
        return (
            <JadwalRilisSkeleton />
        )
    }

    if (error) {
        return (
            <ErrorJadwalRilis error={error} />
        )
    }

    if (!schedule?.data?.days) {
        return (
            <Schedule />
        )
    }

    return (
        <section className='min-h-screen py-24 bg-gradient-to-br from-background via-background/95 to-background/90'>
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4 order-last lg:order-first">
                        <ScheduleList schedule={schedule} selectedDay={selectedDay} />
                    </div>
                    <div className="w-full lg:w-1/4">
                        <JadwalRilisSidebar onFilterChange={handleFilterChange} />
                    </div>
                </div>
            </div>
        </section>
    )
}
