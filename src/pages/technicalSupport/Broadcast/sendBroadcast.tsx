import { Form, Formik } from "formik";
import { AnimatedTabs } from "../../../components/booking/AnimatedTabs";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { sendBroadcast } from "../../../constants/data";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormInput } from "../../../common/FormInput";
import { TextArea } from "../../../common/textArea";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimePicker } from "../../../common/FormTimePicker";
import { SendBroadcastInitialValues } from "../../../constants/initialValues";
import { SendBroadcastValidationSchema } from "../../../constants/validationSchema";
import { Trash2 } from "lucide-react";

export default function SendBroadcast() {
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = [
        'sendUser',
        'sendServiceBoy',
        'sendGroup',
    ];
    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'sendUser';
    };
    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    
    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams]);

    const updateURL = (tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        updateURL(tabId);
    };

    return(
        // fixed content don't changed with tabs
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                {/* animated taps */}
                <div className=" mb-5">
                    <AnimatedTabs
                        tabs={sendBroadcast}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                </div>
                {activeTab &&
                    <div>
                        <Formik
                            initialValues={SendBroadcastInitialValues}
                            validationSchema={SendBroadcastValidationSchema}
                            onSubmit={(values) => {
                                console.log(values)
                            }}
                        >  

                            {({isValid}) => (
                                <Form>
                                    <div className="flex justify-between">
                                        <div className=" w-[376px] flex flex-col gap-5">
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
                                            <FormInput
                                                name="title"
                                                label="Enter Title"
                                                placeholder="Enter Title"
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                            <TextArea
                                                name="message"
                                                label="Message"
                                                placeholder="Message"
                                            />
                                            <FormDatePicker
                                                name="dateScheduleNotification"
                                                label="Select Date Schedule Notification"
                                                checkmark={true}
                                            />
                                            <FormTimePicker
                                                name="timeScheduleNotification"
                                                label="Select Time Schedule Notification"
                                            />
                                            <button disabled={!isValid} type="submit" className="w-full mt-10 bg-[#FFC107] rounded-xl font-bold text-[20px] py-2 hover:opacity-90">
                                                Send
                                            </button>
                                        </div>
                                        <div className="w-[349px] bg-[#E9EAEC] rounded-lg h-fit p-5">
                                            <h1 className="mb-5 font-bold text-[18px]">Common Broadcast Messages</h1>
                                            <div className="flex w-[309px] flex-col gap-5 items-center">
                                                <div className="w-full h-[125px] space-y-2 p-2 bg-white rounded">
                                                    <div className="h-1/2">
                                                        <div className=" flex justify-between items-center">
                                                            <h2 className=" text-[12px] text-[#919191]">Title</h2>
                                                            <button>
                                                                <Trash2 color="red" size={15} />
                                                            </button>
                                                        </div>
                                                        <input type="text" className=" w-full text-[14px] h-[70%]" />
                                                    </div>
                                                    <div className="h-1/2">
                                                        <h2 className=" text-[12px] text-[#919191]">Message</h2>
                                                        <input type="text" className=" w-full text-[14px] h-[70%]" />
                                                    </div>
                                                </div>
                                                <button type="button" className="w-full mt-10 bg-black text-white py-3 rounded">
                                                    Add Broadcast Messages
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                }
            </div>
        </main>
    )
}