import { useEffect, useState } from "react";
import Table from "../../components/tables/table";
import { FormDropdown } from "../../common/FormDropdown";
import { Form, Formik } from "formik";
import { Button } from "../../components/ui/button";
import { userWalletSchema } from "../../constants/validationSchema";
import { userWalletInitialValues } from "../../constants/initialValues";
import { FormInput } from "../../common/FormInput";
import type { userWalletFormData } from "../../types/forms";

export default function UsersWallets() {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState<boolean>();
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

    useEffect(() => {
        setFormData(prev => ({ ...prev, payMethod: currentBayMethod }));
    }, [currentBayMethod]);

    console.log(formData);

    return (
        <>
            <main>
                <Table openWindow={openWindowAddAmount} setOpenWindow={setOpenWindowAddAmount} manageSectionFromComponant={'userWallets'} />
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

