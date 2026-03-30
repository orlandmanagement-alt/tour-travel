import React from 'react';

interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { title: 'Pesan', id: 1 },
    { title: 'Bayar', id: 2 }
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`flex items-center gap-1.5 ${currentStep >= step.id ? 'text-brand-primary' : 'text-slate-400 opacity-50'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] shadow-sm transition-all ${
              currentStep >= step.id ? 'bg-brand-primary text-white scale-110' : 'bg-slate-200 text-slate-500'
            }`}>
              {step.id}
            </span>
            <span>{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <i className="fa-solid fa-chevron-right text-[8px] opacity-30"></i>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
