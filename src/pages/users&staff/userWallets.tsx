import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "../../components/ui/button";
import { userWalletSchema } from "../../constants/validationSchema";
import { userWalletInitialValues } from "../../constants/initialValues";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { CustomTable } from "../../common/CustomTable";
import type { FilterFormValuesOnlySearch } from "../../types/bookings";
import { Search } from "lucide-react";
import { useGetWallets, useAddWallet, useExportWallets } from "../../api/features/wallets.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUsers } from "../../api/features/ManageUsers.hooks";

const columns = [
    {
        key: "name",
        title: "User Name",
    },
    {
        key: "phone_number",
        title: "Mobile Number",
    },
    {
        key: "amount_type",
        title: "Amount Type",
        render: (type: string) => (
            <span className={type === "Credit" ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                {type}
            </span>
        )
    },
    {
        key: "amount",
        title: "Amount", // Renamed from Type for clarity, though design might say Type
    },
    {
        key: "reason",
        title: "Reason",
    },
    {
        key: "createtime",
        title: "Create Date & Time",
    }
]

export default function UsersWallets() {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState<boolean>();
    const [currentBayMethod, setCurrentBayMethod] = useState<string>('Credit');
    const queryClient = useQueryClient();

    // Fetch users for dropdown
    const { data: usersData } = useGetUsers({ page: 1, limit: 100 }); // Adjust limit or add search if needed
    const userOptions = usersData?.data?.users?.map((u: any) => ({
        label: u.name || `User ${u.id}`,
        value: u.id
    })) || [];

    const { mutate: addWallet, isPending: isAdding } = useAddWallet({
        onSuccess: () => {
            toast.success("Amount added successfully");
            setOpenWindowAddAmount(false);
            queryClient.invalidateQueries({ queryKey: ["wallets"] });
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to add amount");
        }
    });

    const { mutate: exportWallets } = useExportWallets({
        onSuccess: (data: any) => {
            // Check if data is URL or blob? Assuming simple success for now.
            toast.success("Export started");
        },
        onError: (err: any) => {
            toast.error("Failed to export");
        }
    });
    const payMethods = [
        'Credit',
        'Debit'
    ];

    const handleSubmit = (values: FilterFormValuesOnlySearch) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    useEffect(() => {
        // Just updating state for visual toggle if needed, or remove effect if not used
    }, [currentBayMethod]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const { data, isLoading } = useGetWallets({
        start: (currentPage - 1) * pageSize,
        limit: pageSize,
        search_text: search
    });

    const walletsRaw = data?.data?.data?.wallets; // Response -> Body -> Data -> Wallets
    const wallets = (Array.isArray(walletsRaw) ? walletsRaw : []) as any[];
    const pagination = data?.data?.data?.pagination;

    const totalEntries = pagination?.total_items || 0;
    const totalPages = pagination?.total_pages || 0;


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <main>
                <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl`}>
                    <div className="mb-6">
                        <Formik
                            initialValues={{
                                search: '',
                            }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        {/* rigt side */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
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
                                                className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                        </div>
                                        {/* left side */}
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <div className="flex flex-col lg:flex-row items-center gap-5">
                                                <button
                                                    onClick={() => {
                                                        setOpenWindowAddAmount(true)
                                                    }}
                                                    className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                                >
                                                    Add Wallet Amount
                                                </button>
                                                <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                                <div className="w-full lg:w-[135px]">
                                                    <button
                                                        type="button"
                                                        onClick={() => exportWallets({})}
                                                        className="w-full py-3 bg-[#C9FFCB] rounded-lg text-[#4CAF50] border border-[#4CAF50] font-semibold transition-all hover:bg-[#4CAF50] hover:text-white"
                                                    >
                                                        Export
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {isLoading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={wallets}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </main>
            {/* popup window  */}
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowAddAmount ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] h-[579px] relative px-10 py-5 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowAddAmount ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] font-bold">Add Wallet Amount</h1>
                    <div className="flex flex-col mt-10 justify-center items-center">
                        <Formik
                            initialValues={userWalletInitialValues}
                            validationSchema={userWalletSchema}
                            onSubmit={(values) => {
                                // Map form values to API payload
                                // Request says: user_type=0, optradio=0, bonus_percentage=1 (defaults?)
                                // Form has: user, amount, payMethod (via state currentBayMethod)
                                const payload = {
                                    user_type: 0,
                                    users: values.user ? [Number(values.user)] : [], // Assuming user is ID
                                    optradio: 0, // 0 for amount?
                                    amount: Number(values.amount),
                                    bonus_percentage: 1, // Default from request
                                    // Add logic for payMethod if API supports it? API doesn't seem to show payMethod in POST /addWallet params provided
                                };
                                addWallet(payload);
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className="w-[376px]">
                                        <FormDropdown
                                            name="user"
                                            label="Select User"
                                            placeholder="Select User"
                                            options={userOptions as any}
                                        />
                                    </div>
                                    <div className="w-[376px] flex items-center justify-center gap-5 py-10">
                                        {payMethods.map((btn, idx) => {
                                            return (
                                                <button onClick={() => {
                                                    setCurrentBayMethod(btn);
                                                }} className={`rounded-lg w-[139px] h-12 ${currentBayMethod === btn ? ' border bg-[#C3FFC5] border-[#4CAF50] text-[#4CAF50]' : 'bg-[#F4F5FA]'}`} key={idx} type="button">
                                                    {btn}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="w-[376px]">
                                        <FormInput
                                            name="amount"
                                            label="Wallet Amount"
                                            placeholder="Wallet Amount"
                                            type="text"
                                        />
                                    </div>
                                    <div className=" w-full p-5 flex justify-between items-center absolute bottom-0 left-0">
                                        <button
                                            onClick={() => setOpenWindowAddAmount(false)}
                                            className="w-[168px] border text-[20px] py-3 border-black rounded-[10px]"
                                        >
                                            Back
                                        </button>

                                        <Button
                                            type="submit"
                                            disabled={!isValid}
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isAdding ? "Submitting..." : "Submit"}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
}

