import { Card, CardContent, Skeleton } from '@mui/material';

export default function MediaCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" sx={{ aspectRatio: '2/3' }} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
}
