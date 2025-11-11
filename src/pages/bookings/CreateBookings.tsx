import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedTabs } from '../../components/booking/AnimatedTabs';
import { ProgressSteps } from '../../components/booking/ProgressSteps';
import ServicesStep1 from '../../components/booking/tabs/services/steps/ServicesStep1';
import type { FormData } from '../../types/bookings';
import ServicesStep2 from '../../components/booking/tabs/services/steps/ServicesStep2';
import ServicesStep3 from '../../components/booking/tabs/services/steps/ServicesStep3';
import ServicesStep4 from '../../components/booking/tabs/services/steps/ServicesStep4';

const CreateBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const validTabs = ['services', 'package'];

    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'services';
    };

    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    const [currentStep, setCurrentStep] = useState<number>(1);

    // Form data stored in component state only
    const [formData, setFormData] = useState<FormData>({
        services: {
            phoneNumber: '',
            address: '',
            vehicle: '',
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

    // Sync tab with URL
    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams]);

    // Update URL with only tab parameter
    const updateURL = (tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    };

    // Handle tab change - reset to step 1
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setCurrentStep(1);
        updateURL(tabId);
    };

    // Step navigation
    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Update form data
    const updateFormData = (tab: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [tab]: {
                ...prev[tab as keyof FormData],
                ...data,
            },
        }));
    };

    const tabs = [
        { id: 'services', label: 'Services Booking' },
        { id: 'package', label: 'Package Booking' },
    ];

    const steps = [
        {
            title: 'Step One',
            description: 'Enter customer data',
        },
        {
            title: 'Step Two',
            description: 'Enter service data',
        },
        {
            title: 'Step Three',
            description: 'Payment Method',
        },
        {
            title: 'Step Four',
            description: 'Write notes',
        },
    ];
    const handleSubmit = () => {
        console.log('Final form data:', formData);
        alert('Booking submitted successfully!');
    };
    // Render content based on active tab and current step
    const renderStepContent = () => {
        if (activeTab === 'services') {
            switch (currentStep) {
                case 1:
                    return (
                        <ServicesStep1
                            onNext={handleNextStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                        />
                    );
                case 2:
                    return (
                        <ServicesStep2
                            onNext={handleNextStep}
                            onBack={handlePreviousStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                        />
                    );
                case 3:
                    return (
                        <ServicesStep3
                            onNext={handleNextStep}
                            onBack={handlePreviousStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                        />
                    );
                case 4:
                    return (
                        <ServicesStep4
                            onBack={handlePreviousStep}
                            onSubmit={handleSubmit}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                        />
                    );
                default:
                    return (
                        <ServicesStep1
                            onNext={handleNextStep}
                            formData={formData.services}
                            onDataChange={(data) => updateFormData('services', data)}
                        />
                    );
            }
        } else {
            // Package tab
            switch (currentStep) {
                case 1:
                    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <p>Package Step 1</p>
                    </div>;
                case 2:
                    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <p>Package Step 2</p>
                    </div>;
                case 3:
                    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <p>Package Step 3</p>
                    </div>;
                case 4:
                    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <p>Package Step 4</p>
                    </div>;
                default:
                    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <p>Package Step 1</p>
                    </div>;
            }
        }
    };

    return (
        <div className="w-full animate-fade-in">
            {/* Tabs */}
            <div className="mb-8">
                <AnimatedTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>

            {/* Progress Steps */}
            <ProgressSteps steps={steps} currentStep={currentStep} />

            {/* Step Content */}
            <div className="mt-8">{renderStepContent()}</div>
        </div>
    );
};

export default CreateBookings;
