import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Calendar, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { CustomTable } from "../../../common/CustomTable";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { useState } from "react";
import { useGetBroadcastHistory } from "../../../api/features/broadcast.hooks";

const columns = [
  {
    key: "notification_message_id",
    title: "#",
  },
  {
    key: "message",
    title: "Message",
  },
  {
    key: "no_customers",
    title: "Customers",
  },
  {
    key: "createtime",
    title: "Broadcast Date",
  },
];

export default function Broadcast() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const pageSize = 10;

  const { data, isLoading } = useGetBroadcastHistory({
    per_page: pageSize,
    page: currentPage,
    date: searchDate || undefined,
  });

  const historyData = data?.data?.data || [];
  const total = data?.data?.total || 0;
  const lastPage = data?.data?.last_page || 1;

  const handleSubmit = (values: { search: string; date: string }) => {
    setSearchDate(values.date || "");
    setCurrentPage(1);
  };

  const handleRowClick = (row: any) => {
    navigate(
      `/technicalSupport/broadcast/${row.notification_message_id}`
    );
  };

  return (
    <main>
      <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <div className="mb-6">
          <Formik
            initialValues={{
              search: "",
              date: "",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <FormDatePicker
                        name="date"
                        label=""
                        placeholder="Filter by date"
                        icon={<Calendar className="w-5 h-5" />}
                        className="mb-0 w-[248px]"
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
                  <div className="flex flex-col lg:flex-row items-center gap-5">
                    <Link
                      to={"/technicalSupport/broadcast/SendBroadcast"}
                      className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                    >
                      Send Broadcast
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="cursor-pointer">
          <CustomTable
            columns={columns}
            data={historyData}
            currentPage={currentPage}
            totalPages={lastPage}
            totalEntries={total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </main>
  );
}
