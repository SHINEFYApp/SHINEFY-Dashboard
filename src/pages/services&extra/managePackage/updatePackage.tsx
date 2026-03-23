import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { FormDropdown } from "../../../common/FormDropdown";
import { useEffect, useState } from "react";
import type { managePackageAddPackageFormValues } from "../../../constants/initialValues";
import { TextArea } from "../../../common/textArea";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { usePackageDetails, useUpdatePackage } from "../../../api/features/packages.hooks";
import { availableExtraServices } from "../../../constants/data";
import { addPackageSchema } from "../../../constants/validationSchema";

// Mock services for Main Services (same as Add)
const availableMainServices = [
    { id: 16, name: "Service one" },
    { id: 17, name: "Service two" },
    { id: 18, name: "Service three" },
];

const mapServiceId = (name: string, list: any[]) => {
    const found = list.find(item => item.name === name);
    return found ? Number(found.id) : 0;
};
const mapServiceName = (id: number, list: any[]) => {
    const found = list.find(item => Number(item.id) === Number(id));
    return found ? found.name : "";
};


interface ServiceSectionProps {
    title: string;
    count: number;
    setCount: (value: number) => void;
    namePrefix: string;
    options: string[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, count, setCount, namePrefix, options }) => {
    return (
        <div className="my-10">
            <h2 className="text-[20px] font-bold pb-3 mb-10 border-b border-black/10">{title}</h2>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="grid grid-cols-3 gap-5 pb-10">
                    <FormDropdown
                        name={`${namePrefix}Service_${index + 1}`}
                        label="Service Name"
                        placeholder="Select Service"
                        moreOptions="packageService"
                        options={options}
                    />
                    <FormInput
                        name={`${namePrefix}Quantity_${index + 1}`}
                        label="Services Quantity"
                        placeholder="Services Quantity"
                        type="number"
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="w-[376px] py-3 text-[14px] border border-dashed border-[#FFC107] rounded-[10px] bg-[#FFF3D0]"
            >
                Add Service
            </button>
        </div>
    );
};

