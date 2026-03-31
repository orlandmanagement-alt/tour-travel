'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CarDetailPage() {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  // Booking Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceType, setServiceType] = useState('driver');
  const [durationDays, setDurationDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const basePrice = 850000;

  useEffect(() => {
    // init dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = end.getTime() - start.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) diffDays = 1;
    setDurationDays(diffDays);

    let driverFee = 0;
    if (serviceType === 'driver') driverFee = 150000;
    else if (serviceType === 'allin') driverFee = 350000;

    const total = (basePrice + driverFee) * diffDays;
    setTotalPrice(total);
  }, [startDate, endDate, serviceType]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(totalPrice);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-12">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMBS & HEADER ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <nav className="flex text-[10px] sm:text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center"><Link href="/" className="hover:text-brand-600 transition-colors">Beranda</Link></li>
              <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><Link href="/cars" className="hover:text-brand-600 transition-colors">Rental Mobil</Link></div></li>
              <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><span className="text-slate-800 font-bold">Innova Zenix Hybrid</span></div></li>
            </ol>
          </nav>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-brand-50">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Bagikan
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 group">
              <i className="fa-regular fa-heart group-hover:block hidden"></i>
              <i className="fa-solid fa-heart group-hover:hidden text-red-500"></i> Simpan
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-brand-100 text-brand-600 border border-brand-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">NYAMAN & IRIT</span>
            <span className="bg-blue-100 text-blue-600 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">BISA LEPAS KUNCI</span>
            <span className="bg-emerald-100 text-emerald-600 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm"><i className="fa-solid fa-bolt mr-1"></i>INSTANT CONFIRMATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            Toyota Innova Zenix Hybrid (2024)
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1 text-slate-700">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <span className="font-bold text-slate-900">5.0</span>
              <span className="underline cursor-pointer hover:text-brand-600">(342 Sewa)</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-brand-500"></i> Pool Malang / Surabaya
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-car text-brand-500"></i> SUV/MPV Premium
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 relative group cursor-pointer bg-slate-200">
          <div className="md:col-span-3 h-full w-full relative bg-white flex items-center justify-center p-4">
            <img src="https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=1200" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 mix-blend-multiply" alt="Innova Zenix" />
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full w-full">
            <div className="h-1/2 w-full relative overflow-hidden bg-white p-2">
              <img src="https://images.unsplash.com/photo-1549317336-206569e8475c?w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-80" alt="Interior Dashboard" />
            </div>
            <div className="h-1/2 w-full relative overflow-hidden bg-white p-2">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-80" alt="Bagasi" />
              <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center transition-colors hover:bg-slate-900/70">
                <span className="text-white font-bold text-sm">+5 Foto Lainnya</span>
              </div>
            </div>
          </div>
          <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-4 py-2 rounded-lg shadow-lg border border-slate-200 hover:bg-white md:hidden">
            <i className="fa-regular fa-images mr-1"></i> Semua Foto
          </button>
        </div>

        {/* CONTENT & BOOKING PANEL */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          <div className="flex-1 w-full min-w-0 pb-10">
            {/* Quick Specs */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-slate-50">
                <i className="fa-solid fa-users text-brand-500 text-xl mb-1"></i>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Kapasitas</span>
                <span className="text-sm font-bold text-slate-800">7 Penumpang</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-slate-50">
                <i className="fa-solid fa-gears text-brand-500 text-xl mb-1"></i>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Transmisi</span>
                <span className="text-sm font-bold text-slate-800">Automatic (AT)</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-slate-50">
                <i className="fa-solid fa-gas-pump text-brand-500 text-xl mb-1"></i>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Bahan Bakar</span>
                <span className="text-sm font-bold text-slate-800">Bensin (Hybrid)</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-slate-50">
                <i className="fa-solid fa-suitcase text-brand-500 text-xl mb-1"></i>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Bagasi</span>
                <span className="text-sm font-bold text-slate-800">3 Koper Besar</span>
              </div>
            </div>

            <section className="mb-10" id="deskripsi">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Tentang Mobil Ini</h2>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>Nikmati perjalanan premium dan efisien dengan <strong>Toyota Innova Zenix Hybrid 2024</strong>. Generasi terbaru dari legenda mobil keluarga Indonesia ini kini hadir dengan mesin hybrid yang sangat irit bahan bakar, kabin yang jauh lebih senyap, dan kenyamanan ekstra berkat sasis monokok baru.</p>
                <p>Mobil ini sangat ideal untuk perjalanan bisnis, liburan keluarga jarak jauh, atau VIP transfer. Dilengkapi dengan <em>Captain Seat</em> (pada tipe tertentu), panoramic sunroof, dan sistem keamanan Toyota Safety Sense (TSS) untuk menjamin perjalanan Anda aman dan nyaman.</p>
              </div>
            </section>

            <section className="mb-10" id="layanan">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Ketentuan Layanan Sewa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-brand-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                  <h3 className="font-bold text-brand-700 text-sm mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-user-tie"></i> Opsi Dengan Supir
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-500 mt-0.5 w-4"></i> Durasi sewa 12 Jam atau Full Day (sesuai pilihan).</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-500 mt-0.5 w-4"></i> Harga belum termasuk BBM, Tol, dan Parkir.</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-500 mt-0.5 w-4"></i> Makan supir kebijaksanaan penyewa.</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-500 mt-0.5 w-4"></i> Rute maksimal batas provinsi (Jawa Timur).</li>
                  </ul>
                </div>
                <div className="bg-white border border-accent-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent-500"></div>
                  <h3 className="font-bold text-accent-600 text-sm mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-key"></i> Opsi Lepas Kunci
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent-500 mt-0.5 w-4"></i> Durasi sewa per 24 Jam.</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent-500 mt-0.5 w-4"></i> Wajib memberikan jaminan KTP asli dan Motor/Titipan.</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-check text-accent-500 mt-0.5 w-4"></i> Verifikasi data KTP, KK, SIM A wajib dilakukan H-1.</li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 w-4"></i> Overtime dikenakan biaya 10% dari harga sewa per jam.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10" id="syarat">
               <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Syarat & Ketentuan Rental</h2>
               <div className="space-y-3">
                  {/* T&C 1 */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-brand-300 transition-colors">
                     <button className="w-full text-left p-4 flex justify-between items-center focus:outline-none" onClick={() => toggleAccordion('tc-1')}>
                        <h4 className="font-bold text-slate-800 text-sm">Persyaratan Lepas Kunci</h4>
                        <i className={`fa-solid fa-chevron-down text-slate-400 text-sm transform transition-transform ${openAccordion === 'tc-1' ? 'rotate-180' : ''}`}></i>
                     </button>
                     <div className={`bg-slate-50 border-t border-slate-100 transition-all overflow-hidden ${openAccordion === 'tc-1' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 text-xs text-slate-600 leading-relaxed">
                           <ul className="list-disc pl-5 space-y-1">
                              <li>Memiliki SIM A yang masih berlaku.</li>
                              <li>Menjaminkan e-KTP Asli.</li>
                              <li>Menunjukkan Kartu Keluarga (KK) / ID Card Karyawan Asli.</li>
                              <li>Menunjukkan tiket penerbangan/kereta api pulang-pergi (jika wisatawan).</li>
                              <li>Bersedia difoto bersama kendaraan saat serah terima.</li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  {/* T&C 2 */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-brand-300 transition-colors">
                     <button className="w-full text-left p-4 flex justify-between items-center focus:outline-none" onClick={() => toggleAccordion('tc-2')}>
                        <h4 className="font-bold text-slate-800 text-sm">Ketentuan Penggunaan Kendaraan</h4>
                        <i className={`fa-solid fa-chevron-down text-slate-400 text-sm transform transition-transform ${openAccordion === 'tc-2' ? 'rotate-180' : ''}`}></i>
                     </button>
                     <div className={`bg-slate-50 border-t border-slate-100 transition-all overflow-hidden ${openAccordion === 'tc-2' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 text-xs text-slate-600 leading-relaxed">
                           <ul className="list-disc pl-5 space-y-1">
                              <li>Dilarang menggunakan kendaraan untuk tindak kejahatan.</li>
                              <li>Dilarang menyewakan kembali / memindahtangankan kendaraan kepada pihak ketiga.</li>
                              <li>Dilarang membawa kendaraan ke medan off-road ekstrim yang tidak sesuai spesifikasi.</li>
                              <li>Kerusakan akibat kelalaian penyewa (ban bocor, lecet, dll) sepenuhnya menjadi tanggung jawab penyewa.</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </div>

          {/* WIDGET BOOKING PANEL */}
          <aside className="w-full lg:w-[360px] flex-shrink-0">
            <div className="sticky top-8 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-6 mb-8">
              
              <div className="mb-5 pb-5 border-b border-slate-100">
                <div className="flex justify-between items-end mb-1">
                  <p className="text-slate-400 text-sm line-through">Rp 950.000</p>
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">PROMO</span>
                </div>
                <div className="flex items-end gap-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-600 leading-none">Rp 850.000</h2>
                  <span className="text-xs font-medium text-slate-500 mb-1">/ hari</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1"><i className="fa-solid fa-circle-info mr-1 text-blue-400"></i> Harga untuk pemakaian dalam kota Malang/Batu.</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tgl Ambil</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-500 font-bold text-slate-800 cursor-pointer" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tgl Kembali</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-500 font-bold text-slate-800 cursor-pointer" required />
                  </div>
                </div>

                {durationDays > 0 && (
                  <div className="text-[10px] text-brand-600 font-bold bg-brand-50 p-2 rounded text-center">
                    Total Durasi Sewa: <span>{durationDays}</span> Hari
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Pilihan Layanan</label>
                  <div className="relative">
                    <i className="fa-solid fa-user-tie absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select value={serviceType} onChange={e => setServiceType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:border-brand-500 font-medium text-slate-800 appearance-none cursor-pointer">
                      <option value="driver">Dengan Supir (+ Rp 150.000/hari)</option>
                      <option value="self">Lepas Kunci (S&K Berlaku)</option>
                      <option value="allin">Supir + BBM All In (+ Rp 350.000/hari)</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Lokasi Ambil/Jemput</label>
                  <div className="relative">
                    <i className="fa-solid fa-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:border-brand-500 font-medium text-slate-800 appearance-none cursor-pointer">
                      <option>Pool NusaTrip Malang (Gratis)</option>
                      <option>Hotel Area Malang/Batu (Gratis)</option>
                      <option>Bandara Abdul Rachman Saleh (+ Rp 50.000)</option>
                      <option>Bandara Juanda Surabaya (+ Rp 300.000)</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
                  </div>
                </div>

                <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-slate-600">Estimasi Total:</span>
                  <span className="text-lg font-extrabold text-slate-900">{formattedTotal}</span>
                </div>

                <button type="submit" className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 mt-2 flex justify-center items-center gap-2">
                  Lanjut Pesan <i className="fa-solid fa-arrow-right"></i>
                </button>
                
                <button type="button" className="w-full py-2.5 bg-white border border-green-500 text-green-600 hover:bg-green-50 font-bold text-sm rounded-xl transition-colors mt-2 flex justify-center items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i> Tanya Ketersediaan
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
