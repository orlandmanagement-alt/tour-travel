'use client';

import { useState, useEffect } from 'react';
import { Star, User, MessageSquare, ShieldCheck, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewSectionProps {
  tourId: string | number;
  averageRating: number;
  reviewCount: number;
}

export default function ReviewSection({ tourId, averageRating, reviewCount }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const fetchReviews = async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';
      const res = await fetch(`${API_BASE}/api/tours/${tourId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';
      const res = await fetch(`${API_BASE}/api/tours/${tourId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment
        }),
      });

      if (res.ok) {
        setNewReview({ name: '', rating: 5, comment: '' });
        setShowForm(false);
        fetchReviews();
      }
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="reviews" className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Guest Experiences</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Join over {reviewCount || 0} travelers who shared their journey.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5 transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-6">
              <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                {averageRating ? averageRating.toFixed(1) : '0.0'}
              </span>
              <div className="flex justify-center mt-2 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(averageRating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Global Rating</p>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-3">{rating}</span>
                    <Star className="w-3 h-3 fill-slate-400 text-slate-400" />
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 transition-all duration-1000" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 w-8">{Math.round(percentage)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50">
             <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mb-2">
               <ShieldCheck className="w-5 h-5" />
               <span>Verified Marketplace</span>
             </div>
             <p className="text-sm text-blue-600/80 dark:text-blue-400/80 leading-relaxed">
               All reviews are collected from travelers who have completed their trip with NusantaraTrip.
             </p>
          </div>
        </div>

        {/* Review List or Form */}
        <div className="lg:col-span-8">
          {showForm ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold mb-6">Share your experience</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star className={`w-8 h-8 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Story</label>
                  <textarea 
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                    placeholder="Tell us about your adventure..."
                  ></textarea>
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-10 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-6">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    <div className="flex-1 space-y-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    </div>
                  </div>
                ))
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="group pb-8 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:translate-x-1 transition-transform">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-500">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {review.customer_name}
                            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Traveler</span>
                          </h4>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-400">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-16">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-4 pl-16 mt-4">
                       <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors">
                         <ThumbsUp className="w-3.5 h-3.5" />
                         Helpful
                       </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No reviews yet</h4>
                  <p className="text-slate-500">Be the first to share your experience with this tour.</p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="mt-6 text-brand-primary font-bold hover:underline"
                  >
                    Post the first review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
