interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { number: 1, label: 'Customer Info' },
    { number: 2, label: 'Review & Payment' },
    { number: 3, label: 'Success' },
  ];

  return (
    <div className="w-full py-6 mb-8">
      <div className="flex justify-between items-center max-w-2xl mx-auto relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full z-0"></div>
        
        {/* Active Line (Progress) */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary rounded-full z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 shadow-md ${
                  isActive || isCompleted 
                    ? 'bg-brand-primary text-white scale-110' 
                    : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-600'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className={`absolute -bottom-6 text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive ? 'text-brand-primary' : isCompleted ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
