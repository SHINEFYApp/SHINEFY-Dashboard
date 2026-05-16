import type { AxiosResponse } from "axios";
import {
  getService,
  postService,
  putService,
  deleteService,
} from "../service/service-requests";

export interface BroadcastUser {
  user_id: number;
  name: string;
  f_name?: string;
  l_name?: string;
  email?: string;
  phone?: string;
}

export interface BroadcastGroup {
  key: number | string;
  group_name: string;
}

export interface BroadcastTemplate {
  id: number;
  title: string;
  message: string;
}

export interface BroadcastDataResponse {
  status: string;
  data: {
    users: BroadcastUser[];
    temples: BroadcastUser[];
    groups: BroadcastGroup[];
    broadcasts: BroadcastTemplate[];
  };
}

export interface SendAllUsersPayload {
  all_user_title: string;
  all_user_message: string;
  welcome_message?: string;
  scheduled_time?: string;
}

export interface SendSelectUsersPayload {
  user_title: string;
  user_message: string;
  search_user: number[];
  scheduled_time?: string;
}

export interface SendAllTemplesPayload {
  all_temple_title: string;
  all_temple_message: string;
  scheduled_time?: string;
}

export interface SendSelectTemplesPayload {
  temple_title: string;
  temple_message: string;
  search_temple: number[];
  scheduled_time?: string;
}

export interface SendGroupPayload {
  temple_title: string;
  temple_message: string;
  search_group: string;
  scheduled_time?: string;
}

export interface SendResponse {
  status: string;
  data: {
    message: string;
  };
}

export interface BroadcastHistoryItem {
  notification_message_id: number;
  message: string;
  no_customers: number;
  createtime: string;
}

export interface BroadcastHistoryResponse {
  status: string;
  data: {
    current_page: number;
    data: BroadcastHistoryItem[];
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface BroadcastHistoryParams {
  per_page?: number;
  date?: string;
  page?: number;
}

export interface BroadcastDetailUser {
  user_id: number;
  user_type?: number;
  name: string;
  f_name?: string | null;
  l_name?: string | null;
  email?: string | null;
  phone_number?: number | string;
  image?: string | null;
  address?: string;
}

export interface BroadcastDetailItem {
  notification_message_id: number;
  user_id: number;
  other_user_id?: number;
  action?: string;
  action_id?: number | null;
  title: string;
  title_2?: string;
  message: string;
  message_2?: string;
  createtime: string;
  updatetime?: string;
  read_status?: number;
  delete_flag?: number;
  user: BroadcastDetailUser;
}

export interface BroadcastDetailResponse {
  status: string;
  data: BroadcastDetailItem;
}

export interface CommonMessage {
  id: number;
  title: string;
  message: string;
}

export interface CommonMessagesResponse {
  status: string;
  data: {
    data: CommonMessage[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CommonMessagePayload {
  title: string;
  message: string;
}

export interface CommonMessageResponse {
  status: string;
  data: CommonMessage;
}

export const getBroadcastData = async () => {
  const res: AxiosResponse<BroadcastDataResponse> = await getService("/api/admin/broadcast/data");
  return res.data;
};

export const sendBroadcastAllUsers = async (payload: SendAllUsersPayload) => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/all-users", payload);
  return res.data;
};

export const sendBroadcastSelectUsers = async (payload: SendSelectUsersPayload) => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/select-users", payload);
  return res.data;
};

export const sendBroadcastAllTemples = async (payload: SendAllTemplesPayload) => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/all-temples", payload);
  return res.data;
};

export const sendBroadcastSelectTemples = async (payload: SendSelectTemplesPayload) => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/select-temples", payload);
  return res.data;
};

export const sendBroadcastGroup = async (payload: SendGroupPayload) => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/group", payload);
  return res.data;
};

export const sendBroadcastAllServiceBoys = async () => {
  const res: AxiosResponse<SendResponse> = await postService("/api/admin/broadcast/all-service-boys", {});
  return res.data;
};

export const getBroadcastHistory = async (params: BroadcastHistoryParams) => {
  const res: AxiosResponse<BroadcastHistoryResponse> = await getService("/api/admin/broadcast/history", params);
  return res.data;
};

export const getBroadcastDetail = async (id: number) => {
  const res: AxiosResponse<BroadcastDetailResponse> = await getService(`/api/admin/broadcast/${id}`);
  return res.data;
};

export const getCommonMessages = async (params: { per_page?: number }) => {
  const res: AxiosResponse<CommonMessagesResponse> = await getService("/api/admin/common-broadcast-msgs", params);
  return res.data;
};

export const getCommonMessage = async (id: number) => {
  const res: AxiosResponse<CommonMessageResponse> = await getService(`/api/admin/common-broadcast-msgs/${id}`);
  return res.data;
};

export const addCommonMessage = async (payload: CommonMessagePayload) => {
  const res: AxiosResponse<CommonMessageResponse> = await postService("/api/admin/common-broadcast-msgs", payload);
  return res.data;
};

export const updateCommonMessage = async (id: number, payload: CommonMessagePayload) => {
  const res: AxiosResponse<CommonMessageResponse> = await putService(`/api/admin/common-broadcast-msgs/${id}`, payload);
  return res.data;
};

export const deleteCommonMessage = async (id: number) => {
  const res: AxiosResponse<{ status: string }> = await deleteService(`/api/admin/common-broadcast-msgs/${id}`);
  return res.data;
};
