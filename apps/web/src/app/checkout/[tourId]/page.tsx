// Server Component wrapper — provides generateStaticParams for static export
// The actual UI is in CheckoutClient (use client)
import CheckoutClient from './CheckoutClient';

export const dynamicParams = false;

export function generateStaticParams() {
  // Pre-render placeholder pages; real tour IDs populate at runtime via client-side fetch
  // For static export we generate at least one fallback shell
  return [{ tourId: 'loading' }];
}

export default function CheckoutPage({ params }: { params: { tourId: string } }) {
  return <CheckoutClient tourId={params.tourId} />;
}
