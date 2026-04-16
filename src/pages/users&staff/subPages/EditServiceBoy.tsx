import { Formik, Form, useField } from 'formik';
import { editServiceBoySchema } from '../../../constants/validationSchema';
import { addServiceBoyInitialValues } from '../../../constants/initialValues';
import { Button } from '../../../components/ui/button';
import { FormInput } from '../../../common/FormInput';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { useRef, useState, useEffect } from 'react';
import { useUpdateServiceBoy, useGetServiceBoyDetails } from "../../../api/features/serviceBoys.hooks";
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
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

// Custom File Upload Component
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
// Profile Image Upload Component
const ProfileImageUpload = ({ name, initialImage }: { name: string, initialImage?: string }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [, meta, helpers] = useField(name);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (initialImage) {
            setPreview(initialImage);
        }
    }, [initialImage]);

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0];
            helpers.setValue(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDelete = () => {
        helpers.setValue(null);
        setPreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='flex flex-col justify-center items-start mb-8'>
            <h1 className='font-bold capitalize'>Profile Image</h1>
            <p className='text-[#616161] pb-5'>Current avatar displayed on profile.</p>
            <div className='w-60 h-60 bg-[#B0B0B0] rounded-md overflow-hidden relative group'>
                {preview ? (
                    <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : null}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center ${preview ? 'opacity-0' : 'opacity-100'} group-hover:opacity-100 transition-opacity cursor-pointer`}
                >
                    <span className="text-white text-sm font-medium">{preview ? 'Change Photo' : 'Upload Photo'}</span>
                </div>
            </div>
            <div className='flex w-60 items-center py-5 gap-5'>
                <button type="button" onClick={handleDelete} className='text-[#B0B0B0]'>Delete</button>
                <button type="button" onClick={() => fileInputRef.current?.click()} className='text-[#FFC107]'>Update</button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleSelect}
                className="hidden"
                accept=".jpg,.png,.jpeg"
            />
            {meta.touched && meta.error && (
                <p className="text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
};

export default function EditServiceBoy() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: responseData, isLoading: isFetching } = useGetServiceBoyDetails(id as string);
    const serviceBoy = responseData?.data?.data || responseData?.data;

    const { mutateAsync: updateServiceBoy, isPending: isSubmitting } = useUpdateServiceBoy();

    const [formValues, setFormValues] = useState<any>(addServiceBoyInitialValues);

    useEffect(() => {
        if (serviceBoy) {
            setFormValues({
                name: serviceBoy.name || '',
                phoneNumber: serviceBoy.phone_number || '',
                password: '', // Should be empty initially
                confirmPassword: '',
                availableDays: serviceBoy.available_days || [],
                startHour: serviceBoy.start_hour || '',
                endHour: serviceBoy.end_hour || '',
                licenseExpiredDate: serviceBoy.licence_expiery_date || '',
                drivingLicense: null,
                idCardImage: null,
                image: null,
            });
        }
    }, [serviceBoy]);

    if (isFetching) {
        return <div className="p-10 text-center font-bold">Loading details for editing...</div>;
    }

    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Edit Service Boy Information</h1>
                <Formik
                    initialValues={formValues}
                    enableReinitialize={true}
                    validationSchema={editServiceBoySchema}
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

                            if (values.password && values.password.trim() !== "") {
                                formData.append('password', values.password);
                            }

                            // Images
                            if (values.drivingLicense) formData.append('driver_licence', values.drivingLicense);
                            if (values.idCardImage) formData.append('id_card_image', values.idCardImage);
                            if (values.image) formData.append('image', values.image);

                            await updateServiceBoy({ id: id as string, formData });

                            toast.success("Service Boy updated successfully");
                            queryClient.invalidateQueries({ queryKey: ["service-boys"] });
                            queryClient.invalidateQueries({ queryKey: ["service-boy-details", id] });
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
                                    <FormInput name="name" label="Name" placeholder="Name" type="text" />
                                    <FormInput name="phoneNumber" label="Phone Number" placeholder="Phone Number" type="tel" />
                                    <FormInput name="password" label="New Password (optional)" placeholder="Leave blank to keep same" type="password" />
                                    <FormInput name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" />

                                    <FormCheckboxDays name="availableDays" label="Available Days" />
                                    <FormTimePicker name="startHour" label="Start Hour" />
                                    <FormTimePicker name="endHour" label="End Hour" />
                                </div>

                                {/* Right Side - Profile Image and Documents */}
                                <div className="order-1 md:order-2 h-fit w-full flex flex-col items-center">
                                    <ProfileImageUpload name="image" initialImage={serviceBoy?.image_url} />

                                    {/* Documents Section */}
                                    <div className="w-full max-w-md space-y-6 pt-4 border-t border-gray-100">
                                        <CustomFileUpload name="drivingLicense" title="Driving License (Update Optional)" />

                                        <div className="max-w-md">
                                            <FormDatePicker name="licenseExpiredDate" label="License Expired Date" placeholder="Select Date" checkmark={false} />
                                        </div>

                                        <CustomFileUpload name="idCardImage" title="ID Card Image (Update Optional)" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 pt-4">
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all"
                                >
                                    {isSubmitting ? "Updating..." : "Update Service Boy"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
