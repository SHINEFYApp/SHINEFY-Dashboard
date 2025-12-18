import { ArrowUpToLine, Calendar, Eye, Search, Shield, SlidersHorizontal, Trash2 } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { FormInput } from "../../common/FormInput";
import { FormDatePicker } from "../../common/FormDatePicker";
import { Link, useNavigate } from "react-router";

const types = ['type one', 'type two', 'type three'];
const status = ['Open', 'Closed'];
export const exportTypes = ['CSV', 'Excel', 'PDF'];
const Franchise = ['Franchise one', 'Franchise two', 'Franchise three'];

export const Tables = {
    manageBookings: {
        InitialValues: {
            search: "",
            date: "",
        },
        head: {
            headTitle: {
                one: 'Filter',
                two: 'Manage Bookings'
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-60 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <div className={`w-full md:w-48 lg:w-56 -space-y-2`}>
                    <FormDatePicker
                        name="date"
                        label=""
                        placeholder="Date"
                        icon={<Calendar className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                <button
                    type="button"
                    className="py-3 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0 self-end lg:self-auto"
                >
                    <SlidersHorizontal className="w-5 h-5 text-secondary-700" />
                </button>
            ]
        },
        columns: [
            {
                key: "bookingNumber",
                title: "Booking Number",
            },
            {
                key: "customerName",
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
                key: "paymentMethod",
                title: "Payment Method",
            },
            {
                key: "totalAmount",
                title: "Total Amount(EGP)",
            },
            {
                key: "action",
                title: "Action",
                render: () => (
                    <button
                        className="text-primary hover:text-primary-700 font-semibold transition-colors"
                        onClick={() => {
                            const navigate = useNavigate();
                            navigate('/bookings/manage/id');
                        }}
                    >
                        View Details
                    </button>
                ),
            },
        ]
    },
    manageSlots: {
        InitialValues: {
            type: "",
            status: "",
            date: "",
        },
        head: {
            headTitle: {
                one: 'Filter',
                two: 'Manage Slots'
            },
            leftSide: [
                <div className={`w-full md:w-[178px] -space-y-2`}>
                    <FormDropdown name="type" label="" placeholder="Type" options={types} className="mb-2" />
                </div>,
                <div className="w-full md:w-[178px] -space-y-2">
                    <FormDropdown name="status" label="" placeholder="Status" options={status} className="mb-2" />
                </div>,
                <div className={`w-full md:w-[150px] -space-y-2`}>
                    <FormDatePicker
                        name="date"
                        label=""
                        placeholder="Date"
                        icon={<Calendar className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <div className="w-full lg:w-[135px]">
                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                    </div>
                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                    <Link
                        to={"/bookings/slot/create"}
                        className="w-full lg:w-[94px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                    >
                        Add Slot
                    </Link>
                </div>
            ]
        },
        columns: [
            {
                key: "slotDate",
                title: "Slot Date",
            },
            {
                key: "createDateAndTim",
                title: "Create Date & Tim",
            },
            {
                key: "type",
                title: "Type",
            },
            {
                key: "startTime",
                title: "Start Time",
            },
            {
                key: "endTime",
                title: "End Time",
            },
            {
                key: "status",
                title: "Status",
            },
            {
                key: "action",
                title: "Action",
                render: () => (
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('updated item')}
                        >
                            <ArrowUpToLine /> update
                        </button>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('deleted item')}
                        >
                            <Trash2 /> delete
                        </button>
                    </div>
                ),
            },
        ]
    },
    manageSubAdmin: {
        InitialValues: {
            search: '',
            franchise: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-60 mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <div className="w-full md:w-52 lg:w-60 -space-y-2">
                    <FormDropdown name="franchise" label="" placeholder="Franchise" options={Franchise} className="mb-2" />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <a href="/users&staff/manage/subAdmin/addSubAdmin"
                        type="button"
                        className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        Add Sub Admin
                    </a>
                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                    <div className="w-full lg:w-[135px]">
                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                    </div>
                </div>
            ]
        },
        columns: [
            {
                key: "image",
                title: "Image",
            },
            {
                key: "name",
                title: "Name",
            },
            {
                key: "email",
                title: "Email",
            },
            {
                key: "phoneNumber",
                title: "Phone Number",
            },
            {
                key: "registrationOn",
                title: "Registration On",
            },
            {
                key: "status",
                title: "Status",
            },
            {
                key: "action",
                title: "Action",
                render: () => (
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-3 font-semibold transition-colors"
                            onClick={() => alert('updated item')}
                        >
                            <Eye /> View
                        </button>
                        <button
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-3 font-semibold transition-colors"
                            onClick={() => alert('updated item')}
                        >
                            <ArrowUpToLine /> Update
                        </button>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-2 py-3 font-semibold transition-colors"
                            onClick={() => alert('deleted item')}
                        >
                            <Trash2 /> Delete
                        </button>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3 py-3 font-semibold transition-colors"
                            onClick={() => alert('deleted item')}
                        >
                            <Shield /> Deactivated
                        </button>
                    </div>
                ),
            },
        ]
    },
    userWallets: {
        InitialValues: {
            search: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [

            ]
        },
        columns: [
            {
                key: "userName",
                title: "User Name",
            },
            {
                key: "mobileNumber",
                title: "Mobile Number",
            },
            {
                key: "amountType",
                title: "Amount typr",
            },
            {
                key: "type",
                title: "Type",
            },
            {
                key: "reason",
                title: "Reason",
            },
            {
                key: "createDateAndTime",
                title: "Create Date & Time",
            }
        ]
    },
    countries: {
        InitialValues: {
            search: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                
            ]
        },
        columns: [
            {
                key: "flag",
                title: "Flag",
            },
            {
                key: "name",
                title: "Name",
            },
            {
                key: "createDateAndTime",
                title: "Create Date & Time",
            },{
                key: "action",
                title: "Action",
                render: () => (
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('updated item')}
                        >
                            <ArrowUpToLine /> update
                        </button>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('deleted item')}
                        >
                            <Trash2 /> delete
                        </button>
                    </div>
                ),
            },
        ]
    },
    regions: {
        InitialValues: {
            search: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                
            ]
        },
        columns: [
            {
                key: "countries",
                title: "Countries",
            },
            {
                key: "regions",
                title: "Regions",
            },
            {
                key: "createDateAndTime",
                title: "Create Date & Time",
            },{
                key: "action",
                title: "Action",
                render: () => (
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('updated item')}
                        >
                            <ArrowUpToLine /> update
                        </button>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => alert('deleted item')}
                        >
                            <Trash2 /> delete
                        </button>
                    </div>
                ),
            },
        ]
    },
    area: {
        InitialValues: {
            search: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                
            ]
        },
        columns:{ 
           mainArea : [
                {
                    key: "countries",
                    title: "Countries",
                },
                {
                    key: "regions",
                    title: "Regions",
                },
                {
                    key: "createDateAndTime",
                    title: "Create Date & Time",
                },{
                    key: "action",
                    title: "Action",
                    render: () => (
                        <div className="flex gap-2 items-center">
                            <button
                                className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                                onClick={() => alert('updated item')}
                            >
                                <ArrowUpToLine /> update
                            </button>
                            <button
                                className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                                onClick={() => alert('deleted item')}
                            >
                                <Trash2 /> delete
                            </button>
                        </div>
                    ),
                },
            ],
           subArea : [
                {
                    key: "mainAreaName",
                    title: "Main Area Name",
                },
                {
                    key: "areaName",
                    title: "Area Name",
                },
                {
                    key: "createDateAndTime",
                    title: "Create Date & Time",
                },{
                    key: "action",
                    title: "Action",
                    render: () => (
                        <div className="flex gap-2 items-center">
                            <button
                                className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                                onClick={() => alert('updated item')}
                            >
                                <ArrowUpToLine /> update
                            </button>
                            <button
                                className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                                onClick={() => alert('deleted item')}
                            >
                                <Trash2 /> delete
                            </button>
                        </div>
                    ),
                },
            ]
        }
    },
    service: {
        InitialValues: {
            search: ''
        },
        head: {
            headTitle: {
                one: '',
                two: ''
            },
            leftSide: [
                <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                    <FormInput
                        name="search"
                        label=""
                        placeholder="Search"
                        icon={<Search className="w-5 h-5" />}
                        className="mb-0"
                        checkmark={false}
                    />
                </div>,
                <button
                    type="submit"
                    className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                    Search
                </button>
            ],
            rightSide: [
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <Link
                        to={"/services&extras/manage/Service/addService"}
                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                    >
                        Add Services
                    </Link>
                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                    <div className="w-full lg:w-[135px]">
                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                    </div>
                </div>
            ]
        },
        columns: [
            {
                key: "image",
                title: "Service Image",
            },
            {
                key: "serviceEnglishName",
                title: "Service English Name",
            },
            {
                key: "serviceArabicName",
                title: "Sevice Arabic Name",
            },
            {
                key: "servicePrice",
                title: "Sevice Price",
            },
            {
                key: "serviceTime",
                title: "Sevice Time [ min ]",
            },
            {
                key: "extraService",
                title: "Extra Service",
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
        ]
    },
};
