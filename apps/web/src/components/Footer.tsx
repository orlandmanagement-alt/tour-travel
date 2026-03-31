'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  const hideFooterPaths = ['/custom-trip', '/checkout', '/checkout/success', '/login', '/register', '/affiliate', '/corporate', '/help', '/about', '/contact'];
  if (hideFooterPaths.includes(pathname) || pathname.startsWith('/blog') || pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-brand-950 text-white pt-12 pb-6 border-t-[4px] border-accent-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-8 border-b border-white/10 pb-8">
                
                <div className="lg:col-span-2 space-y-3">
                    <Link href="/" className="font-extrabold text-2xl tracking-tighter flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center"><i className="fa-solid fa-paper-plane text-sm"></i></div>
                        NusaTrip
                    </Link>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                        Platform travel terpercaya tingkat enterprise. Kami memberikan pengalaman liburan tanpa kompromi untuk private trip, corporate, dan rental kendaraan.
                    </p>
                    <div className="flex space-x-2 pt-1">
                        <a href="#" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"><i className="fa-brands fa-facebook-f text-xs"></i></a>
                        <a href="#" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"><i className="fa-brands fa-instagram text-xs"></i></a>
                        <a href="#" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"><i className="fa-brands fa-tiktok text-xs"></i></a>
                        <a href="#" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"><i className="fa-brands fa-youtube text-xs"></i></a>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-3 text-sm border-l-2 border-accent-500 pl-2">Perusahaan</h3>
                    <ul className="space-y-1.5 text-slate-400 text-xs">
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Karir</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Blog Travel</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Hubungi Kami</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-3 text-sm border-l-2 border-accent-500 pl-2">Layanan</h3>
                    <ul className="space-y-1.5 text-slate-400 text-xs">
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Open Trip</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Private Tour</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Rental Mobil</a></li>
                        <li><a href="#" className="hover:text-accent-400 transition-colors"><i className="fa-solid fa-angle-right text-[8px] mr-1"></i> Voucher Hotel</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-3 text-sm border-l-2 border-accent-500 pl-2">Pembayaran Aman</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="bg-white px-2 py-1 rounded text-brand-900 text-[10px] font-bold shadow-sm"><i className="fa-brands fa-cc-visa text-blue-800 text-lg"></i></div>
                        <div className="bg-white px-2 py-1 rounded text-brand-900 text-[10px] font-bold shadow-sm"><i className="fa-brands fa-cc-mastercard text-red-600 text-lg"></i></div>
                        <div className="bg-white px-2 py-1 rounded text-brand-900 text-[10px] font-bold shadow-sm flex items-center h-7 font-sans">BCA</div>
                        <div className="bg-white px-2 py-1 rounded text-brand-900 text-[10px] font-bold shadow-sm flex items-center h-7 font-sans">Mandiri</div>
                    </div>
                    
                    <h3 className="text-white font-bold mb-2 text-sm border-l-2 border-accent-500 pl-2">Keamanan</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded"><i className="fa-solid fa-lock"></i> SSL Secure</div>
                        <div className="flex items-center gap-1 text-[10px] text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-1 rounded"><i className="fa-solid fa-shield-halved"></i> Verified</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] sm:text-xs">
                <p>© 2026 PT Nusantara Trip System. Hak Cipta Dilindungi.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
