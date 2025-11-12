import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedTabs } from '../../components/booking/AnimatedTabs';
import { ProgressSteps } from '../../components/booking/ProgressSteps';
import type { FormData } from '../../types/bookings';
import ServicesStep1 from '../../components/booking/tabs/services/steps/ServicesStep1';
import ServicesStep2 from '../../components/booking/tabs/services/steps/ServicesStep2';
import ServicesStep3 from '../../components/booking/tabs/services/steps/ServicesStep3';
import ServicesStep4 from '../../components/booking/tabs/services/steps/ServicesStep4';
import { createBookingSteps, createBookingTabs } from '../../constants/data';

const CreateBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = ['services', 'package'];

    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [validatedSteps, setValidatedSteps] = useState<number[]>([]); // Track which steps are valid
    const stepValidationRef = useRef<(() => Promise<boolean>) | null>(null);

    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'services';
    };

    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    const [currentStep, setCurrentStep] = useState<number>(1);

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
        package: {},
    });

    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams]);

    const updateURL = (tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    };

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
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
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
    const updateStepValidation = async (stepNumber: number, isValid: boolean) => {
        if (isValid && !validatedSteps.includes(stepNumber)) {
            setValidatedSteps([...validatedSteps, stepNumber]);
        } else if (!isValid && validatedSteps.includes(stepNumber)) {
            setValidatedSteps(validatedSteps.filter((s) => s !== stepNumber));
        }
    };

    const updateFormData = (tab: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [tab]: {
                ...prev[tab as keyof FormData],
                ...data,
            },
        }));
    };

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

    const renderStepContent = () => {
        if (activeTab === 'services') {
            switch (currentStep) {
                case 1:
                    return (
                        <ServicesStep1
                            onNext={handleNextStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                            onRemoveVehicle={handleRemoveVehicle}
                            registerValidation={registerStepValidation}
                            onValidationChange={(isValid) => updateStepValidation(1, isValid)}
                        />
                    );
                case 2:
                    return (
                        <ServicesStep2
                            onNext={handleNextStep}
                            onBack={handlePreviousStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                            registerValidation={registerStepValidation}
                            onValidationChange={(isValid) => updateStepValidation(2, isValid)}
                        />
                    );
                case 3:
                    return (
                        <ServicesStep3
                            onNext={handleNextStep}
                            onBack={handlePreviousStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                            registerValidation={registerStepValidation}
                            onValidationChange={(isValid) => updateStepValidation(3, isValid)}
                        />
                    );
                case 4:
                    return (
                        <ServicesStep4
                            onBack={handlePreviousStep}
                            onSubmit={handleSubmit}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                            registerValidation={registerStepValidation}
                            onValidationChange={(isValid) => updateStepValidation(4, isValid)}
                        />
                    );
                default:
                    return (
                        <ServicesStep1
                            onNext={handleNextStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                            onRemoveVehicle={handleRemoveVehicle}
                            registerValidation={registerStepValidation}
                            onValidationChange={(isValid) => updateStepValidation(1, isValid)}
                        />
                    );
            }
        } else {
            switch (currentStep) {
                case 1:
                    return (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <p>Package Step 1</p>
                        </div>
                    );
                default:
                    return (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <p>Package Step 1</p>
                        </div>
                    );
            }
        }
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

            <div className="mt-8">{renderStepContent()}</div>
        </div>
    );
};

export default CreateBookings;
