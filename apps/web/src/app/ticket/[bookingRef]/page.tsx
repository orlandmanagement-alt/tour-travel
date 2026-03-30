// Server Component wrapper for static export
import ETicketClient from './ETicketClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ bookingRef: 'loading' }];
}

export default function TicketPage({ params }: { params: { bookingRef: string } }) {
  return <ETicketClient bookingRef={params.bookingRef} />;
}
