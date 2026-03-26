import { Formik, Form, useField } from 'formik';
import { editSubAdminSchema } from '../../../constants/validationSchema';
import { Button } from '../../../components/ui/button';
import { FormInput } from '../../../common/FormInput';
import { useState, useRef, useEffect } from 'react';
import type { smsStatus } from '../../../types/common';
import { useGetSubAdminDetails, useUpdateSubAdmin, useUploadSubAdminImage } from "../../../api/features/subAdmins.hooks";
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
import DropDownAndSelect from '../../../common/dropDownAndSelect';
import { menus } from '../../../constants/data';
import { Skeleton } from '../../../components/ui/skeleton';

const CustomFileUpload = ({ name, title, accept = ".jpg,.png,.jpeg", initialImage }: { name: string, title: string; accept?: string; initialImage?: string }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [, meta, helpers] = useField(name);
    const [fileName, setFileName] = useState<string>("");
    const [preview, setPreview] = useState<string>(initialImage || "");

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0];
            helpers.setValue(file);
            setFileName(file.name);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <div className="flex flex-col items-center gap-4">
                <div className='w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mb-4 relative group'>
                    {preview ? (
                        <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        <span className="text-white text-sm font-medium">Change Photo</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Browse Files
                    </button>
                    {fileName && <span className="text-sm text-gray-700 truncate max-w-[150px]">{fileName}</span>}
                </div>
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

export default function EditSubAdmin() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { data: subAdminResponse, isLoading: isLoadingDetails } = useGetSubAdminDetails(id || "");
    const { mutateAsync: updateSubAdmin, isPending: isUpdating } = useUpdateSubAdmin();
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadSubAdminImage();

    const [receiveSmsStatus, setReceiveSmsStatus] = useState<smsStatus>({
        status: true,
        isSms: false
    });

    const [selectedPrivileges, setSelectedPrivileges] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (subAdminResponse?.data) {
            const data = subAdminResponse.data;
            setReceiveSmsStatus(prev => ({ ...prev, isSms: !!data.receive_sms }));
            
            // Map previlages (number[] or string "1,2,3") to selectedPrivileges (Record<string, string[]>)
            if (data.previlages) {
                const mapped: Record<string, string[]> = {};
                let privArray: any[] = [];
                
                if (Array.isArray(data.previlages)) {
                    privArray = data.previlages;
                } else if (typeof data.previlages === 'string') {
                    privArray = data.previlages.split(',').map((s: string) => s.trim()).filter(Boolean);
                }

                privArray.forEach((priv: any) => {
                    const privKey = Number(priv);
                    const menu = menus.find(m => m.Key === privKey);
                    if (menu) {
                        mapped[menu.title] = [...menu.options];
                    }
                });
                setSelectedPrivileges(mapped);
            }
        }
    }, [subAdminResponse]);

    const isSubmitting = isUpdating || isUploading;

    if (isLoadingDetails) {
        return (
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl space-y-8">
                <Skeleton className="h-8 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Skeleton className="h-[58px] w-full" />
                        <Skeleton className="h-[58px] w-full" />
                        <Skeleton className="h-[58px] w-full" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-60 w-60 rounded-md" />
                    </div>
                </div>
            </div>
        );
    }

    const initialValues = {
        name: subAdminResponse?.data?.name || '',
        phoneNumber: subAdminResponse?.data?.phone_number || '',
        email: subAdminResponse?.data?.email || '',
        password: '', // Keep empty for security, only update if provided
        confirmPassword: '',
        image: null
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Edit Sub Admin information</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={editSubAdminSchema}
                    onSubmit={async (values) => {
                        try {
                            const privIds = menus
                                .filter(menu => selectedPrivileges[menu.title] && selectedPrivileges[menu.title].length > 0)
                                .map(menu => menu.Key);

                            const payload: any = {
                                name: values.name,
                                email: values.email,
                                phone_number: values.phoneNumber,
                                previlages: privIds,
                                receive_sms: receiveSmsStatus.isSms,
                            };

                            if (values.password) {
                                payload.password = values.password;
                                payload.password_confirmation = values.confirmPassword;
                            }

                            if (id) {
                                await updateSubAdmin({ id, data: payload });

                                if (values.image) {
                                    const formData = new FormData();
                                    formData.append('image', values.image);
                                    await uploadImage({ id, formData });
                                }

                                toast.success("Sub Admin updated successfully");
                                queryClient.invalidateQueries({ queryKey: ["sub-admins"] });
                                navigate('/users&staff/manageSubAdmin');
                            }

                        } catch (error: any) {
                            console.error(error);
                            toast.error(error?.response?.data?.message || "Failed to update Sub Admin");
                        }
                    }}
                >
                    {({ isValid, values }) => (
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
                                        label="New Password (optional)"
                                        placeholder="Enter new password to change"
                                        type="password"
                                    />
                                    <FormInput
                                        name="confirmPassword"
                                        label="Confirm New Password"
                                        placeholder="Confirm new password"
                                        type="password"
                                        disabled={!values.password}
                                    />
                                </div>
                                <div className="order-1 md:order2 h-fit w-full flex justify-center">
                                    <div className=' flex flex-col justify-center items-start'>
                                        <h1 className='font-bold capitalize'>your profile</h1>
                                        <p className='text-[#616161] pb-5'>This will be displayed on your profile.</p>
                                        <CustomFileUpload 
                                            name="image" 
                                            title="Profile Image" 
                                            initialImage={subAdminResponse?.data?.image_url}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <DropDownAndSelect
                                selectedOptions={selectedPrivileges}
                                setSelectedOptions={setSelectedPrivileges}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? "Updating..." : "Update"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
