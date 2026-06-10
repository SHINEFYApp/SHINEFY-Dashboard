// src/api/features/contactUs.hooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
    getContactList,
    getContactDetail,
    getContactReplies,
    sendContactReply,
    deleteContact,
    exportContactCsv,
    exportContactExcel,
    exportContactPdf,
    type GetContactListParams,
    type SendReplyPayload,
} from "./contactUs";

export const useGetContactList = (params: GetContactListParams, options?: any) => {
    return useGet({
        queryFn: () => getContactList(params),
        queryKey: ["contact-us", params],
        options,
    });
};

export const useGetContactDetail = (id: number | string | null, options?: any) => {
    return useGet({
        queryFn: () => getContactDetail(id!),
        queryKey: ["contact-us", "detail", id],
        options: { enabled: !!id, ...options },
    });
};

export const useGetContactReplies = (id: number | string | null, options?: any) => {
    return useGet({
        queryFn: () => getContactReplies(id!),
        queryKey: ["contact-us", "replies", id],
        options: { enabled: !!id, ...options },
    });
};

export const useSendContactReply = (contactId: number | string, options?: any) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation<any, AxiosError, SendReplyPayload>({
        mutationFn: (data) => sendContactReply(contactId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact-us"] });
            toast.success(t("technicalSupport.replySentSuccess"));
        },
        ...options,
    });
};

export const useDeleteContact = (options?: any) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id) => deleteContact(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact-us"] });
            toast.success(t("technicalSupport.deleteSuccess"));
        },
        ...options,
    });
};

export const useExportContact = (options?: any) => {
    return useMutation<any, AxiosError, { type: "csv" | "excel" | "pdf"; params: any }>({
        mutationFn: ({ type, params }) => {
            if (type === "csv") return exportContactCsv(params);
            if (type === "excel") return exportContactExcel(params);
            return exportContactPdf(params);
        },
        ...options,
    });
};
