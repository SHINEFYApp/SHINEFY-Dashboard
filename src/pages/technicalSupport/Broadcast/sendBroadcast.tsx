import { Form, Formik } from "formik";
import { AnimatedTabs } from "../../../components/booking/AnimatedTabs";
import { useSearchParams, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { broadcastTabs } from "../../../constants/data";
import { FormInput } from "../../../common/FormInput";
import { TextArea } from "../../../common/textArea";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimePicker } from "../../../common/FormTimePicker";
import { SearchableFormDropdown } from "../../../common/SearchableFormDropdown";
import {
  BroadcastAllUsersInitialValues,
  BroadcastSelectUsersInitialValues,
  BroadcastAllTemplesInitialValues,
  BroadcastSelectTemplesInitialValues,
  BroadcastGroupInitialValues,
} from "../../../constants/initialValues";
import {
  BroadcastAllUsersValidationSchema,
  BroadcastSelectUsersValidationSchema,
  BroadcastAllTemplesValidationSchema,
  BroadcastSelectTemplesValidationSchema,
  BroadcastGroupValidationSchema,
} from "../../../constants/validationSchema";
import {
  useGetBroadcastData,
  useSendBroadcastAllUsers,
  useSendBroadcastSelectUsers,
  useSendBroadcastAllTemples,
  useSendBroadcastSelectTemples,
  useSendBroadcastGroup,
  useSendBroadcastAllServiceBoys,
  useGetCommonMessages,
  useAddCommonMessage,
  useDeleteCommonMessage,
} from "../../../api/features/broadcast.hooks";
import { toast } from "sonner";
import { Trash2, Plus, Search } from "lucide-react";
import { CustomTable } from "../../../common/CustomTable";
import type { BroadcastUser } from "../../../api/features/broadcast";

const staticGroups = [
  { key: "NEW_USERS", group_name: "NEW USERS" },
  { key: "ACTIVE_USERS", group_name: "ACTIVE USERS" },
  { key: "SPECIAL_USERS", group_name: "SPECIAL USERS" },
];

