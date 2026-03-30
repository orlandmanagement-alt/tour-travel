// Server Component wrapper for static export compatibility
// The UI logic is moved to TourDetailClient (client component)
import TourDetailClient from './TourDetailClient';

export const dynamicParams = false;

export function generateStaticParams() {
  // Provide at least one static path for build consistency
  // In dynamic scenarios, we'll handle the actual ID on the client side
  return [{ id: '1' }];
}

interface PageProps {
  params: { id: string };
}

export default function TourDetailPage({ params }: PageProps) {
  return <TourDetailClient id={params.id} />;
}