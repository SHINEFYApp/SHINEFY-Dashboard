import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { Search } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";

const ManageServiceBoy = () => {
    const handleSubmit = (values: any) => {
        console.log("Search values:", values);
    };
    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <div className="mb-6 px-4">
                    <Formik
                        initialValues={manageServiceBoySearchInitialValues}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col gap-4">
                                    {/* Filters and Actions Row */}
                                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                        {/* Left Side - Header + Search Filters */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex flex-col shrink-0">
                                                <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                                                    Filter
                                                </h1>
                                                <p className="text-xs text-secondary-500 whitespace-nowrap">
                                                    Manage Service Boy
                                                </p>
                                            </div>

                                            {/* Search Filters */}
                                            <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
                                                <div className="flex-1 min-w-0 -space-y-2">
                                                    <FormInput
                                                        name="search"
                                                        label=""
                                                        placeholder="Search"
                                                        icon={<Search className="w-5 h-5" />}
                                                        className="mb-0"
                                                        checkmark={false}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] -space-y-2">
                                                    <FormDropdown name="status" label="" placeholder="Status" options={['Pending', 'Confirmed', 'Completed', 'Cancelled']} className="mb-2" />
                                                </div>
                                                <div className="w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] -space-y-2">
                                                    <FormDropdown name="franchise" label="" placeholder="Franchise" options={franchise} className="mb-2" />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto px-6 py-3 bg-black rounded-lg text-white text-sm font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right Side - Action Buttons */}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 xl:gap-4 shrink-0">
                                            <a href="/users&staff/manage/subAdmin/addSubAdmin"
                                                type="button"
                                                className="w-full sm:w-auto px-4 py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 text-sm font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Add Service Boy
                                            </a>
                                            <span className="hidden xl:block w-px h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full sm:w-auto sm:min-w-[120px] sm:max-w-[140px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </main>
    );
};

export default ManageServiceBoy;