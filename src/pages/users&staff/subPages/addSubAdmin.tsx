import { Formik, Form, useField } from 'formik';
import { addSubAdminSchema } from '../../../constants/validationSchema';
import { addSubAdminInitialValues } from '../../../constants/initialValues';
import { Button } from '../../../components/ui/button';
import { FormInput } from '../../../common/FormInput';
import { useEffect, useState, useRef } from 'react';
import type { smsStatus } from '../../../types/common';
import type { manageSubadmin } from '../../../types/users&staff';
import { FormDropdown } from '../../../common/FormDropdown';
import { useAddSubAdmin, useUploadSubAdminImage } from "../../../api/features/subAdmins.hooks";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";

// Reuse CustomFileUpload from AddServiceBoy or generic
const CustomFileUpload = ({ name, title, accept = ".jpg,.png,.jpeg" }: { name: string, title: string; accept?: string }) => {
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
                accept={accept}
            />
            {meta.touched && meta.error && (
                <p className="text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
};

export default function AddSubAdmin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutateAsync: addSubAdmin, isPending: isAdding } = useAddSubAdmin();
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadSubAdminImage();

    const isSubmitting = isAdding || isUploading;

    const [receiveSmsStatus, setReceiveSmsStatus] = useState<smsStatus>({
        status: true,
        isSms: false
    });

    const [formData, setFormData] = useState<manageSubadmin>({
        name: '',
        phoneNumber: '',
        isSms: false,
        email: '',
        password: '',
        confirmPassword: '',
        privileges: []
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, isSms: receiveSmsStatus.isSms }));
    }, [receiveSmsStatus.isSms]);

    // Mapping for privileges: assumes API expects [1, 2, 3] etc.
    // Map dropdown strings to numbers.
    // If multiple selection is needed, dropdown might change. Postman shows explicit array.
    // Currently FormDropdown is single select?
    const privilegeMap: Record<string, number> = {
        'Admin': 1,
        'Editor': 2,
        'Viewer': 3
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Enter Sub Admin information</h1>
                <Formik
                    initialValues={{ ...addSubAdminInitialValues, image: null }}
                    validationSchema={addSubAdminSchema}
                    onSubmit={async (values) => {
                        try {
                            const selectedPrivilege = String(values.privileges); // Usually string from dropdown
                            // Map string to array of number? format: [1, 2, 3]
                            // The user might want multi-select but UI is single select drop.
                            // I'll wrap the single mapped value in array.
                            const privId = privilegeMap[selectedPrivilege] || 1; // Default to 1 if unknown

                            const payload = {
                                name: values.name,
                                email: values.email,
                                phone_number: values.phoneNumber,
                                previlages: [privId], // Wrap in array as per Postman
                                receive_sms: receiveSmsStatus.isSms,
                                password: values.password,
                                password_confirmation: values.confirmPassword
                            };

                            const response = await addSubAdmin(payload);
                            const newId = response?.data?.id || response?.data?.data?.id;

                            if (newId && values.image) {
                                const formData = new FormData();
                                formData.append('image', values.image);
                                await uploadImage({ id: newId, formData });
                            }

                            toast.success("Sub Admin added successfully");
                            queryClient.invalidateQueries({ queryKey: ["sub-admins"] });
                            navigate('/users&staff/manageSubAdmin');

                        } catch (error: any) {
                            console.error(error);
                            toast.error(error?.response?.data?.message || "Failed to add Sub Admin");
                        }
                    }}
                >
                    {({ isValid }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 grid-flow-dense">
                                <div className="order-2 md:order-1 grid grid-cols-1 gap-6 mb-8">
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
                                        receiveSms={receiveSmsStatus}
                                        setReceiveSms={setReceiveSmsStatus}
                                    />

                                    <FormInput
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
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
                                </div>
                                <div className="order-1 md:order2 h-fit w-full flex justify-center">
                                    <div className=' flex flex-col justify-center items-start'>
                                        <h1 className='font-bold capitalize'>your profile</h1>
                                        <p className='text-[#616161] pb-5'>This will be displayed on your profile.</p>
                                        <div className='w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mb-4'>
                                            {/* Image Input */}
                                            <CustomFileUpload name="image" title="Profile Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormDropdown
                                name="privileges"
                                label="Privileges"
                                placeholder="Select Privileges"
                                options={['Admin', 'Editor', 'Viewer']}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
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