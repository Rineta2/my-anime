export interface Chapter {
  chapter: string;
  param: string;
  release: string;
  detail_url: string;
}

export interface SimilarManga {
  title: string;
  thumbnail: string;
  synopsis: string;
  param: string;
  detail_url: string;
}

export interface MangaDetail {
  title: string;
  param: string;
  thumbnail: string;
  genre: string[];
  synopsis: string;
  chapters: Chapter[];
  similars: SimilarManga[];
}
