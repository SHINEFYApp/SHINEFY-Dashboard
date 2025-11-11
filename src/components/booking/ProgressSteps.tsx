import type { FC } from 'react';
import { cn } from '../../utils/utils';
import type { ProgressStepsProps } from '../../types/common';


export const ProgressSteps: FC<ProgressStepsProps> = ({
    steps,
    currentStep,
    className,
}) => {
    return (
        <div className={cn('w-full py-8', className)}>
            <div className="flex items-start justify-between relative">
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" style={{ left: '24px', right: '24px' }} />

                <div
                    className="absolute top-6 left-0 h-0.5 bg-green-500 transition-all duration-500 ease-out"
                    style={{
                        left: '24px',
                        width: currentStep > 1 ? `calc((100% - 48px) * ${(currentStep - 1) / (steps.length - 1)})` : '0%'
                    }}
                />

                {steps.map((step, index) => {
                    const isActive = currentStep === index + 1;
                    const isCompleted = currentStep > index + 1;

                    return (
                        <div key={index} className="flex-1 relative z-10">
                            {/* Step content */}
                            <div className="flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className={cn(
                                        'w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-300 border-2 bg-white',
                                        isActive
                                            ? 'border-green-500 text-green-500'
                                            : isCompleted
                                                ? 'border-green-500 text-green-500'
                                                : 'border-gray-300 text-gray-400'
                                    )}
                                >
                                    {index + 1}
                                </div>

                                <div className="mt-4 text-center">
                                    <p
                                        className={cn(
                                            'text-base font-bold mb-1 transition-colors duration-200',
                                            isActive || isCompleted
                                                ? 'text-gray-900'
                                                : 'text-gray-300'
                                        )}
                                    >
                                        {step.title}
                                    </p>
                                    <p
                                        className={cn(
                                            'text-sm transition-colors duration-200',
                                            isActive || isCompleted
                                                ? 'text-gray-600'
                                                : 'text-gray-300'
                                        )}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};