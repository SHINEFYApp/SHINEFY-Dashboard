import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { ArrowUpToLine, Eye, Search, Trash2 } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyAdminEarning, dummyOrders, exportTypes } from "../../constants/data";
import { CustomTable } from "../../common/CustomTable";
import { useState } from "react";

export default function ManageAdminEarning(){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values : {search : string , export: string}) => {
        console.log(`Search values: ${values.search} | Export File Extantion: ${values.export} `);
    };
     const columns = [
        {
            key: "status",
            title: "Status",
        },
        {
            key: "bookingNumber",
            title: "Booking Number",
        },
        {
            key: "customer",
            title: "Customer Name",
        },
        {
            key: "serviceBoyName",
            title: "Service Boy Name",
        },
        {
            key: "serviceName",
            title: "Service Name",
        },
        {
            key: "totalAmount",
            title: "Total Amount(EGP)",
        },
        {
            key: "serviceDateAndTime",
            title: "Service Date & Time",
        },
        {
            key: "create",
            title: "Create",
        },
       
    ]
    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <div className="mb-10">
                <Formik
                    initialValues={{
                        search: '',
                        export: '',
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({}) => (
                        <Form>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                                        <FormInput
                                            name="search"
                                            label=""
                                            placeholder="Search"
                                            icon={<Search className="w-5 h-5" />}
                                            className="mb-0"
                                            checkmark={false}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                        Search
                                    </button>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-5">
                                    <div className="w-full lg:w-[135px]">
                                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <CustomTable
                columns={columns}
                data={dummyAdminEarning}
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={totalEntries}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </main>
    )
}
