import { Anime, ScheduleDay } from "@/hooks/pages/types/Anime";

export const filterAnime = (
  animeList: Anime[],
  selectedGenre: string | null,
  selectedType: string | null,
  selectedStatus: string | null
) => {
  if (!animeList) return [];

  return animeList.filter((anime) => {
    // Genre filter
    const genreMatch =
      !selectedGenre ||
      (anime.genres && anime.genres.split(", ").includes(selectedGenre)) ||
      (anime.genreList &&
        anime.genreList.some((genre) => genre.title === selectedGenre));

    // Type filter
    const typeMatch = !selectedType || anime.type === selectedType;

    // Status filter - handle both uppercase and lowercase status
    const statusMatch =
      !selectedStatus ||
      (selectedStatus === "Ongoing" &&
        (anime.status === "Ongoing" || anime.status === "ongoing")) ||
      (selectedStatus === "Completed" &&
        (anime.status === "Completed" || anime.status === "completed"));

    return genreMatch && typeMatch && statusMatch;
  });
};

export const filterScheduleData = (
  scheduleData: ScheduleDay[],
  selectedDay: string | null,
  selectedGenre: string | null,
  selectedType: string | null,
  selectedStatus: string | null
) => {
  // If no day is selected, return all days
  if (!selectedDay) {
    return scheduleData.map((day) => ({
      ...day,
      animeList: day.animeList.filter((anime) => {
        // Apply other filters to schedule data
        const genreMatch =
          !selectedGenre ||
          (anime.genres && anime.genres.split(", ").includes(selectedGenre)) ||
          (anime.genreList &&
            anime.genreList.some((genre) => genre.title === selectedGenre));

        const typeMatch = !selectedType || anime.type === selectedType;

        // Only show ongoing anime in schedule
        const statusMatch =
          !selectedStatus ||
          (selectedStatus === "Ongoing" && anime.status === "Ongoing");

        return genreMatch && typeMatch && statusMatch;
      }),
    }));
  }

  // If a day is selected, only return that day
  const filteredDay = scheduleData.find((day) => day.day === selectedDay);
  if (!filteredDay) return [];

  const filteredAnimeList = filteredDay.animeList.filter((anime) => {
    // Apply other filters to schedule data
    const genreMatch =
      !selectedGenre ||
      (anime.genres && anime.genres.split(", ").includes(selectedGenre)) ||
      (anime.genreList &&
        anime.genreList.some((genre) => genre.title === selectedGenre));

    const typeMatch = !selectedType || anime.type === selectedType;

    // Only show ongoing anime in schedule
    const statusMatch =
      !selectedStatus ||
      (selectedStatus === "Ongoing" && anime.status === "Ongoing");

    return genreMatch && typeMatch && statusMatch;
  });

  return [
    {
      ...filteredDay,
      animeList: filteredAnimeList,
    },
  ];
};
