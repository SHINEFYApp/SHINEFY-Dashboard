import { useState } from 'react';
import { Formik, Form } from 'formik';
import { servicesStep3Schema } from '../../../../../constants/validationSchema';
import { servicesStep3InitialValues } from '../../../../../constants/initialValues';
import { FormDropdown } from '../../../../../common/FormDropdown';
import { Button } from '../../../../ui/button';
import { IoTicketOutline, IoWalletOutline } from 'react-icons/io5';
import { cn } from '../../../../../utils/utils';
import type { ServicesStep3Props } from '../../../../../types/bookings';
import { paymentMethods } from '../../../../../constants/data';

const ServicesStep3 = ({ onNext, onBack, formData, onDataChange }: ServicesStep3Props) => {
    const [selectedPayment, setSelectedPayment] = useState<string>(formData.paymentMethod || '');




    const handlePaymentSelect = (method: string, setFieldValue: any) => {
        setSelectedPayment(method);
        setFieldValue('paymentMethod', method);
        onDataChange({ paymentMethod: method as any });
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    ...servicesStep3InitialValues,
                    coupon: formData.coupon || servicesStep3InitialValues.coupon,
                    paymentMethod: formData.paymentMethod || servicesStep3InitialValues.paymentMethod,
                    walletAmount: formData.walletAmount || servicesStep3InitialValues.walletAmount,
                }}
                validationSchema={servicesStep3Schema}
                enableReinitialize
                onSubmit={(values) => {
                    onDataChange(values as any);
                    onNext();
                }}
            >
                {({ isValid, setFieldValue }) => (
                    <Form>
                        {/* Coupon Selection */}
                        <div className="mb-8 md:w-1/2 w-full">
                            <FormDropdown
                                name="coupon"
                                label="Coupon"
                                placeholder="Select Coupon"
                                icon={<IoTicketOutline className="w-5 h-5" />}
                                options={[
                                    'SAVE10',
                                    'SAVE20',
                                    'SAVE30',
                                    'FIRSTTIME',
                                    'SUMMER2025',
                                ]}
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <label className="text-base font-bold text-gray-900 mb-4 block">
                                Payment Method
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => handlePaymentSelect(method.id, setFieldValue)}
                                        className={cn(
                                            'flex items-center gap-3 px-6 py-4 rounded-2xl border-2 font-bold text-base transition-all duration-200 hover:shadow-md',
                                            selectedPayment === method.id
                                                ? 'border-primary bg-primary/10 text-gray-900'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        )}
                                    >
                                        <img src={method.icon} alt={method.label} />
                                        <span>{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Wallet Amount */}
                        <div className="mb-8 md:w-1/2 w-full">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Wallet Amount
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IoWalletOutline className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="walletAmount"
                                    placeholder="Wallet Amount"
                                    disabled
                                    onChange={(e) => {
                                        setFieldValue('walletAmount', e.target.value);
                                        onDataChange({ walletAmount: e.target.value });
                                    }}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3.5 pl-12 text-sm font-medium text-gray-400 cursor-not-allowed"
                                />
                            </div>
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

export default ServicesStep3;
