import { Form, Formik } from "formik"
import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { FormDropdown } from "../../../common/FormDropdown"
import { dummyCountries } from "../../../constants/data" // Placeholder
import DrawMap from "../../../common/map"
import { FormInput } from "../../../common/FormInput"
import { Button } from "../../../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAddArea } from "../../../api/features/areas.hooks"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export default function AddMainArea() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: addArea, isPending: isAdding } = useAddArea({
        onSuccess: () => {
            toast.success("Main Area added successfully");
            queryClient.invalidateQueries({ queryKey: ["main-areas"] });
            navigate('/geography&regions/manage/area');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add Area");
        }
    });

    // TODO: Fetch Real Countries/Regions
    // const { data: countries } = useGetCountries();
    // const { data: regions } = useGetRegions();

    // Valid IDs for testing based on known Postman data (Country 1, Region 1)
    const countryOptions = [
        { label: 'Egypt', value: 1 },
        { label: 'Saudi Arabia', value: 2 },
    ];
    const regionOptions = [
        { label: 'Cairo', value: 1 },
        { label: 'Riyadh', value: 2 },
    ];

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <h1 className=" text-[#242731] text-[20px] mb-5 font-bold">Main Area Name</h1>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={{
                            ...araeForms,
                            country: '',
                            regions: '',
                            areaName: '',
                            area: [] // Coordinates
                        }}
                        validationSchema={areaValidationSchema('mainArea')}
                        onSubmit={(values) => {
                            if (!values.area || values.area.length === 0) {
                                toast.error("Please draw an area on the map");
                                return;
                            }
                            const payload = {
                                country_id: Number(values.country) || 1, // Fallback for safety
                                region_id: Number(values.regions) || 1,
                                name: values.areaName,
                                area_type: 'main_area' as const,
                                coordinates: JSON.stringify(values.area)
                            };
                            addArea(payload);
                        }}
                    >
                        {({ isValid, values, setFieldValue }) => (
                            <Form className=" w-full">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="z-0 overflow-hidden rounded-2xl">
                                        <DrawMap name="area" />
                                    </div>
                                    <FormDropdown
                                        name="country"
                                        label="Select Country"
                                        placeholder="Select Country"
                                        options={countryOptions}
                                    />
                                    <FormDropdown
                                        name="regions"
                                        label="Select Regions"
                                        placeholder="Select Region"
                                        options={regionOptions}
                                    />
                                    <FormInput
                                        name="areaName"
                                        label="Main Areas Name"
                                        placeholder="Area Name"
                                        type="text"
                                    />
                                    <div className="grid grid-cols-2 gap-5 mt-10">
                                        <Link
                                            to={'/geography&regions/manage/area'}
                                            className="border text-[20px] py-3 text-center border-black rounded-[10px]"
                                        >
                                            Back
                                        </Link>

                                        <Button
                                            type="submit"
                                            disabled={!isValid || isAdding}
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isAdding ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </main>
    )
}