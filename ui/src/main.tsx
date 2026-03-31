import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { apolloClient } from './graphql/client';
import { WatchlistProvider } from './hooks/useWatchlist.tsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <WatchlistProvider>
            <App />
          </WatchlistProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
