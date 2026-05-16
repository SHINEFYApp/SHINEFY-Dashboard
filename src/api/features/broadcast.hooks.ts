import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getBroadcastData,
  sendBroadcastAllUsers,
  sendBroadcastSelectUsers,
  sendBroadcastAllTemples,
  sendBroadcastSelectTemples,
  sendBroadcastGroup,
  sendBroadcastAllServiceBoys,
  getBroadcastHistory,
  getBroadcastDetail,
  getCommonMessages,
  getCommonMessage,
  addCommonMessage,
  updateCommonMessage,
  deleteCommonMessage,
  type BroadcastDataResponse,
  type SendAllUsersPayload,
  type SendSelectUsersPayload,
  type SendAllTemplesPayload,
  type SendSelectTemplesPayload,
  type SendGroupPayload,
  type SendResponse,
  type BroadcastHistoryResponse,
  type BroadcastHistoryParams,
  type BroadcastDetailResponse,
  type CommonMessagesResponse,
  type CommonMessageResponse,
  type CommonMessagePayload,
} from "./broadcast";

export const broadcastKeys = {
  all: ["broadcast"] as const,
  data: () => [...broadcastKeys.all, "data"] as const,
  history: (params: BroadcastHistoryParams) => [...broadcastKeys.all, "history", params] as const,
  detail: (id: number) => [...broadcastKeys.all, "detail", id] as const,
  commonMessages: (params?: { per_page?: number }) => [...broadcastKeys.all, "common-messages", params] as const,
  commonMessage: (id: number) => [...broadcastKeys.all, "common-message", id] as const,
};

export const useGetBroadcastData = () => {
  return useQuery<BroadcastDataResponse, AxiosError>({
    queryKey: broadcastKeys.data(),
    queryFn: getBroadcastData,
  });
};

export const useSendBroadcastAllUsers = (options?: any) => {
  return useMutation<SendResponse, AxiosError, SendAllUsersPayload>({
    mutationFn: sendBroadcastAllUsers,
    ...options,
  });
};

export const useSendBroadcastSelectUsers = (options?: any) => {
  return useMutation<SendResponse, AxiosError, SendSelectUsersPayload>({
    mutationFn: sendBroadcastSelectUsers,
    ...options,
  });
};

export const useSendBroadcastAllTemples = (options?: any) => {
  return useMutation<SendResponse, AxiosError, SendAllTemplesPayload>({
    mutationFn: sendBroadcastAllTemples,
    ...options,
  });
};

export const useSendBroadcastSelectTemples = (options?: any) => {
  return useMutation<SendResponse, AxiosError, SendSelectTemplesPayload>({
    mutationFn: sendBroadcastSelectTemples,
    ...options,
  });
};

export const useSendBroadcastGroup = (options?: any) => {
  return useMutation<SendResponse, AxiosError, SendGroupPayload>({
    mutationFn: sendBroadcastGroup,
    ...options,
  });
};

export const useSendBroadcastAllServiceBoys = (options?: any) => {
  return useMutation<SendResponse, AxiosError, void>({
    mutationFn: sendBroadcastAllServiceBoys,
    ...options,
  });
};

export const useGetBroadcastHistory = (params: BroadcastHistoryParams) => {
  return useQuery<BroadcastHistoryResponse, AxiosError>({
    queryKey: broadcastKeys.history(params),
    queryFn: () => getBroadcastHistory(params),
  });
};

export const useGetBroadcastDetail = (id: number) => {
  return useQuery<BroadcastDetailResponse, AxiosError>({
    queryKey: broadcastKeys.detail(id),
    queryFn: () => getBroadcastDetail(id),
    enabled: !!id,
  });
};

export const useGetCommonMessages = (params?: { per_page?: number }) => {
  return useQuery<CommonMessagesResponse, AxiosError>({
    queryKey: broadcastKeys.commonMessages(params),
    queryFn: () => getCommonMessages(params || {}),
  });
};

export const useGetCommonMessage = (id: number) => {
  return useQuery<CommonMessageResponse, AxiosError>({
    queryKey: broadcastKeys.commonMessage(id),
    queryFn: () => getCommonMessage(id),
    enabled: !!id,
  });
};

export const useAddCommonMessage = (options?: any) => {
  return useMutation<CommonMessageResponse, AxiosError, CommonMessagePayload>({
    mutationFn: addCommonMessage,
    ...options,
  });
};

export const useUpdateCommonMessage = (options?: any) => {
  return useMutation<CommonMessageResponse, AxiosError, { id: number; data: CommonMessagePayload }>({
    mutationFn: ({ id, data }) => updateCommonMessage(id, data),
    ...options,
  });
};

export const useDeleteCommonMessage = (options?: any) => {
  return useMutation<{ status: string }, AxiosError, number>({
    mutationFn: deleteCommonMessage,
    ...options,
  });
};
