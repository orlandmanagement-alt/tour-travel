import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8 border-t-[4px] border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 border-b border-white/10 pb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="font-extrabold text-2xl tracking-tighter flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent text-white flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NusaTrip</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Platform travel terpercaya tingkat enterprise. Kami memberikan pengalaman liburan tanpa kompromi untuk private trip, corporate, dan rental kendaraan di seluruh Indonesia.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all duration-300 group">
                <i className="fa-brands fa-facebook-f text-sm group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all duration-300 group">
                <i className="fa-brands fa-instagram text-sm group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all duration-300 group">
                <i className="fa-brands fa-tiktok text-sm group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all duration-300 group">
                <i className="fa-brands fa-youtube text-sm group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Links Col 1: Perusahaan */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-accent rounded-full inline-block"></span>
              Perusahaan
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li><Link href="/corporate" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Tentang Kami</Link></li>
              <li><Link href="/blog" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Blog Travel</Link></li>
              <li><Link href="/faq" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Pusat Bantuan</Link></li>
              <li><Link href="/contact" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Links Col 2: Layanan */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-accent rounded-full inline-block"></span>
              Layanan
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li><Link href="/tours" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Semua Paket Tour</Link></li>
              <li><Link href="/destinations" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Jelajah Destinasi</Link></li>
              <li><Link href="/planner" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> Trip Planner</Link></li>
              <li><Link href="/corporate" className="hover:text-brand-accent transition-colors flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[10px] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i> B2B Corporate</Link></li>
            </ul>
          </div>

          {/* Payment & Secure Col */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-accent rounded-full inline-block"></span>
              Pembayaran Aman
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-6">
              <div className="bg-white px-2 py-1.5 rounded-lg text-brand-900 shadow-sm flex items-center justify-center transition-transform hover:scale-105 group"><i className="fa-brands fa-cc-visa text-blue-800 text-xl"></i></div>
              <div className="bg-white px-2 py-1.5 rounded-lg text-brand-900 shadow-sm flex items-center justify-center transition-transform hover:scale-105 group"><i className="fa-brands fa-cc-mastercard text-red-600 text-xl"></i></div>
              <div className="bg-white px-2 py-1.5 rounded-lg text-brand-900 shadow-sm flex items-center justify-center transition-transform hover:scale-105 group"><i className="fa-brands fa-cc-jcb text-emerald-700 text-xl"></i></div>
              <div className="bg-white px-2.5 py-1.5 rounded-lg text-brand-950 text-[10px] font-extrabold shadow-sm flex items-center transition-transform hover:scale-105">BCA</div>
              <div className="bg-white px-2.5 py-1.5 rounded-lg text-brand-950 text-[10px] font-extrabold shadow-sm flex items-center transition-transform hover:scale-105">MANDIRI</div>
            </div>
            
            <h3 className="text-white font-bold mb-3 text-[11px] uppercase tracking-widest text-slate-500">Security</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                <i className="fa-solid fa-shield-check"></i> SSL Secure
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 border border-blue-400/20 bg-blue-400/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                <i className="fa-solid fa-badge-check"></i> Verified
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-semibold gap-4">
          <p className="order-2 md:order-1">© {new Date().getFullYear()} PT Nusantara Trip System. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-8 order-1 md:order-2">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Syarat & Ketentuan</Link>
            <Link href="/faq" className="hover:text-white transition-colors duration-300">Pusat Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
