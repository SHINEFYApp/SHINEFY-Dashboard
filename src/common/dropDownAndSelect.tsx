import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { menus } from "../constants/data";
import type { ChildProps } from "../types/common";

export default function DropDownAndSelect({selectedOptions, setSelectedOptions} : ChildProps) {
    const [openList, setOpenList] = useState<number | null>(null);

    function toggleOpenList(key: number) {
        setOpenList((prev) => (prev === key ? null : key));
    }
    
    function toggleOption(title: string, option: string) {
        setSelectedOptions((prev) => {
            const current: string[] = prev[title] || [];

            if (current.includes(option)) {
                return {
                    ...prev,
                    [title]: current.filter((o) => o !== option),
                };
            }

            return {
                ...prev,
                [title]: [...current, option],
            };
        });
    }

    return (
        <section>
            <h2 className="text-[20px] text-[#191919] font-bold mb-10">Privileges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
                {menus.map((el) => {
                    const isOpen = openList === el.Key;
                    const selected = selectedOptions[el.title] || [];

                    return (
                        <div key={el.Key} className={`${isOpen && 'z-50'} w-full h-fit relative border border-gray-200 bg-[#F4F5FA] px-2 md:px-5 py-2 rounded-2xl`}>
                            {el.title === 'Dashboard' ? 
                                <div className="w-full relative flex justify-between items-center py-3">
                                    <button onClick={() => {
                                        toggleOption(el.title, el.options[0])
                                    }} type="button" className="flex gap-2 font-medium text-[15px] items-center" >
                                        <span
                                            className={`w-5 h-5 relative z-10 rounded flex justify-center items-center text-white  ${ selected.includes(el.options[0]) ? "bg-green-600" : "bg-gray-300 text-transparent" } `} >
                                            <Check size={14} />
                                        </span>

                                        {el.title}
                                    </button>
                                </div>
                                :
                                <>
                                    <div className="w-full relative flex justify-between items-center py-3">
                                        <button type="button" className="flex gap-2 font-medium text-[15px] items-center" >
                                            <span
                                                className={`w-5 h-5 relative z-10 rounded flex justify-center items-center text-white  ${ selected.length > 0 ? "bg-green-600" : "bg-gray-300 text-transparent" } `} >
                                                <Check size={14} />
                                            </span>

                                            {el.title}
                                        </button>

                                        <button
                                            onClick={() => toggleOpenList(el.Key)}
                                            type="button"
                                            className="absolute flex justify-center items-center right-0 top-0 h-full w-12"
                                            >
                                            <ChevronDown className={`transition-transform ${ isOpen ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>

                                    <div className={isOpen ? 'block relative ps-2' : 'hidden'}>
                                        <div className={`absolute left-2 -top-8 bottom-0 w-0.5 bg-[#D4D4D4] h-full`} />
                                        {el.options.map((op) => (
                                            <div 
                                                key={op}
                                                className=" relative flex"
                                            >
                                                <svg
                                                    className=""
                                                    width="24"
                                                    height="40"
                                                    viewBox="0 0 24 40"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M 0 0 Q 0 20 20 20"
                                                        stroke="#D4D4D4"
                                                        strokeWidth="2"
                                                        fill="none"
                                                    />
                                                </svg>
                                                <button
                                                    onClick={() => {
                                                        toggleOption(el.title, op)
                                                    }}
                                                    type="button"
                                                    className=" flex items-center gap-2 py-2 cursor-pointer"
                                                    >
                                                    {selected.includes(op) ? 
                                                        <span className='w-5 rounded h-5 bg-green-600 flex justify-center items-center'><Check color='white' size={15}/></span>
                                                        :
                                                        <span className='w-5 rounded h-5 border border-black flex justify-center items-center'></span>
                                                    }
                                                    {op}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
