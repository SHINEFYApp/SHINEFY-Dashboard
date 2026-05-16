import { useParams, Link } from "react-router";
import { useGetBroadcastDetail } from "../../../api/features/broadcast.hooks";
import { ArrowLeft } from "lucide-react";

export default function BroadcastDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { data, isLoading } = useGetBroadcastDetail(numericId);

  const record = data?.data;

  if (isLoading) {
    return (
      <main>
        <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (!record) {
    return (
      <main>
        <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex items-center justify-center">
          <p className="text-gray-400">No data found</p>
        </div>
      </main>
    );
  }

  const receiver = record.user;

  return (
    <main>
      <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <Link
          to="/technicalSupport/broadcast"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={16} /> Back to Broadcast History
        </Link>

        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Broadcast Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{record.notification_message_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-medium">{record.title || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Message</p>
              <p className="font-medium">{record.message}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Action</p>
              <p className="font-medium">{record.action || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{record.createtime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Read Status</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  record.read_status === 1
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {record.read_status === 1 ? "Read" : "Unread"}
              </span>
            </div>
          </div>
        </div>

        {receiver && (
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-bold mb-4">Receiver</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{receiver.user_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{receiver.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{receiver.phone_number || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{receiver.email || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{receiver.address || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
