import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FilterHeader } from "@/common/FilterHeader";
import { CustomTable } from "@/common/CustomTable";
import { useGetContactList, useDeleteContact, useExportContact } from "@/api/features/contactUs.hooks";
import { toast } from "sonner";
import type { ContactItem } from "@/api/features/contactUs";
import ContactDetailModal from "./ContactDetailModal";
import ContactReplyModal from "./ContactReplyModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

export default function ContactUs() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactItem | null>(null);
  const perPage = 15;

  const { data, isLoading } = useGetContactList({ per_page: perPage, page, search });
  const deleteMutation = useDeleteContact();
  const exportMutation = useExportContact();

  const contacts = data?.data?.data?.contacts ?? [];
  const pagination = data?.data?.data?.pagination ?? { total: 0, per_page: perPage, current_page: 1, last_page: 1 };

  const handleSearch = useCallback((values: any) => {
    setSearch(values.search || "");
    setPage(1);
  }, []);

  const handleExport = useCallback(
    (value: string) => {
      const type = value.toLowerCase() as "csv" | "excel" | "pdf";
      exportMutation.mutate(
        { type, params: { search } },
        {
          onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `contact-us.${type === "excel" ? "xlsx" : type}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
          onError: () => {
            toast.error(t("common.error"));
          },
        }
      );
    },
    [exportMutation, search, t]
  );

  const handleView = useCallback((contact: ContactItem) => {
    setSelectedContact(contact);
    setDetailOpen(true);
  }, []);

  const handleReply = useCallback((contact: ContactItem) => {
    setSelectedContact(contact);
    setReplyOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }, [deleteMutation, deleteTarget]);

  const columns = [
    {
      key: "id",
      title: "#",
      width: "w-16",
    },
    {
      key: "name",
      title: t("technicalSupport.contactUsList.name"),
      sortable: true,
      sortKey: "name",
    },
    {
      key: "email",
      title: t("technicalSupport.contactUsList.email"),
    },
    {
      key: "message",
      title: t("technicalSupport.contactUsList.message"),
      render: (value: string) => (
        <span className="line-clamp-1 max-w-[250px] block">{value}</span>
      ),
    },
    {
      key: "phone_number",
      title: t("technicalSupport.contactUsList.phoneNumber"),
    },
    {
      key: "user_name",
      title: t("technicalSupport.contactUsList.userName"),
    },
    {
      key: "is_replied",
      title: t("technicalSupport.contactUsList.isReplied"),
      render: (value: boolean) => (
        <span
          className={`font-semibold ${
            value ? "text-green-600" : "text-red-600"
          }`}
        >
          {value ? t("technicalSupport.contactUsList.replied") : t("technicalSupport.contactUsList.notReplied")}
        </span>
      ),
    },
    {
      key: "created_at",
      title: t("technicalSupport.contactUsList.createdAt"),
    },
    {
      key: "actions",
      title: t("technicalSupport.contactUsList.actions"),
      width: "w-[250px]",
      render: (_: any, record: ContactItem) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(record);
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("technicalSupport.contactUsList.view")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReply(record);
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t("technicalSupport.contactUsList.reply")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(record);
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            {t("technicalSupport.contactUsList.delete")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <FilterHeader
        subtitle={t("technicalSupport.contactUs")}
        searchInitialValues={{ search: "" }}
        onSearchSubmit={handleSearch}
        searchPlaceholder={t("technicalSupport.contactUsList.searchPlaceholder")}
        filterInitialValues={{}}
        onFilterSubmit={() => {}}
        showExport={true}
        exportOptions={["CSV", "Excel", "PDF"]}
        onExport={handleExport}
      />

      <div className="px-4">
        <CustomTable
          columns={columns}
          data={contacts}
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          totalEntries={pagination.total}
          pageSize={pagination.per_page}
          onPageChange={setPage}
          isLoading={isLoading}
          onRowClick={(row) => handleView(row as ContactItem)}
        />
      </div>

      <ContactDetailModal
        contactId={selectedContact?.id ?? null}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      <ContactReplyModal
        contactId={selectedContact?.id ?? null}
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
