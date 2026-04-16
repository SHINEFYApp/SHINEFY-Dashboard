import { Formik, Form } from 'formik';
import { addVehicleSchema } from '../../constants/validationSchema';
import { addVehicleInitialValues } from '../../constants/initialValues';
import { FormDropdown } from '../../common/FormDropdown';
import { FormInput } from '../../common/FormInput';
import { CarFront, Hash, LayoutGrid, ScrollText, SprayCan, User, UserX } from 'lucide-react';
import { IoCallOutline } from 'react-icons/io5';
import { Button } from '../../components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { usePost } from '../../api/usePostData';
import {
    useGetMakesList,
    useGetModelsByMake,
    useGetColorsList,
    useGetCategoriesList,
    useAddUserVehicle,
} from '../../api/features/manageVehicles.hooks';
import type { getUserInfoByNumberPayload, getUserInfoByNumberResponse } from '../../types/bookings';
import type { UserLookupInfo } from '../../types/vehicles';
import { SkeletonDemo } from '../../common/loader';

export default function AddVehicles() {
    const [userInfo, setUserInfo] = useState<UserLookupInfo | null>(null);
    const [clientNotFound, setClientNotFound] = useState(false);
    const [lastRequestedPhone, setLastRequestedPhone] = useState<string | null>(null);
    const [selectedMakeId, setSelectedMakeId] = useState<number>(0);

    const baseURL = import.meta.env.VITE_API_URL;

    // Phone lookup
    const { mutate: lookupUser, isPending: isLookingUp } = usePost<
        getUserInfoByNumberResponse,
        getUserInfoByNumberPayload
    >({
        route: `${baseURL}/api/book/user-details`,
        options: {
            onSuccess: (data) => {
                if (data?.data?.user_info) {
                    setUserInfo(data.data.user_info);
                    setClientNotFound(false);
                }
            },
            onError: (err: any) => {
                setUserInfo(null);
                setClientNotFound(true);
                toast.error(err.response?.data?.message ?? 'User not found');
            },
        },
    });

    // Fetch dropdown data
    const { data: makesData } = useGetMakesList({ per_page: 100 });
    const { data: modelsData } = useGetModelsByMake(selectedMakeId);
    const { data: colorsData } = useGetColorsList({ per_page: 100 });
    const { data: categoriesData } = useGetCategoriesList({ per_page: 100 });

    // Add vehicle mutation
    const addVehicleMutation = useAddUserVehicle();

    const makes = makesData?.data?.makes ?? [];
    const models = modelsData?.data?.models ?? modelsData?.data ?? [];
    const colors = colorsData?.data?.colors ?? [];
    const categories = categoriesData?.data?.categories ?? [];

    const makeOptions = Array.isArray(makes) ? makes.map((m: any) => m.make_name) : [];
    const modelOptions = Array.isArray(models) ? models.map((m: any) => m.model_name) : [];
    const colorOptions = Array.isArray(colors) ? colors.map((c: any) => c.color_name) : [];
    const categoryOptions = Array.isArray(categories) ? categories.map((c: any) => c.car_category_name_english) : [];

    const handlePhoneBlur = (phone: string) => {
        if (!phone) return;
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone === lastRequestedPhone) return;
        setLastRequestedPhone(cleanPhone);
        setClientNotFound(false);
        setUserInfo(null);
        lookupUser({ phone_number: cleanPhone } as getUserInfoByNumberPayload);
    };

    const handleSubmit = (values: typeof addVehicleInitialValues, { resetForm }: any) => {
        if (!userInfo) {
            toast.error('Please enter a valid phone number to find the user first');
            return;
        }

        const selectedMake = makes.find((m: any) => m.make_name === values.make);
        const selectedModel = models.find((m: any) => m.model_name === values.model);
        const selectedColor = colors.find((c: any) => c.color_name === values.color);
        const selectedCategory = categories.find((c: any) => c.car_category_name_english === values.category);

        const payload = {
            user_id: userInfo.user_id,
            make_id: selectedMake?.make_id ?? 0,
            model_id: selectedModel?.model_id ?? 0,
            color_id: selectedColor?.color_id ?? 0,
            car_category_id: selectedCategory?.car_category_id ?? 0,
            plate_number: values.plateNumber,
        };

        console.log(selectedCategory)

        addVehicleMutation.mutate(payload, {
            onSuccess: () => {
                toast.success('Vehicle added successfully');
                resetForm();
                setUserInfo(null);
                setLastRequestedPhone(null);
                setSelectedMakeId(0);
            },
            onError: (err: any) => {
                toast.error(err.response?.data?.message ?? 'Failed to add vehicle');
            },
        });
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 min-h-screen md:p-6 rounded-2xl relative">
                {isLookingUp && (
                    <div className="h-full w-full absolute top-0 left-0 z-50 bg-white rounded-2xl">
                        <SkeletonDemo quantity={10} />
                    </div>
                )}

                <h1 className="text-[20px] font-bold mb-8">Enter vehicle information</h1>

                {/* User info card */}
                {userInfo && (
                    <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4 animate-slide-up">
                        <div className="shrink-0 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-green-800 mb-1">Client Found</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">Name</p>
                                        <p className="text-sm font-medium text-gray-800">{userInfo.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">User ID</p>
                                        <p className="text-sm font-medium text-gray-800">#{userInfo.user_id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Client not-found card */}
                {clientNotFound && !userInfo && (
                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 flex items-center gap-4 animate-slide-up">
                        <div className="shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                            <UserX className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-red-700">No client found</p>
                            <p className="text-xs text-red-400 mt-0.5">No account is linked to this phone number.</p>
                        </div>
                    </div>
                )}

                <Formik
                    initialValues={addVehicleInitialValues}
                    validationSchema={addVehicleSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, setFieldValue, values }) => {
                        // When make changes, update selectedMakeId and reset model
                        useEffect(() => {
                            if (values.make) {
                                const selectedMake = makes.find((m: any) => m.make_name === values.make);
                                if (selectedMake?.make_id && selectedMake.make_id !== selectedMakeId) {
                                    setSelectedMakeId(selectedMake.make_id);
                                    setFieldValue('model', '');
                                }
                            }
                        }, [values.make]);

                        return (
                            <Form>
                                {/* Phone Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <FormInput
                                        name="phoneNumber"
                                        label="User phone number"
                                        placeholder="Enter user phone number"
                                        type="tel"
                                        icon={<IoCallOutline className="w-5 h-5" />}
                                        onBlur={(value) => {
                                            setClientNotFound(false);
                                            handlePhoneBlur(value);
                                        }}
                                    />
                                    <FormInput
                                        name="plateNumber"
                                        label="Plate Number"
                                        placeholder="Enter plate number"
                                        type="text"
                                        icon={<Hash className="w-5 h-5" />}
                                    />
                                </div>

                                {/* Category & Make */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <FormDropdown
                                        name="category"
                                        label="Category"
                                        placeholder="Select Category"
                                        icon={<LayoutGrid className="w-5 h-5" />}
                                        options={categoryOptions}
                                    />
                                    <FormDropdown
                                        name="make"
                                        label="Make"
                                        placeholder="Select Make"
                                        icon={<CarFront className="w-5 h-5" />}
                                        options={makeOptions}
                                    />
                                </div>

                                {/* Model & Color */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <FormDropdown
                                        name="model"
                                        label="Model"
                                        placeholder={values.make ? "Select Model" : "Select Make first"}
                                        icon={<ScrollText className="w-5 h-5" />}
                                        options={modelOptions}
                                        disabled={!values.make}
                                    />
                                    <FormDropdown
                                        name="color"
                                        label="Color"
                                        placeholder="Select Color"
                                        icon={<SprayCan className="w-5 h-5" />}
                                        options={colorOptions}
                                    />
                                </div>

                                <div className="flex justify-start">
                                    <Button
                                        type="submit"
                                        disabled={!isValid || !userInfo || addVehicleMutation.isPending}
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[356px] h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {addVehicleMutation.isPending ? 'Adding...' : 'Add Vehicle'}
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </main>
    );
}
