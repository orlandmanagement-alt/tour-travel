import React from 'react';

interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { title: 'Customer Info', id: 1 },
    { title: 'Add-ons & Pax', id: 2 },
    { title: 'Payment', id: 3 }
  ];

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary z-0 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center group">
            <div 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-4 border-slate-50 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/30' 
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {currentStep > step.id ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span className={`absolute top-14 sm:top-16 text-[10px] sm:text-xs font-bold text-center w-24 sm:w-32 transition-colors ${
              currentStep >= step.id ? 'text-brand-primary' : 'text-slate-400'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
