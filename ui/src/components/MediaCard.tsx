import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import {
  BookmarkAdd as BookmarkAddIcon,
  BookmarkRemove as BookmarkRemoveIcon,
} from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

export interface MediaCardItem {
  id: string;
  title: string;
  posterUrl?: string | null;
  releaseYear?: string | null;
  rating?: number | null;
  type?: string | null;
}

interface MediaCardProps {
  item: MediaCardItem;
  inWatchlist: boolean;
  onWatchlistToggle: (item: MediaCardItem) => void;
}

const POSTER_PLACEHOLDER = 'https://placehold.co/500x750?text=No+Image';

export default function MediaCard({ item, inWatchlist, onWatchlistToggle }: MediaCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={item.posterUrl ?? POSTER_PLACEHOLDER}
        alt={item.title}
        sx={{ aspectRatio: '2/3', objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap title={item.title}>
          {item.title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          {item.releaseYear && (
            <Typography variant="body2" color="text.secondary">
              {item.releaseYear}
            </Typography>
          )}
          {item.type && (
            <Chip
              label={item.type === 'tv' ? 'TV' : 'Movie'}
              size="small"
              variant="outlined"
              color={item.type === 'tv' ? 'secondary' : 'primary'}
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
        {item.rating != null && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <StarIcon fontSize="small" sx={{ color: 'warning.main' }} />
            <Typography variant="body2">{item.rating.toFixed(1)}</Typography>
          </Box>
        )}

        <Tooltip title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}>
          <IconButton
            size="small"
            color={inWatchlist ? 'error' : 'default'}
            onClick={() => onWatchlistToggle(item)}
            aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {inWatchlist ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
