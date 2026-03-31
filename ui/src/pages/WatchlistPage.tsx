import { Grid, Typography, Box } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useWatchlist } from '../hooks/useWatchlist.tsx';
import MediaCard from '../components/MediaCard';

export default function WatchlistPage() {
  const { items, toggle, isInWatchlist } = useWatchlist();

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <BookmarkIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Your watchlist is empty
        </Typography>
        <Typography variant="body2" color="text.disabled" mt={1}>
          Search for movies or TV shows and add them here
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Watchlist ({items.length})
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
            <MediaCard
              item={item}
              inWatchlist={isInWatchlist(item.id)}
              onWatchlistToggle={toggle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
