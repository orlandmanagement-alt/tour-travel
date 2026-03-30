import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              NusantaraTrip
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-brand-primary font-medium transition-colors">Home</Link>
            <Link href="/destinations" className="text-foreground hover:text-brand-primary font-medium transition-colors">Destinations</Link>
            <Link href="/tours" className="text-foreground hover:text-brand-primary font-medium transition-colors">Tours</Link>
            <Link href="/custom-trip" className="text-foreground hover:text-brand-primary font-medium transition-colors">Custom Trip</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/track" className="text-sm font-medium text-foreground hover:text-brand-primary transition-colors">
              Track Order
            </Link>
            <Link href="/tours" className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5">
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-foreground hover:text-brand-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
