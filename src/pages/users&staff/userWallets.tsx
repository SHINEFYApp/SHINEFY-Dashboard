import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { userWalletSchema } from "../../constants/validationSchema";
import { userWalletInitialValues } from "../../constants/initialValues";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { CustomTable } from "../../common/CustomTable";
import { dummyUserWallets } from "../../constants/data";
import { userWalletsColumns } from "../../columns/userWalletsColumns";
import type { userWalletFormData } from "../../types/users&staff";

export default function UsersWallets() {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState<boolean>(false);
    const [currentBayMethod, setCurrentBayMethod] = useState<string>('Credit');

    const [formData, setFormData] = useState<userWalletFormData>({
        user: '',
        amount: '',
        payMethod: '',
    });
    const payMethods = [
        'Credit',
        'Debit'
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const columns = userWalletsColumns;

    useEffect(() => {
        setFormData(prev => ({ ...prev, payMethod: currentBayMethod }));
    }, [currentBayMethod]);

    console.log(formData);

    return (
        <>
            <main>
                <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                    {/* Filter Section */}
                    <div className="mb-6 px-4">
                        <Formik
                            initialValues={{ search: '' }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        {/* Left Side */}
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

                                        {/* Right Side */}
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowAddAmount(true)}
                                                className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Add Wallet Amount
                                            </button>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={['CSV', 'Excel', 'PDF']} className="mb-2 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Table Section */}
                    <CustomTable
                        columns={columns}
                        data={dummyUserWallets}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
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
                                setFormData({ ...formData, ...values });
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className="w-[376px]">
                                        <FormDropdown
                                            name="user"
                                            label="Select User"
                                            placeholder="Select User"
                                            options={[
                                                'user one',
                                                'user two',
                                                'user three'
                                            ]}
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
                                            Submit
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

