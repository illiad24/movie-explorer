import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';

export default function App() {
  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Movie Explorer
          </Typography>
          <Button
            component={NavLink}
            to="/search"
            startIcon={<SearchIcon />}
            sx={{ mr: 1 }}
          >
            Search
          </Button>
          <Button
            component={NavLink}
            to="/watchlist"
            startIcon={<BookmarkIcon />}
          >
            Watchlist
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box py={4}>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<Navigate to="/search" replace />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
