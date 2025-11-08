import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { FormInput } from '../../../../common/FormInput';
import { FormDropdown } from '../../../../common/FormDropdown';
import { FormDatePicker } from '../../../../common/FormDatePicker';
import { FormTimePicker } from '../../../../common/FormTimePicker';
import { Button } from '../../../../components/ui/button';
import addVehicle from '../../../../assets/addVehicle.svg';
import type { ServicesStep1Props } from '../../../../types/bookings';

const ServicesStep1 = ({ onNext, formData, onDataChange }: ServicesStep1Props) => {
    const validationSchema = Yup.object({
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
            .required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        bookingDate: Yup.string().required('Booking date is required'),
        bookingTime: Yup.string().required('Booking time is required'),
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-scale-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Services Step 1 values:', values);
                    onDataChange(values);
                    onNext();
                }}
            >
                {({ isValid, dirty }) => {
                    return (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    name="phoneNumber"
                                    label="User phone number"
                                    placeholder="User phone number"
                                    type="tel"
                                    icon={<IoCallOutline className="w-5 h-5" />}
                                />

                                <FormDropdown
                                    name="address"
                                    label="Address"
                                    placeholder="Select Address"
                                    icon={<IoLocationOutline className="w-5 h-5" />}
                                    options={[
                                        'Cairo',
                                        'Alexandria',
                                        'Giza',
                                        'New Cairo',
                                        'Maadi',
                                        'Al Shorouk City',
                                    ]}
                                />
                            </div>

                            <div className="mb-8">
                                <label className="text-sm font-medium text-gray-700 mb-3 block">
                                    Select Vehicle
                                </label>
                                <div className="relative">
                                    <div className="w-full md:w-80 h-56 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group">
                                        <img src={addVehicle} alt="add vehicle" className='size-52' />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDatePicker
                                    name="bookingDate"
                                    label="Select Booking Date"
                                    placeholder="07.12.195"
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />

                                <FormTimePicker
                                    name="bookingTime"
                                    label="Select Booking Time"
                                    placeholder="09:00"
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                            </div>

                            <div className="flex justify-start">
                                <Button
                                    type="submit"
                                    disabled={!(isValid && dirty)}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ServicesStep1;
