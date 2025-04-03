import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export const useAnimeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states
  const [selectedGenre, setSelectedGenre] = useState<string | null>(
    searchParams.get("genre") || null
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(
    searchParams.get("day") || null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    searchParams.get("status") || null
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get("type") || null
  );

  // Handle filter changes
  const handleFilterChange = (
    filterType: "genre" | "day" | "status" | "type",
    value: string | null
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }

    router.push(`?${params.toString()}`);

    switch (filterType) {
      case "genre":
        setSelectedGenre(value);
        break;
      case "day":
        setSelectedDay(value);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      case "type":
        setSelectedType(value);
        break;
    }
  };

  // Update states when URL changes
  useEffect(() => {
    setSelectedGenre(searchParams.get("genre") || null);
    setSelectedDay(searchParams.get("day") || null);
    setSelectedStatus(searchParams.get("status") || null);
    setSelectedType(searchParams.get("type") || null);
  }, [searchParams]);

  return {
    selectedGenre,
    selectedDay,
    selectedStatus,
    selectedType,
    handleFilterChange,
  };
};
