import { useGetSubAdminDetails } from "../../../api/features/subAdmins.hooks";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { smsStatus } from '../../../types/common';
import DropDownAndSelect from '../../../common/dropDownAndSelect';
import { menus } from '../../../constants/data';
import { Skeleton } from '../../../components/ui/skeleton';
import { Button } from '../../../components/ui/button';

export default function ViewSubAdmin() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: subAdminResponse, isLoading: isLoadingDetails } = useGetSubAdminDetails(id || "");

    const [receiveSmsStatus, setReceiveSmsStatus] = useState<smsStatus>({
        status: true,
        isSms: false
    });

    console.log(subAdminResponse)

    const [selectedPrivileges, setSelectedPrivileges] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (subAdminResponse?.data) {
            const data = subAdminResponse.data;
            setReceiveSmsStatus(prev => ({ ...prev, isSms: !!data.receive_sms }));
            
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

    const data = subAdminResponse?.data?.data;


    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[20px] font-bold">Sub Admin Details</h1>
                    <Button 
                        onClick={() => navigate(`/users&staff/manage/subAdmin/edit/${id}`)}
                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-8 rounded-xl"
                    >
                        Edit Sub Admin
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 grid-flow-dense">
                    <div className="order-2 md:order-1 space-y-6">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Name</label>
                            <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                                {data?.name || 'N/A'}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Phone Number</label>
                            <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between font-medium">
                                <span>{data?.phone_number || 'N/A'}</span>
                                {receiveSmsStatus.isSms && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Receives SMS</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Email</label>
                            <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                                {data?.email || 'N/A'}
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order2 flex flex-col items-center">
                        <h1 className='font-bold capitalize mb-4'>Profile Photo</h1>
                        <div className='w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200'>
                            {data?.image_url ? (
                                <img src={data.image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="pointer-events-none opacity-80">
                    <DropDownAndSelect
                        selectedOptions={selectedPrivileges}
                        setSelectedOptions={() => {}} // Read-only
                    />
                </div>
            </div>
        </main>
    );
}
