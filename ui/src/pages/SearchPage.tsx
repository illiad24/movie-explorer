import { useState, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  TextField,
  Grid,
  Typography,
  Box,
  InputAdornment,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import { SEARCH_QUERY } from '../graphql/queries';
import { useDebounce } from '../hooks/useDebounce';
import { useWatchlist } from '../hooks/useWatchlist.tsx';
import MediaCard from '../components/MediaCard';
import MediaCardSkeleton from '../components/MediaCardSkeleton';
import type { MediaCardItem } from '../components/MediaCard';

const DEBOUNCE_MS = 400;
const SKELETON_COUNT = 8;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { isInWatchlist, toggle } = useWatchlist();

  const [search, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    // Cancel the previous in-flight HTTP request before firing a new one
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    search({
      variables: { query: debouncedQuery },
      context: {
        fetchOptions: { signal: abortControllerRef.current.signal },
      },
    });
  }, [debouncedQuery, search]);

  const results = (data?.search ?? []) as MediaCardItem[];
  const hasQuery = debouncedQuery.trim().length > 0;
  const isEmpty = hasQuery && !loading && !error && results.length === 0;

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search movies and TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 4 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Something went wrong. Please try again.
        </Alert>
      )}

      {loading && (
        <Grid container spacing={2}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
              <MediaCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {isEmpty && (
        <Box textAlign="center" py={10}>
          <MovieIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography color="text.secondary">
            No results for &ldquo;{debouncedQuery}&rdquo;
          </Typography>
        </Box>
      )}

      {!loading && results.length > 0 && (
        <Grid container spacing={2}>
          {results.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
              <MediaCard
                item={item}
                inWatchlist={isInWatchlist(item.id)}
                onWatchlistToggle={toggle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
