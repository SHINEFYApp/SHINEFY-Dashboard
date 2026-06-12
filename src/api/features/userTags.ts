import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

export interface UserTag {
    id: number;
    name: string;
    color: string;
    users_count?: number;
}

export const getUserTags = () =>
    axios.get(`${BASE}/api/admin/user-tags`).then((r) => r.data);

export const createUserTag = (data: { name: string; color: string }) =>
    axios.post(`${BASE}/api/admin/user-tags`, data).then((r) => r.data);

export const updateUserTag = (id: number, data: { name?: string; color?: string }) =>
    axios.put(`${BASE}/api/admin/user-tags/${id}`, data).then((r) => r.data);

export const deleteUserTag = (id: number) =>
    axios.delete(`${BASE}/api/admin/user-tags/${id}`).then((r) => r.data);

export const assignUserTags = (userId: number, tagIds: number[]) =>
    axios.post(`${BASE}/api/admin/user-tags/assign`, { user_id: userId, tag_ids: tagIds }).then((r) => r.data);

export const getUserTagsByUserId = (userId: number) =>
    axios.get(`${BASE}/api/admin/user-tags/user/${userId}`).then((r) => r.data);