export default function UpdatePackage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mainPackageServices, setMainPackageServices] = useState<number>(1);
    const [extraPackageServices, setExtraPackageServices] = useState<number>(1);
    const [initialValues, setInitialValues] = useState<managePackageAddPackageFormValues>({});

    const { data: packageDetails, isLoading } = usePackageDetails(id as string, {
        enabled: !!id,
    });

    const { mutate: updatePackage, isPending } = useUpdatePackage({
        onSuccess: () => {
            toast.success("Package updated successfully");
            navigate("/services&extra/manage/Package");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update package");
        }
    });

    useEffect(() => {
        if (packageDetails) {
            const pkg = packageDetails.data; // adjust based on response structure
            // If response is nested: pkg = packageDetails.data or packageDetails
            // Assuming packageDetails is the Payload from API. 
            // BUT api/features/packages.ts says: getPackageDetails returns res.data.
            // Check response structure for single package. Usually { status: "success", data: { ... } } or just { ... }

            // Map main services
            const mainSvcs = pkg.main_services || [];
            if (mainSvcs.length > 0) setMainPackageServices(mainSvcs.length);

            // Map extra services
            const extraSvcs = pkg.extra_services || [];
            if (extraSvcs.length > 0) setExtraPackageServices(extraSvcs.length);

            const values: managePackageAddPackageFormValues = {
                packageNameEnglish: pkg.name,
                packageNameArabic: pkg.name_ar,
                englishPackageDescription: pkg.description,
                arabicPackageDescription: pkg.description_ar,
                packagePrice: String(pkg.price),
                packageTotalDays: String(pkg.total_days),
                type: pkg.schedule_type,
                interval: pkg.schedule_interval,
            };

            mainSvcs.forEach((svc: any, idx: number) => {
                values[`mainPackageService_${idx + 1}`] = mapServiceName(svc.service_id, availableMainServices);
                values[`mainPackageQuantity_${idx + 1}`] = String(svc.quantity);
            });

            extraSvcs.forEach((svc: any, idx: number) => {
                values[`extraPackageService_${idx + 1}`] = mapServiceName(svc.extra_service_id, availableExtraServices);
                values[`extraPackageQuantity_${idx + 1}`] = String(svc.quantity);
            });

            setInitialValues(values);
        }
    }, [packageDetails]);

    const handleSubmit = (values: managePackageAddPackageFormValues) => {
        // Transform values to api payload (Same as Add)
        const main_services = [];
        for (let i = 1; i <= mainPackageServices; i++) {
            const name = values[`mainPackageService_${i}`];
            const qty = values[`mainPackageQuantity_${i}`];
            if (name && qty) {
                main_services.push({
                    service_id: mapServiceId(name, availableMainServices),
                    quantity: Number(qty)
                });
            }
        }

        const extra_services = [];
        for (let i = 1; i <= extraPackageServices; i++) {
            const name = values[`extraPackageService_${i}`];
            const qty = values[`extraPackageQuantity_${i}`];
            if (name && qty) {
                extra_services.push({
                    extra_service_id: mapServiceId(name, availableExtraServices),
                    quantity: Number(qty)
                });
            }
        }

        const payload = {
            name: values.packageNameEnglish || "",
            name_ar: values.packageNameArabic || "",
            description: values.englishPackageDescription || null,
            description_ar: values.arabicPackageDescription || null,
            price: Number(values.packagePrice),
            total_used: 0,
            total_days: Number(values.packageTotalDays),
            schedule_type: values.type || "pre_schedule",
            schedule_interval: values.interval || "daily",
            main_services,
            extra_services
        };

        // @ts-ignore
        updatePackage({ id, data: payload });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <h1 className="text-[20px] font-bold pb-3 mb-10 border-b border-black/10">Update Package</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={addPackageSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form>
                        <div className="grid grid-cols-1">
                            {/* Package Details */}
                            <div className="grid grid-cols-3 gap-5 pb-10">
                                <div className="grid grid-cols-1 gap-5">
                                    <FormInput name="packageNameEnglish" label="Package Name (In English)" placeholder="Package Name" type="text" />
                                    <FormInput name="packagePrice" label="Package Price" placeholder="Package Price" type="text" />
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <FormInput name="packageNameArabic" label="Package Name (In Arabic)" placeholder="Package Name" type="text" />
                                    <FormInput name="packageTotalDays" label="Package Total Days" placeholder="Package Total Days" type="text" />
                                </div>
                                <div className="flex justify-center items-center flex-col gap-4">
                                    <h3>Package Image</h3>
                                    <div className="w-[117px] h-[117px] rounded-2xl bg-[#F4F5FA] border border-[#E9EAEC]"></div>
                                    <div className="flex gap-5">
                                        <button type="button" className="text-[#B0B0B0] text-[14px]">Delete</button>
                                        <button type="button" className="text-[#FFC107] text-[14px]">Update</button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Services */}
                            <ServiceSection
                                title="Package Main Services Quantity"
                                count={mainPackageServices}
                                setCount={setMainPackageServices}
                                namePrefix="mainPackage"
                                options={availableMainServices.map(s => s.name)}
                            />

                            {/* Extra Services */}
                            <ServiceSection
                                title="Package Extra Services Quantity"
                                count={extraPackageServices}
                                setCount={setExtraPackageServices}
                                namePrefix="extraPackage"
                                options={availableExtraServices.map(s => s.name)}
                            />
                        </div>
                        <div className="mt-10 grid grid-cols-3 gap-5 pt-10 border-t border-black/10">
                            <div>
                                <FormDropdown
                                    name='type'
                                    label="Type"
                                    placeholder="Type"
                                    options={["pre_schedule", "schedule"]} // Assuming mock values
                                />
                                <TextArea
                                    name="englishPackageDescription"
                                    label="Package Description (In English)"
                                    placeholder="Package Description (In English)"
                                />
                            </div>
                            <div>
                                <FormDropdown
                                    name='interval'
                                    label="Interval"
                                    placeholder="Interval"
                                    options={["daily", "weekly", "monthly"]} // Assuming mock values
                                />
                                <TextArea
                                    name="arabicPackageDescription"
                                    label="Package Description (In Arabic)"
                                    placeholder="Package Description (In Arabic)"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="w-[376px] py-3 bg-[#FFC107] rounded-[10px] text-[20px] font-bold mt-10 hover:bg-[#e6ac00] transition-all disabled:opacity-50"
                        >
                            {isPending ? "Updating..." : "Update"}
                        </button>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
