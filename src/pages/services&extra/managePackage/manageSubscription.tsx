import { useState } from "react"
import { Form, Formik } from "formik"
import { Link } from "react-router"
import { Search, ExternalLink } from "lucide-react"
import { FormInput } from "../../../common/FormInput"
import { FormDropdown } from "../../../common/FormDropdown"
import { CustomTable } from "../../../common/CustomTable"
import { useGetUserPackages } from "../../../api/features/userPackages.hooks"
import { useResendPaymentLink } from "../../../api/features/subscriptionPackage.hooks"
import type { UserPackageItem } from "../../../api/features/userPackages"
import { toast } from "sonner"

const statusOptions = ["", "pending", "active", "finished"]

const statusLabels: Record<string, string> = {
    pending: "Pending",
    active: "Active",
    finished: "Finished",
}

const columns = [
    { key: "id", title: "ID" },
    { key: "user_name", title: "User Name" },
    { key: "user_email", title: "Email" },
    { key: "user_mobile", title: "Mobile" },
    { key: "package_name", title: "Package" },
    {
        key: "status",
        title: "Status",
        render: (_: any, row: UserPackageItem) => {
            const colors: Record<string, string> = {
                pending: "text-[#FFC107] bg-[#FFF8E1] border-[#FFC107]",
                active: "text-green-600 bg-green-50 border-green-500",
                finished: "text-gray-500 bg-gray-100 border-gray-400",
            }
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[row.status] || "text-gray-500 bg-gray-100"}`}>
                    {statusLabels[row.status] || row.status}
                </span>
            )
        },
    },
    { key: "total_price", title: "Total Price" },
    { key: "payment_method", title: "Payment" },
    {
        key: "created_at_formatted",
        title: "Created At",
    },
    {
        key: "action",
        title: "Action",
        render: (_: any, row: UserPackageItem) => {
            const { mutate: resendLink, isPending: resending } = useResendPaymentLink({
                onSuccess: (data: any) => {
                    toast.success("Payment link generated")
                    if (data.payment_url) {
                        window.open(data.payment_url, "_blank")
                    }
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Failed to generate link")
                },
            })

            return (
                <div className="flex gap-2 items-center">
                    {row.status === "pending" && (
                        <button
                            onClick={() => resendLink({ user_package_id: row.id })}
                            disabled={resending}
                            className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-white hover:bg-[#1976D2] p-2 font-semibold transition-colors text-xs"
                        >
                            <ExternalLink className="w-4 h-4" />
                            {resending ? "..." : "Payment Link"}
                        </button>
                    )}
                </div>
            )
        },
    },
]

export default function ManageSubscription() {
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const pageSize = 15

    const { data, isLoading } = useGetUserPackages({
        page: currentPage,
        per_page: pageSize,
        search: search || undefined,
        status: statusFilter || undefined,
    })

    const userPackages: UserPackageItem[] = data?.data?.user_packages || []
    const pagination = data?.data?.pagination
    const totalEntries = pagination?.total || 0
    const totalPages = pagination?.last_page || 0

    const handleSubmit = (values: { search: string }) => {
        setSearch(values.search)
        setCurrentPage(1)
    }

    const handleStatusChange = (value: string) => {
        setStatusFilter(value)
        setCurrentPage(1)
    }

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <div className="mb-6">
                <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
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
                                    <div className="w-full md:w-[160px]">
                                        <FormDropdown
                                            name="status"
                                            label=""
                                            placeholder="All Status"
                                            options={["pending", "active", "finished"]}
                                            className="mb-0"
                                            onChangeExternal={handleStatusChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-5">
                                    <Link
                                        to="/services&extra/manage/Package/addSubscriptionPackage"
                                        className="w-full lg:w-[180px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                        Add Subscription
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <CustomTable
                    columns={columns}
                    data={userPackages}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            )}
        </main>
    )
}
