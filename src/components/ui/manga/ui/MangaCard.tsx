import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MangaItem } from '../lib/FetchManga';

interface MangaCardProps {
  manga: MangaItem;
}

export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link
      href={`/daftar-manga/${manga.param}`}
      className="group block w-full transition-all duration-300 hover:-translate-y-1 bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] p-2 rounded-xl"
    >
      <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-xl">
        <Image
          src={manga.thumbnail}
          alt={manga.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-4 space-y-1 px-1">
        <h3 className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {manga.title}
        </h3>

        <p className="text-sm">
          Chapter {manga.latest_chapter}
        </p>
      </div>
    </Link>
  );
} 