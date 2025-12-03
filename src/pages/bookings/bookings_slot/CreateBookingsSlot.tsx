import { AnimatedTabs } from "../../../components/booking/AnimatedTabs";
import ManageDailySlot from "../../../components/booking/manageSlots/ManageDailySlot";
import ManageFreeBooking from "../../../components/booking/manageSlots/ManageFreeBooking";
import { manageSlotsTabs } from "../../../constants/data";
import { useState } from "react";

const CreateBookingsSlot = () => {
    const [activeTab, setActiveTab] = useState('manageDailySlot');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <div className="w-full animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
                <AnimatedTabs
                    tabs={manageSlotsTabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>
            {activeTab === 'manageDailySlot' && <ManageDailySlot />}
            {activeTab === 'manageFreeBooking' && <ManageFreeBooking />}
        </div>
    );
};

export default CreateBookingsSlot;