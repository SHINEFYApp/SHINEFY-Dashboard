import { useSearchParams } from "react-router";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import ManageCarCategory from "../../components/vehicles/ManageCarCategory";
import ManageColor from "../../components/vehicles/ManageColor";
import ManageMake from "../../components/vehicles/ManageMake";
import ManageModel from "../../components/vehicles/ManageModel";
import { manageVehiclesTabs } from "../../constants/data";
import { useState } from "react";

const ManageVehicles = () => {
    const [activeTab, setActiveTab] = useState('manageMake');


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl space-y-6">
            <AnimatedTabs
                tabs={manageVehiclesTabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {activeTab === 'manageMake' && <ManageMake />}
            {activeTab === 'manageModel' && <ManageModel />}
            {activeTab === 'manageColor' && <ManageColor />}
            {activeTab === 'manageCarCategory' && <ManageCarCategory />}
        </main>
    );
};

export default ManageVehicles;