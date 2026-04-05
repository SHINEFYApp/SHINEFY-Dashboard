import { Formik, Form, useField } from 'formik';
import { addServiceBoySchema } from '../../../constants/validationSchema';
import { addServiceBoyInitialValues } from '../../../constants/initialValues';
import { Button } from '../../../components/ui/button';
import { FormInput } from '../../../common/FormInput';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { useRef, useState } from 'react';
import { useAddServiceBoy } from "../../../api/features/serviceBoys.hooks";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";

const FormCheckboxDays = ({ name, label }: { name: string, label: string }) => {
    const [field, meta, helpers] = useField<string[]>(name);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const toggleDay = (day: string) => {
        const currentDays = field.value || [];
        if (currentDays.includes(day)) {
            helpers.setValue(currentDays.filter(d => d !== day));
        } else {
            helpers.setValue([...currentDays, day]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">{label}</label>
            <div className="flex flex-wrap gap-2 mt-2">
                {days.map((day) => {
                    const isSelected = (field.value || []).includes(day);
                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors border ${
                                isSelected 
                                    ? 'bg-black text-white border-black' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
            {meta.touched && meta.error && (
                <p className="text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
};

// Custom File Upload Component to match the design
const CustomFileUpload = ({ name, title }: { name: string, title: string; }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [, meta, helpers] = useField(name);
    const [fileName, setFileName] = useState<string>("");

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            helpers.setValue(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">
                Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
            </p>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Browse Files
                </button>
                {fileName && <span className="text-sm text-gray-700">{fileName}</span>}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleSelect}
                className="hidden"
                accept=".jpg,.png,.pdf"
            />
            {meta.touched && meta.error && (
                <p className="text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
};


export default function AddServiceBoy() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: addServiceBoy, isPending: isSubmitting } = useAddServiceBoy();

    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Enter Service Boy information</h1>
                <Formik
                    initialValues={addServiceBoyInitialValues}
                    validationSchema={addServiceBoySchema}
                    onSubmit={async (values) => {
                        try {
                            const formData = new FormData();
                            formData.append('name', values.name);
                            formData.append('phone_number', values.phoneNumber);
                            formData.append('address', 'Default Address');
                            formData.append('licence_expiery_date', values.licenseExpiredDate);
                            (values.availableDays || []).forEach((day: string) => {
                                formData.append('available_days[]', day);
                            });
                            formData.append('start_hour', values.startHour);
                            formData.append('end_hour', values.endHour);
                            formData.append('latitude', '0.0');
                            formData.append('longitude', '0.0');
                            if (values.password) formData.append('password', values.password);

                            // Images
                            if (values.drivingLicense) formData.append('driver_licence', values.drivingLicense);
                            if (values.idCardImage) formData.append('id_card_image', values.idCardImage);

                            await addServiceBoy(formData);

                            toast.success("Service Boy added successfully");
                            queryClient.invalidateQueries({ queryKey: ["service-boys"] });
                            navigate('/users&staff/manage/ServiceBoy');

                        } catch (error: any) {
                            console.error(error);
                        }
                    }}
                >
                    {({ isValid }) => (
                        <Form className="space-y-8">
                            {/* Top Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 grid-flow-dense">
                                {/* Left Side - Form Fields */}
                                <div className="order-2 md:order-1 grid grid-cols-1 gap-6">
                                    <FormInput
                                        name="name"
                                        label="Name"
                                        placeholder="Name"
                                        type="text"
                                    />
                                    <FormInput
                                        name="phoneNumber"
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                        type="tel"
                                    />
                                    <FormInput
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                    <FormInput
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />

                                    <FormCheckboxDays
                                        name="availableDays"
                                        label="Available Days"
                                    />
                                    <FormTimePicker
                                        name="startHour"
                                        label="Start Hour"
                                    />
                                    <FormTimePicker
                                        name="endHour"
                                        label="End Hour"
                                    />
                                </div>

                                {/* Right Side - Profile Image and Documents */}
                                <div className="order-1 md:order-2 h-fit w-full flex flex-col items-center">
                                    <div className='flex flex-col justify-center items-start mb-8'>
                                        <h1 className='font-bold capitalize'>your profile</h1>
                                        <p className='text-[#616161] pb-5'>This will be displayed on your profile.</p>
                                        <div className='w-60 h-60 bg-[#B0B0B0] rounded-md'>
                                            {/* Image preview would go here */}
                                        </div>
                                        <div className='flex w-60 items-center py-5 gap-5'>
                                            <button type="button" className='text-[#B0B0B0]'>Delete</button>
                                            <button type="button" className='text-[#FFC107]'>Update</button>
                                        </div>
                                    </div>

                                    {/* Documents Section moved here */}
                                    <div className="w-full max-w-md space-y-6 pt-4 border-t border-gray-100">
                                        <CustomFileUpload
                                            name="drivingLicense"
                                            title="Driving License"
                                        />

                                        <div className="max-w-md">
                                            <FormDatePicker
                                                name="licenseExpiredDate"
                                                label="License Expired Date"
                                                placeholder="Select Date"
                                                checkmark={false}
                                            />
                                        </div>

                                        <CustomFileUpload
                                            name="idCardImage"
                                            title="ID Card Image(Optional)"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 pt-4">
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}