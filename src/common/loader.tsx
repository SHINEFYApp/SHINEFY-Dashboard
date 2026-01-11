import { Skeleton } from "../components/ui/skeleton";
import CarLoad from '../assets/images/Untitled_design.gif'

interface skeletonDemoProps {
    quantity?: number
}

export function SkeletonDemo({quantity = 1} : skeletonDemoProps) {
  return (
    <div className="flex flex-wrap gap-5 space-y-10">
        {Array.from({ length : quantity }).map((_,index) => {
            return(
                <div key={index} className="flex flex-1 items-center w-full h-full justify-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px] bg-gray-200" />
                        <Skeleton className="h-4 w-[200px] bg-gray-200" />
                    </div>
                </div>
            )
        })
        }
    </div>
  );
}

import { cn } from "../utils/utils";

export function TableLoading(){
    const columns = Array.from({ length: 3 }).map((_, index) => (
        <SkeletonDemo key={index} />
    ));

    return (
        <div className="size-full bg-white rounded-lg border border-[#cfcfcf] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#cfcfcf] bg-[#f0f0f0]">
                            {columns.map((column, index) => (
                                <th
                                    key={column.key}
                                    className={cn(
                                        "px-6 py-4 text-left text-nowrap text-sm font-semibold text-gray-700",
                                        index !== columns.length - 1 && "border-r border-[#cfcfcf]",
                                    )}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_ , index) => {
                            return(
                                <tr
                                    key={index}
                                    className="border-b border-[#cfcfcf] hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className={cn(
                                                "px-6 py-4 text-sm text-gray-600",
                                            )}
                                        >
                                        {column}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default function ProductPages(){

    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-5000">
            <img src={CarLoad} alt="" className="w-100 h-50"/>
        </div>
    )
}