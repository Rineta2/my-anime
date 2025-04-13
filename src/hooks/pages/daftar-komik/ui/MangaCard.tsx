import Image from 'next/image'
import Link from 'next/link'

interface MangaCardProps {
  manga: {
    title: string;
    description: string;
    latest_chapter: string;
    thumbnail: string;
    param: string;
    detail_url: string;
  };
  index: number;
}

export default function MangaCard({ manga, index }: MangaCardProps) {
  // Fallback image URL - you can replace this with your own fallback image
  const fallbackImage = '/images/placeholder-manga.jpg';
  const imageSrc = manga.thumbnail || fallbackImage;

  return (
    <Link
      href={`/daftar-manga/${manga.param}`}
      className="group relative bg-card-bg/50 backdrop-blur-sm border border-card-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl overflow-hidden animate-fadeIn w-full"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'both'
      }}
    >
      <figure className="relative h-[150px] md:h-[200px] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={manga.title}
          fill
          quality={100}
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-white">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-primary transition-colors duration-300 backdrop-blur-sm">
              {manga.latest_chapter}
            </span>
          </div>
        </div>
      </figure>
      <div className="card-body p-3 sm:p-4 md:p-5">
        <h2 className="card-title text-sm sm:text-base md:text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {manga.title}
        </h2>
        <p className="text-xs line-clamp-2">{manga.description}</p>
      </div>
    </Link>
  )
} 