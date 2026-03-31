import { tmdbFetch, buildImageUrl } from './tmdbClient.js';

interface TmdbMultiResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

interface TmdbSearchResponse {
  results: TmdbMultiResult[];
}

export interface MediaItem {
  id: string;
  title: string;
  posterUrl: string | null;
  releaseYear: string | null;
  rating: number;
  type: string;
}

function toYear(dateStr?: string): string | null {
  if (!dateStr) return null;
  return dateStr.slice(0, 4);
}

function mapToMediaItem(item: TmdbMultiResult): MediaItem {
  return {
    id: String(item.id),
    title: item.title ?? item.name ?? 'Untitled',
    posterUrl: buildImageUrl(item.poster_path),
    releaseYear: toYear(item.release_date ?? item.first_air_date),
    rating: item.vote_average,
    type: item.media_type,
  };
}

export async function searchMulti(query: string): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbSearchResponse>('/search/multi', { query });

  return data.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map(mapToMediaItem);
}
