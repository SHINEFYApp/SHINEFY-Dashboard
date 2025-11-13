import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IoCarSportOutline, IoPeopleOutline } from 'react-icons/io5';
import { FormDropdown } from '../../../../../common/FormDropdown';
import { Button } from '../../../../ui/button';
import type { ServicesStep2Props } from '../../../../../types/bookings';
import { availableExtraServices } from '../../../../../constants/data';
import { Package } from 'lucide-react';

const ServicesStep2 = ({ onNext, onBack, userPackageInput , formData, onDataChange }: ServicesStep2Props) => {

    const validationSchema = Yup.object({
        mainService: Yup.string().required('Please select a service'),
        mainPackage: Yup.string().required('Please select a package'),
        serviceBoy: Yup.string().required('Please select a service boy'),
    });

    const handleQuantityChange = (serviceId: string, newQuantity: number) => {
        const existingServices = formData.extraServices || [];
        const serviceIndex = existingServices.findIndex((s) => s.id === serviceId);

        if (serviceIndex >= 0) {
            // Update existing service quantity
            const updated = [...existingServices];
            if (newQuantity <= 0) {
                // Remove service if quantity is 0
                updated.splice(serviceIndex, 1);
            } else {
                updated[serviceIndex].quantity = newQuantity;
            }
            onDataChange({ extraServices: updated });
        } else if (newQuantity > 0) {
            // Add new service
            const service = availableExtraServices.find((s) => s.id === serviceId);
            if (service) {
                onDataChange({
                    extraServices: [
                        ...existingServices,
                        { id: serviceId, name: service.name, quantity: newQuantity },
                    ],
                });
            }
        }
    };

    const getQuantity = (serviceId: string): number => {
        const service = formData.extraServices?.find((s) => s.id === serviceId);
        return service?.quantity || 0;
    };

    console.log(formData)

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    mainService: formData.mainService || '',
                    mainPackage: formData.mainPackage || '',
                    serviceBoy: formData.serviceBoy || '',
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    onDataChange(values);
                    onNext();
                }}
            >
                {({ isValid }) => (
                    <Form>
                        

                        <div className={`mb-8 ${userPackageInput ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ' md:w-1/2 w-full'}`}>
                        {/* user packages Selection */}
                            {userPackageInput &&
                                <FormDropdown
                                    name="mainPackage"
                                    label="User Packages"
                                    placeholder="Select User Package"
                                    icon={<Package className="w-5 h-5" />}
                                    options={[
                                        'package one',
                                        'package two',
                                        'package three',
                                        'package four',
                                    ]}
                                />
                            }
                        {/* Main Services Selection */}
                            <FormDropdown
                                name="mainService"
                                label="Services"
                                placeholder="Select Services"
                                className='w-full'
                                icon={<IoCarSportOutline className="w-5 h-5" />}
                                options={[
                                    'Full Car Wash',
                                    'Interior Cleaning',
                                    'Exterior Wash',
                                    'Premium Detailing',
                                ]}
                            />
                        </div>

                        {/* Extra Services */}
                        <div className="space-y-6 mb-8">
                            {availableExtraServices.map((service) => {
                                const quantity = getQuantity(service.id);
                                return (
                                    <div key={service.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Service Name */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Extra Services
                                            </label>
                                            <div className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-600">
                                                {service.name}
                                            </div>
                                        </div>

                                        {/* Quantity Input */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Qty
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            service.id,
                                                            parseInt(e.target.value) || 0
                                                        )
                                                    }
                                                    className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3.5 pr-12 text-sm font-medium transition-all duration-200 border-gray-200`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Services Boy Selection */}
                        <div className="mb-8  md:w-1/2 w-full">
                            <FormDropdown
                                name="serviceBoy"
                                label="Services Boy"
                                placeholder="Select Services Boy"
                                icon={<IoPeopleOutline className="w-5 h-5" />}
                                options={[
                                    'Ahmed Mohamed',
                                    'Mohamed Ali',
                                    'Khaled Hassan',
                                    'Omar Youssef',
                                ]}
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200"
                            >
                                Back
                            </button>
                            <Button
                                type="submit"
                                disabled={!isValid}
                                className="flex-1 md:flex-none bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Next
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ServicesStep2;
