import { useState } from "react";
import { Form, Formik } from "formik";
import { Eye, Search, Trash2 } from "lucide-react"
import { FormDropdown } from "../../../../common/FormDropdown";
import { dummyManagePackageName, dummyManagePackageSubscription, exportTypes } from "../../../../constants/data";
import { FormInput } from "../../../../common/FormInput";
import { CustomTable } from "../../../../common/CustomTable";

const columns = [
  {
      key: "packageName",
      title: "Package Name",
  },
  {
      key: "userName",
      title: "User Name",
  },
  {
      key: "status",
      title: "Status",
  },
  {
      key: "price",
      title: "Price",
  },
  {
      key: "availableFrom",
      title: "Available From",
  },
  {
      key: "availableeTo",
      title: "Available To",
  },
  {
      key: "createDateAndTime",
      title: "Create Date & Time",
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
                  className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                  onClick={() => alert('deleted item')}
              >
                  <Trash2 /> delete
              </button>
          </div>
      ),
  },
]


export default function PackageSubscriptionTable(){
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values : {search : string , export: string}) => {
        console.log(`Search values: ${values.search} | Export File Extantion: ${values.export} `);
    };
    return(
        <section className={`w-full mt-10 bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <div className="mb-6">
                <Formik
                    initialValues={{
                        search: '',
                        export: '',
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({}) => (
                        <Form>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <h1 className=" tex-[20px] font-bold">Package Subscription</h1>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-5">
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
                                        className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                        Search
                                    </button>
                                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                    <div className="w-full lg:w-[135px]">
                                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <CustomTable
                columns={columns}
                data={dummyManagePackageSubscription}
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={totalEntries}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </section>
    )
}