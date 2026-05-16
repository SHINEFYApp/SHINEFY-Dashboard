import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { ArrowUpToLine, Eye, Search, Trash2 } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes } from "../../constants/data";
import { CustomTable } from "../../common/CustomTable";
import { useState } from "react";
import { useGetOrders } from "../../api/features/products.hooks";

export default function ManageOrders(){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: ordersData, isLoading } = useGetOrders({
        per_page: pageSize,
    });

    const orders = ordersData?.data ?? [];
    const totalEntries = ordersData?.meta?.total ?? 0;
    const totalPages = ordersData?.meta?.last_page ?? 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values: { search: string; export: string }) => {
        console.log(`Search values: ${values.search} | Export File Extantion: ${values.export} `);
    };

    const columns = [
        {
            key: "hash",
            title: "#",
        },
        {
            key: "id",
            title: "Order Id",
        },
        {
            key: "items_count",
            title: "Items",
        },
        {
            key: "total",
            title: "Total",
        },
        {
            key: "status",
            title: "Status",
        },
        {
            key: "created_at",
            title: "Created At",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <div className="flex gap-2 items-center">
                     <button
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                        onClick={() => alert('view item')}
                    >
                        <Eye /> View
                    </button>
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ];

    const mappedData = orders.map((order, index) => ({
        hash: ((currentPage - 1) * pageSize) + index + 1,
        id: order.id,
        user_id: order.user_id,
        items_count: order.items_count,
        total: order.total,
        status: order.status,
        created_at: order.created_at,
    }));

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
                    {() => (
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
                data={mappedData}
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={totalEntries}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                isLoading={isLoading}
            />
        </main>
    )
}
