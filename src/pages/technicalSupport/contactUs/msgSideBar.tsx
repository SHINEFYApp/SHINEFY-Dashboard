import { Search } from "lucide-react";
import { FormInput } from "../../../common/FormInput";
import { Form, Formik } from "formik";
import { dummyContactUsMessages } from "../../../constants/data";
import type {MsgLayoutProps} from "../../../types/msgDetails";
import { useSearchParams } from "react-router";
import { useEffect } from "react";



export default function MsgLayout({ msgData, setMsgData, setOpenWindow }: MsgLayoutProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const msgId = searchParams.get("msgId");

    function handleOpenWindowToRplay(){
        setOpenWindow({isOpen: true, type: "newMessage"});
    }

    useEffect(() => {

        if (msgId) {
            const selectedMsg = dummyContactUsMessages.find((msg) => msg.id === msgId);
            setMsgData(selectedMsg || null);
        } else {
            setMsgData(null);
        }
    }, [searchParams, setMsgData]);

    const searchValue = searchParams.get("search") || "";

    const filteredMessages = dummyContactUsMessages.filter((msg) =>
        msg.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        msg.shortDiscussion.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        setSearchParams(params, { replace: true });
    };

    const handleMessageClick = (id: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("msgId", id.toString());
        setSearchParams(params);
    };

    return (    
        <section className={`w-[30%] ${msgId && "max-md:hidden"} `}>
            <div className="overflow-scroll flex flex-col gap-2 scrollbar-hide max-h-[85vh] bg-transparent">
                {/* Header */}
                <div className={`h-fit sticky top-0 rounded-xl bg-white z-10 p-5 flex flex-col gap-2 border-b border-[#E0E0E0]`}>
                    <button onClick={handleOpenWindowToRplay} className="w-full text-[14px] font-bold rounded-sm bg-primary py-2">
                        New Message
                    </button>

                    {/* Search */}
                    <Formik
                        enableReinitialize
                        initialValues={{ search: searchValue }}
                        onSubmit={(values) => {
                            handleSearchChange(values.search);
                        }}
                    >
                        {() => (
                            <Form>
                                <FormInput
                                    name="search"
                                    label=""
                                    placeholder="Search people, word or anything..."
                                    icon={<Search className="w-5 h-5" />}
                                    className="mb-0"
                                    checkmark={false}
                                    moreOptions="bgWhite"
                                />
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* Messages List */}
                {filteredMessages.map((msg) => (
                    <div
                        key={msg.id}
                        onClick={() => handleMessageClick(msg.id)}
                        className={`relative cursor-pointer p-3 h-[102px] flex items-start justify-between rounded-[5px]
                        ${msgData?.id === msg.id ? "bg-[#FFF3CF]" : "bg-white"}`}
                    >
                        {/* Avatar */}
                        <div
                            className={`w-[20%] ps-3 ${
                                msgData?.id === msg.id ? "opacity-100" : "opacity-50"
                            }`}
                        >
                            <div className="w-8 h-8 rounded-full flex justify-center items-center text-[#818592] font-bold bg-[#F5F6FA] shadow">
                                {msg.avatar}
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className={`w-[80%] flex flex-col justify-between h-full ${
                                msgData?.id === msg.id ? "opacity-100" : "opacity-50"
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-[14px]">{msg.name}</h2>
                                <span className="text-[10px]">{msg.time}</span>
                            </div>
                            <p className="text-[12px]">{msg.email}</p>
                            <p className="text-[12px]">{msg.shortDiscussion}</p>
                        </div>

                        {/* New badge */}
                        {msg.status === "new" && (
                            <span className="bg-green-500 w-2 h-2 rounded-full absolute bottom-2 right-2" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
