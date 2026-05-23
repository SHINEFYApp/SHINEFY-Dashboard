import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Calendar, Search } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormDropdown } from "../../../common/FormDropdown";
import Loader from "../../../common/loader";
import { useGetAdminSlots } from "../../../api/features/slots.hooks";
import { useGetMainAreas, useGetSubAreas } from "../../../api/features/areas.hooks";
import type { MainAreaItem, SubAreaItem } from "../../../api/features/areas";
import type { AdminSlot } from "../../../types/slots";

interface AdminSlotsFormValues {
    main_area_id: string;
    sub_area_id: string;
    date: string;
    service_time: string;
}

export default function AdminSlots() {
    const { t } = useTranslation();
    const [selectedMainArea, setSelectedMainArea] = useState<string>("");
    const [queryParams, setQueryParams] = useState<{ date: string; area_id?: number; service_time?: number } | null>(null);

    const { data: mainAreasData } = useGetMainAreas({ limit: 200 });
    const { data: subAreasData } = useGetSubAreas(
        selectedMainArea ? { main_area_id: Number(selectedMainArea), limit: 200 } : { limit: 200 }
    );
    const { data: slotsData, isLoading: slotsLoading } = useGetAdminSlots(
        queryParams || { date: "" }
    );

    const mainAreas: MainAreaItem[] = Array.isArray(mainAreasData?.data?.data?.main_areas) ? mainAreasData.data.data.main_areas : [];
    const subAreas: SubAreaItem[] = Array.isArray(subAreasData?.data?.data?.sub_areas) ? subAreasData.data.data.sub_areas : [];
    const slots: AdminSlot[] = Array.isArray(slotsData?.data?.data?.slots) ? slotsData.data.data.slots : [];

    const mainAreaOptions = mainAreas.map((area) => ({
        value: area.id.toString(),
        name: area.main_area_name,
    }));

    const subAreaOptions = subAreas.map((area) => ({
        value: area.id.toString(),
        name: area.area_name,
    }));

    const handleSubmit = (values: AdminSlotsFormValues) => {
        if (!values.date) return;
        const params: { date: string; area_id?: number; service_time?: number } = {
            date: values.date,
        };
        if (values.sub_area_id) {
            params.area_id = Number(values.sub_area_id);
        }
        if (values.service_time) {
            params.service_time = Number(values.service_time);
        }
        setQueryParams(params);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <Formik<AdminSlotsFormValues>
                        initialValues={{
                            main_area_id: "",
                            sub_area_id: "",
                            date: "",
                            service_time: "60",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1 flex-wrap">
                                        <div className="flex flex-col min-w-[140px]">
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                {t('bookings.adminSlots.title')}
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                {t('bookings.adminSlots.subtitle')}
                                            </p>
                                        </div>
                                        <div className="w-full md:w-[178px] -space-y-2">
                                            <FormDropdown
                                                name="main_area_id"
                                                label=""
                                                placeholder={t('bookings.adminSlots.mainArea')}
                                                options={mainAreaOptions as any}
                                                className="mb-2"
                                                onChangeExternal={(value) => {
                                                    setSelectedMainArea(value);
                                                    setFieldValue("sub_area_id", "");
                                                }}
                                            />
                                        </div>
                                        <div className="w-full md:w-[178px] -space-y-2">
                                            <FormDropdown
                                                name="sub_area_id"
                                                label=""
                                                placeholder={t('bookings.adminSlots.subArea')}
                                                options={subAreaOptions as any}
                                                className="mb-2"
                                                disabled={!selectedMainArea}
                                            />
                                        </div>
                                        <div className="w-full md:w-[150px] -space-y-2">
                                            <FormDatePicker
                                                name="date"
                                                label=""
                                                placeholder={t('bookings.adminSlots.date')}
                                                icon={<Calendar className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <div className="w-full md:w-[120px] -space-y-2">
                                            <input
                                                type="number"
                                                name="service_time"
                                                placeholder={t('bookings.adminSlots.duration')}
                                                className="w-full rounded-xl mt-2 border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                defaultValue={60}
                                                onChange={(e) => setFieldValue("service_time", e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap mt-2 md:mt-0 flex items-center gap-2"
                                        >
                                            <Search className="w-4 h-4" />
                                            {t('bookings.adminSlots.search')}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {slotsLoading ? (
                    <Loader />
                ) : slots.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">{t('bookings.adminSlots.tableHeaders.time')}</th>
                                    <th className="text-center py-3 px-4 font-semibold text-secondary-900">{t('bookings.adminSlots.tableHeaders.available')}</th>
                                    <th className="text-center py-3 px-4 font-semibold text-secondary-900">{t('bookings.adminSlots.tableHeaders.busy')}</th>
                                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">{t('bookings.adminSlots.tableHeaders.breakdown')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                                        <td className="py-4 px-4 font-medium text-secondary-900 whitespace-nowrap">
                                            {slot.time}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                                                {slot.available_count}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                                                {slot.busy_count}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="space-y-1.5">
                                                {slot.available_boys?.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-1">
                                                        <span className="text-green-600 font-medium text-xs mr-1">{t('bookings.adminSlots.availableLabel')}</span>
                                                        {slot.available_boys.map((boy) => (
                                                            <span
                                                                key={boy.user_id}
                                                                className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200"
                                                            >
                                                                {boy.image && (
                                                                    <img src={boy.image?.startsWith("http") ? boy.image : `${import.meta.env.VITE_IMAGES_URL}/${boy.image}`} alt="" className="w-4 h-4 rounded-full object-cover" />
                                                                )}
                                                                {boy.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {slot.busy_boys?.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-1">
                                                        <span className="text-red-600 font-medium text-xs mr-1">{t('bookings.adminSlots.busyLabel')}</span>
                                                        {slot.busy_boys.map((boy) => (
                                                            <div
                                                                key={boy.user_id}
                                                                className="group relative inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-full border border-red-200 cursor-default"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                                                                {boy.name}
                                                                <span className="text-red-400 mx-0.5">→</span>
                                                                <span className="font-medium">{boy.booking_no}</span>
                                                                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10 shadow-lg">
                                                                    {boy.booking_time} – {boy.end_slot_time}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {slot.off_shift_boys?.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-1">
                                                        <span className="text-gray-500 font-medium text-xs mr-1">{t('bookings.adminSlots.offShift')}</span>
                                                        {slot.off_shift_boys.map((boy) => (
                                                            <span
                                                                key={boy.user_id}
                                                                className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full border border-gray-200"
                                                            >
                                                                {boy.name}
                                                                <span className="text-gray-400 ml-0.5">({boy.reason})</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {(!slot.available_boys || slot.available_boys.length === 0) &&
                                                 (!slot.busy_boys || slot.busy_boys.length === 0) &&
                                                 (!slot.off_shift_boys || slot.off_shift_boys.length === 0) && (
                                                    <span className="text-gray-400 text-xs">{t('bookings.adminSlots.noServiceBoys')}</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : queryParams ? (
                    <div className="text-center py-12 text-secondary-500">
                        {t('bookings.adminSlots.noSlotsFound')}
                    </div>
                ) : null}
            </div>
        </main>
    );
}
