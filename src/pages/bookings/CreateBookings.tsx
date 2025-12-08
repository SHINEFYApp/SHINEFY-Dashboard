import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedTabs } from '../../components/booking/AnimatedTabs';
import { ProgressSteps } from '../../components/booking/ProgressSteps';
import type { FormData } from '../../types/bookings';

// import { FindStep } from
import { createBackageBookingSteps, createBookingSteps, createBookingTabs } from '../../constants/data';
import { FindStep } from './bookingSteps';

const validTabs = ['services', 'package'];
const CreateBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [validatedSteps, setValidatedSteps] = useState<number[]>([]); // Track which steps are valid
    const stepValidationRef = useRef<(() => Promise<boolean>) | null>(null);

    const getValidTab = useCallback((): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'services';
    }, [searchParams]);

    const [activeTab, setActiveTab] = useState<string>(() => {
        const tabParam = searchParams.get('tab');
        return tabParam && ['services', 'package'].includes(tabParam) ? tabParam : 'services';
    });
    const [currentStep, setCurrentStep] = useState<number>(1);

    const StepComponent = FindStep(activeTab, currentStep);

    const [formData, setFormData] = useState<FormData>({
        services: {
            phoneNumber: '',
            address: '',
            vehicle: '',
            vehicles: [],
            bookingDate: '',
            bookingTime: '',
            mainService: '',
            extraServices: [],
            serviceBoy: '',
            coupon: '',
            paymentMethod: '',
            walletAmount: '',
            userNote: '',
            adminNotes: '',
        },
        package: {
            phoneNumber: '',
            address: '',
            vehicle: '',
            vehicles: [],
            bookingDate: '',
            bookingTime: '',
            mainPackage: '',
            mainService: '',
            extraServices: [],
            serviceBoy: '',
            userNote: '',
            adminNotes: '',
        },
    });

    const updateURL = useCallback((tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    }, [setSearchParams]);

    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams, getValidTab, updateURL]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setCurrentStep(1);
        setCompletedSteps([]);
        setValidatedSteps([]);
        updateURL(tabId);
    };

    const handleNextStep = async () => {
        if (stepValidationRef.current) {
            const isValid = await stepValidationRef.current();

            if (!isValid) {
                return;
            }
        }

        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }


        if (activeTab === 'package' && currentStep === 2) {
            setCurrentStep(currentStep + 2);
        }

    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }

        if (activeTab === 'package' && currentStep === 4) {
            setCurrentStep(currentStep - 2);
        }
    };

    const handleStepClick = async (stepNumber: number) => {
        if (stepNumber === currentStep) {
            return;
        }

        if (stepNumber < currentStep) {
            setCurrentStep(stepNumber);
            return;
        }

        // Check if the step is validated and ready to be clicked
        if (stepNumber === currentStep + 1 && validatedSteps.includes(currentStep)) {
            await handleNextStep();
            return;
        }
    };

    const registerStepValidation = (validationFn: () => Promise<boolean>) => {
        stepValidationRef.current = validationFn;
    };

    // Function to update step validation status
    const updateStepValidation = useCallback((stepNumber: number, isValid: boolean) => {
        setValidatedSteps((prev) => {
            if (isValid && !prev.includes(stepNumber)) {
                return [...prev, stepNumber];
            } else if (!isValid && prev.includes(stepNumber)) {
                return prev.filter((s) => s !== stepNumber);
            }
            return prev;
        });
    }, []);

    const handleValidationChange = useCallback((isValid: boolean) => {
        updateStepValidation(currentStep, isValid);
    }, [currentStep, updateStepValidation]);

    const updateFormData = useCallback((tab: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [tab]: {
                ...prev[tab as keyof FormData],
                ...data,
            },
        }));
    }, []);

    const handleDataChange = useCallback((data: any) => {
        updateFormData(activeTab === 'services' ? 'services' : 'package', data);
    }, [activeTab, updateFormData]);

    const handleRemoveVehicle = (vehicleId: string) => {
        const updatedVehicles = formData.services.vehicles.filter(
            (v) => v.id !== vehicleId
        );
        updateFormData('services', { vehicles: updatedVehicles });
    };

    const handleSubmit = () => {
        console.log('Final form data:', formData);
        alert('Booking submitted successfully!');
    };


    return (
        <div className="w-full animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
                <AnimatedTabs
                    tabs={createBookingTabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>

            {activeTab === 'services' && (
                <ProgressSteps
                    steps={createBookingSteps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    validatedSteps={validatedSteps}
                    onStepClick={handleStepClick}
                />
            )}

            {activeTab === 'package' && (
                <ProgressSteps
                    steps={createBackageBookingSteps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    validatedSteps={validatedSteps}
                    onStepClick={handleStepClick}
                />
            )}

            <div className="mt-8">
                <StepComponent
                    onNext={handleNextStep}
                    onBack={handlePreviousStep}
                    onSubmit={handleSubmit}
                    formData={activeTab === 'services' ? formData.services : formData.package}
                    onDataChange={handleDataChange}
                    onRemoveVehicle={handleRemoveVehicle}
                    registerValidation={registerStepValidation}
                    onValidationChange={handleValidationChange}
                    userPackageInput={activeTab !== 'services'}
                />
            </div>
        </div>
    );
};

export default CreateBookings;
