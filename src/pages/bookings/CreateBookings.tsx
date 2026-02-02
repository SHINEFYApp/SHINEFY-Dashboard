import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedTabs } from '../../components/booking/AnimatedTabs';
import { ProgressSteps } from '../../components/booking/ProgressSteps';
import type { BookingFormData, BookingPayload, BookingResponse } from '../../types/bookings';
import { createBackageBookingSteps, createBookingSteps, createBookingTabs } from '../../constants/data';
import StepsRender from './bookingSteps';
import { usePost } from '../../api/usePostData';
import { toast } from 'sonner';
import { SkeletonDemo } from '../../common/loader';
import { formDataInitialValues } from '../../constants/initialValues';
import { mutateBookingPackage, mutateBookingService } from './mutates';

const CreateBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = ['services', 'package'];
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [validatedSteps, setValidatedSteps] = useState<number[]>([]);
    const stepValidationRef = useRef<(() => Promise<boolean>) | null>(null);
    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'services';
    };
    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<BookingFormData>(formDataInitialValues);

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
        setFormData(formDataInitialValues)
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
    const updateStepValidation = async (stepNumber: number, isValid: boolean) => {
        if (isValid && !validatedSteps.includes(stepNumber)) {
            setValidatedSteps([...validatedSteps, stepNumber]);
        } else if (!isValid && validatedSteps.includes(stepNumber)) {
            setValidatedSteps(validatedSteps.filter((s) => s !== stepNumber));
        }
    };

    const baseURL = import.meta.env.VITE_API_URL;
    const { mutate, isPending, isSuccess, isError, error } = usePost<
        BookingResponse,
        BookingPayload
    >({
        route: `${baseURL}/api/book/create`,
        options: {
            onSuccess: (data) => console.log(data),
            onError: (err: any) => {
                console.log('API Error full response:', err);
                toast.error(err.response?.data?.message ?? err.message);
            },
        },
    });

    const vehicles_id = formData.vehicles.map((el) => el.vehicle_id)
    const extra_services = formData.extraServices.map(s => ({ id: s.id, quantity: s.quantity }))

    const handleSubmit = () => {
        if (activeTab === 'services') {
            mutate(mutateBookingService(formData, vehicles_id, extra_services))
        } else {
            mutate(mutateBookingPackage(formData, vehicles_id, extra_services))
        }
    };

    useEffect(() => {
        if (isError && error) {

            toast.error(error.message);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Sucessfuly Booking Service');
            setCurrentStep(1);
            setFormData(formDataInitialValues)
            setCompletedSteps([])
        }
    }, [isSuccess]);

    return (
        <main className=' relative'>
            {isPending &&
                <div className=' h-full w-full absolute top-0 left-0 z-500 bg-white'>
                    <SkeletonDemo quantity={30} />
                </div>
            }
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

                <div className="mt-8 ">
                    <StepsRender
                        onNext={handleNextStep}
                        onBack={handlePreviousStep}
                        onSubmit={handleSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        registerValidation={registerStepValidation}
                        onValidationChange={(isValid: boolean) => updateStepValidation(currentStep, isValid)}
                        userPackageInput={activeTab !== 'services'}
                        activeTab={activeTab}
                        currentStep={currentStep}
                    />
                </div>
            </div>
        </main>
    );
};

export default CreateBookings;
