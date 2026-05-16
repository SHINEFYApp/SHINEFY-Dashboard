import { useState } from "react";
import { Link } from "react-router";
import { CustomTable } from "../../../common/CustomTable";
import {
  useGetCommonMessages,
  useAddCommonMessage,
  useUpdateCommonMessage,
  useDeleteCommonMessage,
} from "../../../api/features/broadcast.hooks";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

const columns = [
  { key: "id", title: "#" },
  { key: "title", title: "Title" },
  { key: "message", title: "Message" },
  {
    key: "action",
    title: "Action",
    render: (_: any, row: any) => null,
  },
];

export default function ManageCommonMessages() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, refetch } = useGetCommonMessages({
    per_page: pageSize,
  });

  const deleteMsg = useDeleteCommonMessage({
    onSuccess: () => {
      toast.success("Message deleted");
      refetch();
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });

  const addMsg = useAddCommonMessage({
    onSuccess: () => {
      toast.success("Message added");
      refetch();
      setShowForm(false);
      setEditId(null);
      setFormTitle("");
      setFormMessage("");
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });

  const updateMsg = useUpdateCommonMessage({
    onSuccess: () => {
      toast.success("Message updated");
      refetch();
      setShowForm(false);
      setEditId(null);
      setFormTitle("");
      setFormMessage("");
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const messages = data?.data?.data || [];
  const total = data?.data?.total || 0;
  const lastPage = data?.data?.last_page || 1;

  const handleEdit = (row: any) => {
    setEditId(row.id);
    setFormTitle(row.title);
    setFormMessage(row.message);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMsg.mutate(id);
    }
  };

  const handleSave = () => {
    if (!formTitle.trim() || !formMessage.trim()) {
      toast.error("Title and message are required");
      return;
    }
    if (editId) {
      updateMsg.mutate({ id: editId, data: { title: formTitle, message: formMessage } });
    } else {
      addMsg.mutate({ title: formTitle, message: formMessage });
    }
  };

  const tableColumns = [
    { key: "id", title: "#" },
    { key: "title", title: "Title" },
    { key: "message", title: "Message" },
    {
      key: "action",
      title: "Action",
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="bg-[#C9FFCB] px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-80"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="bg-[#FFD5D2] px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-80"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Common Broadcast Messages</h1>
          <div className="flex gap-3">
            <Link
              to="/technicalSupport/broadcast"
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:opacity-80"
            >
              Back to History
            </Link>
            <Link
              to="/technicalSupport/broadcast/SendBroadcast"
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:opacity-80"
            >
              Send Broadcast
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditId(null);
            setFormTitle("");
            setFormMessage("");
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-sm font-medium mb-6"
        >
          <Plus size={16} /> {showForm ? "Cancel" : "Add New Message"}
        </button>

        {showForm && (
          <div className="mb-6 p-6 bg-gray-50 rounded-xl max-w-lg">
            <h3 className="font-bold mb-4">
              {editId ? "Edit Message" : "New Message"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Message
                </label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Enter message"
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={addMsg.isPending || updateMsg.isPending}
                className="w-full bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                {addMsg.isPending || updateMsg.isPending
                  ? "Saving..."
                  : editId
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </div>
        )}

        <CustomTable
          columns={tableColumns}
          data={messages}
          currentPage={currentPage}
          totalPages={lastPage}
          totalEntries={total}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
