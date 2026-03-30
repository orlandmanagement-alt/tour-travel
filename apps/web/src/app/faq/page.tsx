'use client';

import { useState } from 'react';

const faqCategories = [
  {
    title: 'Booking & Payment',
    faqs: [
      { q: "How do I book a tour package?", a: "You can book directly through our website by selecting your desired package, choosing dates and participants, and completing the checkout process. Alternatively, you can book via WhatsApp." },
      { q: "What payment methods are accepted?", a: "We currently accept manual bank transfers via BCA. More payment gateways including credit cards and e-wallets will be added soon." },
      { q: "Do I have to pay the full amount upfront?", a: "For one-day trips, full payment is required. For multi-day trips and custom tours, a 30% down payment is required to secure your booking, with the rest payable on arrival." }
    ]
  },
  {
    title: 'Tour Preparation',
    faqs: [
      { q: "What should I bring for the Bromo Sunrise Tour?", a: "It gets very cold (around 5-10°C). Bring a thick jacket, gloves, a beanie, a face mask (for ash), comfortable trekking shoes, and a camera." },
      { q: "Is the Ijen Crater hike difficult?", a: "The hike takes about 1.5 to 2 hours ascending. It requires a moderate fitness level. A local guide and gas masks are provided for your safety." },
      { q: "Can I bring children?", a: "Yes, many of our tours are family-friendly. However, extreme hikes like Ijen Blue Fire are not recommended for children under 7 years old or pregnant women." }
    ]
  },
  {
    title: 'Cancellations & Refunds',
    faqs: [
      { q: "What is your cancellation policy?", a: "Cancellations made 7+ days before departure are eligible for a 50% refund. Cancellations within 7 days are non-refundable but can be rescheduled (subject to availability)." },
      { q: "What if the trip is canceled due to weather?", a: "Safety is our priority. If natural forces (volcanic activity, extreme weather) force a cancellation, we will offer a full refund or a free reschedule." }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string>('0-0');

  const toggleAccordion = (catIndex: number, faqIndex: number) => {
    const key = `${catIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? '' : key);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Can't find the answer you're looking for? Reach out to our customer support team.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {faqCategories.map((category, catIndex) => (
          <div key={catIndex} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
             <h2 className="text-2xl font-bold text-brand-primary mb-6">{category.title}</h2>
             
             <div className="space-y-4">
               {category.faqs.map((faq, faqIndex) => {
                 const isOpen = openIndex === `${catIndex}-${faqIndex}`;
                 return (
                   <div key={faqIndex} className="border-b last:border-0 border-slate-200 dark:border-slate-700 pb-4 last:pb-0">
                     <button 
                       onClick={() => toggleAccordion(catIndex, faqIndex)}
                       className="w-full flex justify-between items-center py-2 text-left outline-none group"
                     >
                       <span className="text-slate-800 dark:text-slate-200 font-semibold text-lg group-hover:text-brand-primary transition-colors">
                         {faq.q}
                       </span>
                       <span className="ml-4 flex-shrink-0 text-slate-400">
                         {isOpen ? (
                           <svg className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
                           </svg>
                         ) : (
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                           </svg>
                         )}
                       </span>
                     </button>
                     
                     <div 
                       className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                     >
                       <p className="text-slate-600 dark:text-slate-400 leading-relaxed pr-8">
                         {faq.a}
                       </p>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="bg-brand-primary/10 dark:bg-brand-primary/20 inline-block p-8 rounded-3xl max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Our travel experts are ready to help you 24/7 via WhatsApp.</p>
          <a 
            href="https://wa.me/6281234567890" target="_blank"
            className="inline-flex items-center px-8 py-4 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1"
          >
            <span className="mr-2 text-xl">💬</span>
            Chat with Support
          </a>
        </div>
      </div>

    </div>
  );
}
