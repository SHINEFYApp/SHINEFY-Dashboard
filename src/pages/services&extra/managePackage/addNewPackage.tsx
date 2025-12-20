import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { FormDropdown } from "../../../common/FormDropdown";
import { useState } from "react";
import type { managePackageAddPackageFormValues } from "../../../constants/initialValues";
import { TextArea } from "../../../common/textArea";
import { addPackageSchema } from "../../../constants/validationSchema";


interface ServiceSectionProps {
  title: string;
  count: number;
  setCount: (value: number) => void;
  namePrefix: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, count, setCount, namePrefix }) => {
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
                    options={["Service one", "Service two", "Service three"]}
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

export default function AddNewPackage() {
  const [mainPackageServices, setMainPackageServices] = useState<number>(1);
  const [extraPackageServices, setExtraPackageServices] = useState<number>(1);
  const initialValues: managePackageAddPackageFormValues = {};

  return (
    <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <h1 className="text-[20px] font-bold pb-3 mb-10 border-b border-black/10">Add New Package</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={addPackageSchema} 
            onSubmit={(values: managePackageAddPackageFormValues) => console.log(values)}
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
                        />

                    {/* Extra Services */}
                        <ServiceSection
                            title="Package Extra Services Quantity"
                            count={extraPackageServices}
                            setCount={setExtraPackageServices}
                            namePrefix="extraPackage"
                        />
                    </div>
                    <div className="mt-10 grid grid-cols-3 gap-5 pt-10 border-t border-black/10">
                        <div>
                            <FormDropdown
                                name='type'
                                label="Type"
                                placeholder="Type"
                                options={["Type one", "Type two", "type three"]}
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
                                options={["Interval one", "Interval two", "Interval three"]}
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
                        disabled={!isValid}
                        className="w-[376px] py-3 bg-[#FFC107] rounded-[10px] text-[20px] font-bold mt-10 hover:bg-[#e6ac00] transition-all"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </main>
  );
}
