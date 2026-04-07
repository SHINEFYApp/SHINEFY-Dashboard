import type { AxiosResponse } from "axios";
import { getService, postService } from "../service/service-requests";

export interface GroupsParams {
    limit?: number;
    page?: number;
    search_text?: string;
}

export interface AddGroupParams {
    group_name: string;
    user_id: number[];
}

export interface EditGroupParams {
    group_id: number;
    group_name: string;
    user_id: number[];
}

export interface DeleteGroupParams {
    group_id: number;
}

export interface ExportGroupsParams {
    search_text?: string;
}

// GET /api/getGroups
export const getGroups = async (params: GroupsParams) => {
    const res: AxiosResponse = await getService("/api/getGroups", params);
    return res.data;
};

// POST /api/addGroup
export const addGroup = async (params: AddGroupParams) => {
    const res: AxiosResponse = await postService("/api/addGroup", params);
    return res.data;
};

// POST /api/editGroup
export const editGroup = async (params: EditGroupParams) => {
    const res: AxiosResponse = await postService("/api/editGroup", params);
    return res.data;
};

// POST /api/deleteGroup
export const deleteGroup = async (params: DeleteGroupParams) => {
    const res: AxiosResponse = await postService("/api/deleteGroup", params);
    return res.data;
};

// POST /api/groups/ExportGroups
export const exportGroups = async (params: ExportGroupsParams) => {
    const res: AxiosResponse = await postService("/api/groups/ExportGroups", params, { responseType: "blob" });
    return res.data;
};
