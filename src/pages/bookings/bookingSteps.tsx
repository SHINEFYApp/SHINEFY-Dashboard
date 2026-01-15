import ServicesStep1 from "../../components/booking/tabs/services/steps/ServicesStep1";
import ServicesStep2 from "../../components/booking/tabs/services/steps/ServicesStep2";
import ServicesStep3 from "../../components/booking/tabs/services/steps/ServicesStep3";
import ServicesStep4 from "../../components/booking/tabs/services/steps/ServicesStep4";
import type { stepsProps } from "../../types/bookings";


export default function StepsRender({
  activeTab,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  formData,
  setFormData,
  registerValidation,
  onValidationChange,
  userPackageInput,
}: stepsProps) {
    const steps = [
        {
            id: 1,
            render: () => (
                <ServicesStep1
                    onNext={onNext}
                    onBack={onBack}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    registerValidation={registerValidation}
                    onValidationChange={onValidationChange}
                    userPackageInput={false}        
                />
            ),
        },
        {
            id: 2,
            render: () => (
                <ServicesStep2
                    onNext={onNext}
                    onBack={onBack}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    registerValidation={registerValidation}
                    onValidationChange={onValidationChange}
                    userPackageInput={userPackageInput}
                />
            ),
        },
        {
            id: 3,
            render: () => (
                <ServicesStep3
                    onNext={onNext}
                    onBack={onBack}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    registerValidation={registerValidation}
                    onValidationChange={onValidationChange}
                    userPackageInput={userPackageInput}
                />
            ),
        },
        {
            id: 4,
            render: () => (
                <ServicesStep4
                    onNext={onNext}
                    onBack={onBack}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    registerValidation={registerValidation}
                    onValidationChange={onValidationChange} 
                    userPackageInput={false}
                />
            ),
        },
    ];

    const stepToRender =
        activeTab === "services"
        ? steps.find((el) => el.id === currentStep)
        : steps.filter((el) => el.id !== 3).find((el) => el.id === currentStep);

    return stepToRender?.render() ?? <ServicesStep1 userPackageInput={false} {...{ onNext, onBack, onSubmit, formData, setFormData, registerValidation, onValidationChange }} />;
}
