import type { FC } from 'react';
import { cn } from '../../utils/utils';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
    steps: { title: string; description: string; }[];
    currentStep: number;
    completedSteps?: number[];
    validatedSteps?: number[]; // Steps that have valid data
    onStepClick?: (stepNumber: number) => void;
    className?: string;
}

export const ProgressSteps: FC<ProgressStepsProps> = ({
    steps,
    currentStep,
    completedSteps = [],
    validatedSteps = [],
    onStepClick,
    className,
}) => {
    return (
        <div className={cn('w-full py-8', className)}>
            <div className="flex items-start justify-between relative">
                {/* Background Line */}
                <div
                    className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"
                    style={{ left: '24px', right: '24px' }}
                />

                {/* Progress Line */}
                <div
                    className="absolute top-6 left-0 h-0.5 bg-[#4CAF50] transition-all duration-500 ease-out"
                    style={{
                        left: '24px',
                        width:
                            currentStep > 1
                                ? `calc((100% - 48px) * ${(currentStep - 1) / (steps.length - 1)})`
                                : '0%',
                    }}
                />

                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isCompleted = completedSteps.includes(stepNumber);

                    const isClickable =
                        stepNumber < currentStep ||
                        stepNumber === currentStep ||
                        (stepNumber === currentStep + 1 && validatedSteps.includes(currentStep));

                    return (
                        <div key={index} className="flex-1 relative z-10">
                            <div className={`flex flex-col ${index === steps.length - 1 ? 'items-end' : stepNumber === 1 ? 'items-start' : 'items-center'}`}>
                                {/* Circle Button */}
                                <button
                                    type="button"
                                    onClick={() => onStepClick?.(stepNumber)}
                                    disabled={!isClickable}
                                    className={cn(
                                        'w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-300 border-2',
                                        isCompleted
                                            ? 'bg-[#4CAF50] border-[#4CAF50] text-white'
                                            : isActive
                                                ? 'bg-white border-[#4CAF50] text-[#4CAF50]'
                                                : 'bg-white border-gray-300 text-gray-400',
                                        isClickable
                                            ? 'cursor-pointer hover:scale-110 hover:shadow-lg'
                                            : 'cursor-not-allowed'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-6 h-6" />
                                    ) : (
                                        stepNumber
                                    )}
                                </button>

                                {/* Step Text */}
                                <div className={`mt-4 ${index === steps.length - 1 ? 'text-end' : stepNumber === 1 ? 'text-start' : 'text-center'}`}>
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
