import { ArrowBigRight, ReplyAll, Star } from "lucide-react";
import type { MsgLayoutProps } from "../../../types/msgDetails";
import { MdReplay } from "react-icons/md";
import City from "@/assets/images/pexels-maxfrancis-2246476.jpg";
import Sea from "@/assets/images/pexels-pok-rie-33563-2049422.jpg";


export default function MsgContent({msgData, setOpenWindow} : MsgLayoutProps) {

    function handleOpenWindowToRplay(){
        setOpenWindow({isOpen: true, type: "replyMessage"});
    }

    return(
        <>
            {msgData ? (
                <section className=" flex-1 p-5 max-h-[85vh] scrollbar-hide overflow-auto rounded-xl bg-[#FFFFFF]">
                    {/* head  */}
                    <div className=" flex items-center gap-5">
                        <div className=" w-10 h-10 rounded-full flex justify-center items-center text-[#818592] font-bold bg-[#F5F6FA] shadow">
                            {msgData?.avatar}
                        </div>
                        <div className=" w-full flex gap-3 items-start justify-between">
                            <div>
                                <div className="flex gap-3 items-center">   
                                    <h1 className="text-[16px] font-bold">{msgData?.name}</h1>
                                    <p className="text-[12px] text-[#818592]">{`< ${msgData?.email} >`}</p>
                                </div>
                                <p className=" text-[#818592] text-[12px]"><span className="font-bold">To :</span> shinefy@mail.com</p>
                            </div>
                            <div className=" flex items-center gap-2">
                                <p className="text-[12px] text-[#00000099]">{msgData?.msgDetails.date}</p>
                                <button>
                                    <Star size={15} className="opacity-70" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* message content  */}
                    <div className="my-10">
                        <h2 className="text-[24px] mb-10 font-bold">{msgData?.name}</h2>
                        <h3 className="text-[14px] mb-5">{msgData?.msgDetails.head}</h3>
                        <p className="text-[14px]">{msgData?.msgDetails.body}</p>
                    </div>
                    <div className=" flex items-center gap-5">
                        <h4 className="text-[14px]">Attachment</h4>
                        <p className="text-[12px] text-[#1C1F26]"><span className="text-[#818592]">Secured by </span>secdata.ai</p>
                    </div>
                    <div className=" flex gap-5 items-center mt-5">
                        <div className=" rounded-2xl w-50 h-50 overflow-hidden">
                            <img src={City} alt="" className=" size-full object-cover"/>
                        </div>
                        <div className=" rounded-2xl w-50 h-50 overflow-hidden">
                            <img src={Sea} alt="" className=" size-full object-cover"/>
                        </div>
                    </div>
                    <div className="mt-10 flex gap-5 border-t pt-5 border-[#0000008A]">
                        <button onClick={handleOpenWindowToRplay} className="px-5 flex items-center gap-2 py-2 border border-[#0000008A] text-[#0000008A]">
                           <MdReplay/> Replay
                        </button>
                        <button onClick={handleOpenWindowToRplay} className="px-5 flex items-center gap-2 py-2 border border-[#0000008A] text-[#0000008A]">
                           <ReplyAll /> Replay All
                        </button>
                        <button className="px-5 flex items-center gap-2 py-2 border border-[#0000008A] text-[#0000008A]">
                           <ArrowBigRight /> Forward
                        </button>
                    </div>
                    <div className=" flex items-center gap-5 mt-10">
                        <div className=" w-10 h-10 rounded-full flex justify-center items-center text-[#1C1F26] font-bold bg-[#FFEDB8] shadow">
                            SH
                        </div>
                        <div className=" w-full flex gap-3 items-start justify-between">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <h1 className="text-[16px] font-bold">SHINEFY</h1>
                                    <p className="text-[12px] text-[#818592]">{`< shinefy@mail.com >`}</p>
                                </div>
                                <p className=" text-[#818592] text-[12px]"><span className="font-bold">To :</span> kendajenner@mail.com</p>
                            </div>
                            <div className=" flex items-center gap-2">
                                <p className="text-[12px] text-[#00000099]">{msgData?.msgDetails.date}</p>
                                <button>
                                    <Star size={15} className="opacity-70" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center gap-5 mt-10">
                        <div className=" w-10 h-10 rounded-full flex justify-center items-center text-[#818592] font-bold bg-[#F5F6FA] shadow">
                            {msgData?.avatar}
                        </div>
                        <div className=" w-full flex gap-3 items-start justify-between">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <h1 className="text-[16px] font-bold">{msgData?.name}</h1>
                                    <p className="text-[12px] text-[#818592]">{`< ${msgData?.email} >`}</p>
                                </div>
                                <p className=" text-[#818592] text-[12px]"><span className="font-bold">To :</span> shinefy@mail.com</p>
                            </div>
                            <div className=" flex items-center gap-2">
                                <p className="text-[12px] text-[#00000099]">{msgData?.msgDetails.date}</p>
                                <button>
                                    <Star size={15} className="opacity-70" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className=" flex-1 p-5 rounded-xl flex justify-center items-center bg-[#FFFFFF]">
                    <h2 className="text-xl capitalize font-bold">select massage to review</h2>
                </section>
            )
            }
        </>
    )
}