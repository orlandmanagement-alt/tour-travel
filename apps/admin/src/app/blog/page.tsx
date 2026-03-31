'use client';

import React, { useState, useMemo } from 'react';

type Post = {
  id: string;
  title: string;
  slug: string;
  category: 'Panduan Wisata' | 'Kuliner' | 'Promo & Berita';
  author: string;
  views: string;
  status: 'Published' | 'Draft';
  date: string;
  image: string;
};

const MOCK_POSTS: Post[] = [
  { id: '01', title: 'Panduan Lengkap Liburan ke Bali 2026', slug: '/blog/panduan-liburan-bali', category: 'Panduan Wisata', author: 'Diana Content', views: '12.4K', status: 'Published', date: '12 Nov 2026', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200' },
  { id: '02', title: '7 Pantai Tersembunyi di Lombok', slug: '/blog/pantai-hidden-lombok', category: 'Panduan Wisata', author: 'Budi (Admin)', views: '-', status: 'Draft', date: 'Belum Terbit', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200' },
  { id: '03', title: 'Rekomendasi Kuliner Malam di Malang', slug: '/blog/kuliner-malam-malang', category: 'Kuliner', author: 'Diana Content', views: '5.2K', status: 'Published', date: '05 Nov 2026', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200' },
];

export default function BlogCMSPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Blog & Content CMS</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Publikasikan panduan wisata dan berita promosi untuk optimasi SEO NusantaraTrip.</p>
        </div>
        <button 
          onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-brand-600 text-white font-black text-xs rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-pen-nib"></i> Tulis Artikel Baru
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50/50 border-b border-slate-100">
          <div className="relative w-full lg:w-96 group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-brand-600 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Cari judul artikel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
             <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
               <option>Semua Kategori</option>
               <option>Panduan Wisata</option>
               <option>Kuliner</option>
             </select>
             <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
               <option>Semua Status</option>
               <option>Published</option>
               <option>Draft</option>
             </select>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5 w-16 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" />
                </th>
                <th className="px-8 py-5">Judul & Cover</th>
                <th className="px-8 py-5">Kategori / Penulis</th>
                <th className="px-8 py-5 text-center">Dilihat</th>
                <th className="px-8 py-5 text-center">Status / Tgl Terbit</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate max-w-[300px]">{post.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 lowercase italic tracking-tight">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5 rounded">{post.category}</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.author}</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-700">
                       <i className="fa-solid fa-eye text-brand-500/50 text-[10px]"></i>
                       {post.views}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                       post.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                     }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                       {post.status}
                     </span>
                     <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tight">{post.date}</p>
                  </td>
                  <td className="px-8 py-5 font-medium">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => { setEditingPost(post); setIsModalOpen(true); }}
                          className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CMS Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 h-[90vh] flex flex-col">
              
              <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <i className="fa-solid fa-pen-nib text-sm"></i>
                    </div>
                    {editingPost ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                 </h2>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Auto-saved 1 min ago</span>
                    <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left: Content Editor */}
                    <div className="lg:col-span-2 space-y-8">
                       <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Judul Artikel <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            defaultValue={editingPost?.title || ''}
                            className="w-full bg-slate-50 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-none focus:ring-0 placeholder:text-slate-200" 
                            placeholder="Judul Petualangan Berikutnya..." 
                          />
                       </div>

                       <div className="space-y-4">
                          <div className="flex items-center gap-1 p-2 bg-slate-50 rounded-2xl border border-slate-100 overflow-x-auto whitespace-nowrap">
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-slate-600 transition-all font-black text-xs"><i className="fa-solid fa-bold"></i></button>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-slate-600 transition-all font-black text-xs"><i className="fa-solid fa-italic"></i></button>
                             <div className="w-px h-6 bg-slate-200 mx-1"></div>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-slate-600 transition-all font-black text-xs"><i className="fa-solid fa-heading"></i></button>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-slate-600 transition-all font-black text-xs"><i className="fa-solid fa-quote-left"></i></button>
                             <div className="w-px h-6 bg-slate-200 mx-1"></div>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-slate-600 transition-all font-black text-xs"><i className="fa-solid fa-list-ul"></i></button>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-brand-600 transition-all font-black text-xs"><i className="fa-solid fa-link"></i></button>
                             <button className="h-10 px-3 hover:bg-white rounded-xl text-emerald-500 transition-all font-black text-xs"><i className="fa-regular fa-image"></i></button>
                          </div>
                          <textarea 
                            rows={15}
                            className="w-full bg-white text-base text-slate-700 leading-relaxed font-medium focus:ring-0 border-none placeholder:text-slate-200 resize-none px-2"
                            placeholder="Ceritakan pengalaman unik, tips perjalanan, atau info promo di sini..."
                          ></textarea>
                       </div>
                    </div>

                    {/* Right: Meta Settings */}
                    <div className="space-y-8">
                       <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                           <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Cover Image URL</label>
                              <div className="aspect-video bg-slate-200 rounded-3xl mb-4 overflow-hidden shadow-inner flex items-center justify-center text-slate-400 relative group cursor-pointer">
                                 {editingPost ? (
                                   <img src={editingPost.image} className="w-full h-full object-cover" alt="preview" />
                                 ) : (
                                   <i className="fa-regular fa-image text-4xl"></i>
                                 )}
                                 <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">Ganti Gambar</div>
                              </div>
                              <input type="url" className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-[10px] font-bold text-brand-600 focus:border-brand-600 outline-none" placeholder="https://..." />
                           </div>

                           <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Kategori</label>
                              <select className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 focus:border-brand-600 outline-none appearance-none cursor-pointer">
                                 <option>Panduan Wisata</option>
                                 <option>Kuliner Lokal</option>
                                 <option>Berita & Promo</option>
                              </select>
                           </div>
                       </div>

                       <div className="p-6 bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-900/20 space-y-6 text-white overflow-hidden relative">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                           <label className="block text-[10px] font-black text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <i className="fa-solid fa-square-rss"></i> SEO Optimization
                           </label>
                           
                           <div>
                              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">URL Slug</label>
                              <input type="text" className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-[10px] font-bold text-brand-300 focus:bg-white/10 outline-none" placeholder="judul-post-anda" />
                           </div>

                           <div>
                              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Meta Description</label>
                              <textarea rows={3} className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-[10px] font-bold text-slate-400 focus:bg-white/10 outline-none resize-none" placeholder="Tulis ringkasan untuk pencarian Google..."></textarea>
                           </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-white flex justify-between items-center group">
                 <button className="text-[10px] font-black uppercase tracking-widest text-red-500/40 group-hover:text-red-500 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-trash-can"></i> Hapus Draft
                 </button>
                 <div className="flex gap-3">
                    <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                    <button className="px-6 py-3 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">Simpan Draft</button>
                    <button className="px-10 py-4 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2">
                      <i className="fa-solid fa-paper-plane mr-1"></i> Publikasikan
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
