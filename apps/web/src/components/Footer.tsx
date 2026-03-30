import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              NusantaraTrip
            </h3>
            <p className="text-sm text-gray-400">
              Your trusted partner for discovering the hidden gems and breathtaking landscapes of Indonesia. Let's start the adventure!
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-brand-primary transition">About Us</Link></li>
              <li><Link href="/destinations" className="hover:text-brand-primary transition">Destinations</Link></li>
              <li><Link href="/tours" className="hover:text-brand-primary transition">Tour Packages</Link></li>
              <li><Link href="/faq" className="hover:text-brand-primary transition">FAQ & Help</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-brand-primary transition">Contact Us</Link></li>
              <li><Link href="/track" className="hover:text-brand-primary transition">Track Booking</Link></li>
              <li><Link href="/terms" className="hover:text-brand-primary transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-primary transition">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>Jl. Soekarno Hatta No 9, Malang</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>hello@nusantaratrip.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NusantaraTrip. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Icons logic here */}
            <span className="cursor-pointer hover:text-white transition">IG</span>
            <span className="cursor-pointer hover:text-white transition">FB</span>
            <span className="cursor-pointer hover:text-white transition">YT</span>
            <span className="cursor-pointer hover:text-white transition">WA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