function UserCheckboxList({
  users,
  selected,
  onChange,
  label,
}: {
  users: BroadcastUser[];
  selected: number[];
  onChange: (ids: number[]) => void;
  label: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.phone?.includes(search)
      ),
    [users, search]
  );

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      <div className="relative mb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-10 text-sm"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-1">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 p-2">No results</p>
        )}
        {filtered.map((user) => (
          <label
            key={user.user_id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(user.user_id)}
              onChange={() => toggle(user.user_id)}
              className="w-4 h-4"
            />
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              {user.phone && (
                <p className="text-xs text-gray-400">{user.phone}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          {selected.length} selected
        </p>
      )}
    </div>
  );
}

function CommonMessagesSidebar({
  onSelect,
}: {
  onSelect: (title: string, message: string) => void;
}) {
  const { data: msgsData } = useGetCommonMessages({ per_page: 50 });
  const { mutate: addMsg } = useAddCommonMessage({
    onSuccess: () => {
      toast.success("Message added");
      setShowAdd(false);
      setNewTitle("");
      setNewMessage("");
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const { mutate: deleteMsg } = useDeleteCommonMessage({
    onSuccess: () => toast.success("Message deleted"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const messages = msgsData?.data?.data || [];

  const handleAdd = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      toast.error("Title and message are required");
      return;
    }
    addMsg({ title: newTitle, message: newMessage });
  };

  return (
    <div className="w-[349px] bg-[#E9EAEC] rounded-lg h-fit p-5">
      <h1 className="mb-5 font-bold text-[18px]">Common Broadcast Messages</h1>
      <div className="flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="w-full p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(msg.title, msg.message)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#919191]">Title</p>
                <p className="text-[14px] font-medium truncate">{msg.title}</p>
                <p className="text-[12px] text-[#919191] mt-1">Message</p>
                <p className="text-[14px] truncate">{msg.message}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMsg(msg.id);
                }}
                className="ml-2 shrink-0"
              >
                <Trash2 color="red" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAdd && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
          />
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium"
          >
            Save Message
          </button>
        </div>
      )}
      {!showAdd && (
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="w-full mt-4 bg-black text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Broadcast Message
        </button>
      )}
      <Link
        to="/technicalSupport/broadcast/common-messages"
        className="block w-full mt-2 text-center text-sm text-gray-600 underline"
      >
        Manage Saved Messages
      </Link>
    </div>
  );
}

export default function SendBroadcast() {
  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs = broadcastTabs.map((t) => t.id);
  const getValidTab = (): string => {
    const tabParam = searchParams.get("tab");
    return tabParam && validTabs.includes(tabParam) ? tabParam : "allUsers";
  };
  const [activeTab, setActiveTab] = useState<string>(getValidTab());

  useEffect(() => {
    const tab = getValidTab();
    setActiveTab(tab);
    if (searchParams.get("tab") !== tab) {
      const params = new URLSearchParams();
      params.set("tab", tab);
      setSearchParams(params, { replace: true });
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams();
    params.set("tab", tabId);
    setSearchParams(params, { replace: true });
  };

  const { data: broadcastData } = useGetBroadcastData();

  const users = broadcastData?.data?.users || [];
  const temples = broadcastData?.data?.temples || [];
  const apiGroups = broadcastData?.data?.groups || [];
  const groups = [...staticGroups, ...apiGroups];

  const sendAllUsers = useSendBroadcastAllUsers({
    onSuccess: () => {
      toast.success("Broadcast sent to all users");
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const sendSelectUsers = useSendBroadcastSelectUsers({
    onSuccess: () => toast.success("Broadcast sent to selected users"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const sendAllTemples = useSendBroadcastAllTemples({
    onSuccess: () => toast.success("Broadcast sent to all temples"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const sendSelectTemples = useSendBroadcastSelectTemples({
    onSuccess: () => toast.success("Broadcast sent to selected temples"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const sendGroup = useSendBroadcastGroup({
    onSuccess: () => toast.success("Broadcast sent to group"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });
  const sendAllServiceBoys = useSendBroadcastAllServiceBoys({
    onSuccess: () => toast.success("Broadcast sent to all service boys"),
    onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
  });

  const buildScheduledTime = (date: any, time: any): string | undefined => {
    if (date && time) {
      return `${date} ${time}`;
    }
    return undefined;
  };

  const isPending =
    sendAllUsers.isPending ||
    sendSelectUsers.isPending ||
    sendAllTemples.isPending ||
    sendSelectTemples.isPending ||
    sendGroup.isPending ||
    sendAllServiceBoys.isPending;

  const handleSelectMessage = (
    title: string,
    message: string,
    setValues: (vals: Record<string, any>) => void
  ) => {
    switch (activeTab) {
      case "allUsers":
        setValues({ all_user_title: title, all_user_message: message });
        break;
      case "selectUsers":
        setValues({ user_title: title, user_message: message });
        break;
      case "allTemples":
        setValues({ all_temple_title: title, all_temple_message: message });
        break;
      case "selectTemples":
        setValues({ temple_title: title, temple_message: message });
        break;
      case "group":
        setValues({ temple_title: title, temple_message: message });
        break;
    }
  };

  const getInitialValues = () => {
    switch (activeTab) {
      case "allUsers":
        return BroadcastAllUsersInitialValues;
      case "selectUsers":
        return BroadcastSelectUsersInitialValues;
      case "allTemples":
        return BroadcastAllTemplesInitialValues;
      case "selectTemples":
        return BroadcastSelectTemplesInitialValues;
      case "group":
        return BroadcastGroupInitialValues;
      default:
        return BroadcastAllUsersInitialValues;
    }
  };

  const getValidationSchema = () => {
    switch (activeTab) {
      case "allUsers":
        return BroadcastAllUsersValidationSchema;
      case "selectUsers":
        return BroadcastSelectUsersValidationSchema;
      case "allTemples":
        return BroadcastAllTemplesValidationSchema;
      case "selectTemples":
        return BroadcastSelectTemplesValidationSchema;
      case "group":
        return BroadcastGroupValidationSchema;
      default:
        return BroadcastAllUsersValidationSchema;
    }
  };

  const handleSubmit = (values: any) => {
    const scheduled_time = buildScheduledTime(
      values.dateScheduleNotification,
      values.timeScheduleNotification
    );

    switch (activeTab) {
      case "allUsers":
        sendAllUsers.mutate({
          all_user_title: values.all_user_title,
          all_user_message: values.all_user_message,
          welcome_message: values.welcome_message || undefined,
          scheduled_time,
        });
        break;
      case "selectUsers":
        sendSelectUsers.mutate({
          user_title: values.user_title,
          user_message: values.user_message,
          search_user: values.search_user,
          scheduled_time,
        });
        break;
      case "allTemples":
        sendAllTemples.mutate({
          all_temple_title: values.all_temple_title,
          all_temple_message: values.all_temple_message,
          scheduled_time,
        });
        break;
      case "selectTemples":
        sendSelectTemples.mutate({
          temple_title: values.temple_title,
          temple_message: values.temple_message,
          search_temple: values.search_temple,
          scheduled_time,
        });
        break;
      case "group":
        sendGroup.mutate({
          temple_title: values.temple_title,
          temple_message: values.temple_message,
          search_group: values.search_group,
          scheduled_time,
        });
        break;
    }
  };

  return (
    <main>
      <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
        <div className="mb-5">
          <AnimatedTabs
            tabs={broadcastTabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        {activeTab && (
          <div>
            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema()}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isValid, setValues, values }) => (
                <Form>
                  <div className="flex justify-between gap-6">
                    <div className="w-[376px] flex flex-col gap-5">
                      {activeTab === "allUsers" && (
                        <>
                          <FormInput
                            name="all_user_title"
                            label="Enter Title"
                            placeholder="Enter Title"
                            className="mb-0"
                            checkmark={false}
                          />
                          <TextArea
                            name="all_user_message"
                            label="Message"
                            placeholder="Message"
                          />
                          <TextArea
                            name="welcome_message"
                            label="Welcome Message (optional, prepended per user)"
                            placeholder="Welcome message"
                          />
                        </>
                      )}

                      {activeTab === "selectUsers" && (
                        <>
                          <FormInput
                            name="user_title"
                            label="Enter Title"
                            placeholder="Enter Title"
                            className="mb-0"
                            checkmark={false}
                          />
                          <TextArea
                            name="user_message"
                            label="Message"
                            placeholder="Message"
                          />
                          <UserCheckboxList
                            users={users}
                            selected={values.search_user || []}
                            onChange={(ids) =>
                              setValues({ ...values, search_user: ids })
                            }
                            label="Select Users"
                          />
                        </>
                      )}

                      {activeTab === "allTemples" && (
                        <>
                          <FormInput
                            name="all_temple_title"
                            label="Enter Title"
                            placeholder="Enter Title"
                            className="mb-0"
                            checkmark={false}
                          />
                          <TextArea
                            name="all_temple_message"
                            label="Message"
                            placeholder="Message"
                          />
                        </>
                      )}

                      {activeTab === "selectTemples" && (
                        <>
                          <FormInput
                            name="temple_title"
                            label="Enter Title"
                            placeholder="Enter Title"
                            className="mb-0"
                            checkmark={false}
                          />
                          <TextArea
                            name="temple_message"
                            label="Message"
                            placeholder="Message"
                          />
                          <UserCheckboxList
                            users={temples}
                            selected={values.search_temple || []}
                            onChange={(ids) =>
                              setValues({ ...values, search_temple: ids })
                            }
                            label="Select Temples (Service Boys)"
                          />
                        </>
                      )}

                      {activeTab === "group" && (
                        <>
                          <FormInput
                            name="temple_title"
                            label="Enter Title"
                            placeholder="Enter Title"
                            className="mb-0"
                            checkmark={false}
                          />
                          <TextArea
                            name="temple_message"
                            label="Message"
                            placeholder="Message"
                          />
                          <SearchableFormDropdown
                            name="search_group"
                            label="Select Group"
                            placeholder="Select Group"
                            options={groups.map((g) => ({
                              value: String(g.key),
                              label: g.group_name,
                            }))}
                          />
                        </>
                      )}

                      <FormDatePicker
                        name="dateScheduleNotification"
                        label="Select Date Schedule Notification (optional)"
                        checkmark={true}
                      />
                      <FormTimePicker
                        name="timeScheduleNotification"
                        label="Select Time Schedule Notification (optional)"
                      />

                      <button
                        disabled={!isValid || isPending}
                        type="submit"
                        className="w-full mt-10 bg-[#FFC107] rounded-xl font-bold text-[20px] py-2 hover:opacity-90 disabled:opacity-50"
                      >
                        {isPending ? "Sending..." : "Send"}
                      </button>

                    
                    </div>

                    <CommonMessagesSidebar
                      onSelect={(title, message) =>
                        handleSelectMessage(title, message, setValues)
                      }
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </main>
  );
}
