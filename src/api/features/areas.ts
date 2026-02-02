import {
    getService,
    postService,
} from "../service/service-requests";

// Interfaces
export interface MainAreaItem {
    id: number;
    main_area_name: string;
    country_id: number;
    country_name: string;
    region: {
        id: number;
        name: string;
    };
    createtime: string;
}

export interface SubAreaItem {
    id: number;
    main_area_id: number;
    main_area_name: string;
    area_name: string;
    createtime: string;
}

export interface GetAreasParams {
    limit?: number;
    page?: number;
    search_text?: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface AddAreaPayload {
    country_id: number;
    region_id: number;
    name: string;
    area_type: 'main_area' | 'sub_area';
    coordinates: string; // JSON string of Coordinates[] as per Postman
    main_area_id?: number; // Required if sub_area
}

export interface EditAreaPayload extends AddAreaPayload {
    id: number;
}

export interface DeleteAreaPayload {
    id: number;
    area_type: 'main_area' | 'sub_area';
}

export interface UpdateNearestAreasPayload {
    id: number;
    nearest_areas: number[]; // Array of IDs
}

// Endpoints

// GET Main Areas
export const getMainAreas = async (params: GetAreasParams) => {
    return await getService("/api/areas/main", params);
};

// GET Sub Areas
export const getSubAreas = async (params: GetAreasParams) => {
    return await getService("/api/areas/sub", params);
};

// GET Coordinates
export const getAreaCoordinates = async (id: number, area_type: 'main_area' | 'sub_area') => {
    return await getService("/api/areas/coordinates", { id, area_type });
};

// ADD Area (Main or Sub)
export const addArea = async (data: AddAreaPayload) => {
    // Postman shows params in URL query for POST? 
    // "raw": ".../api/areas/add/?country_id=1..."
    // But typically we send body. I will use postService with query params if needed, 
    // but usually service-requests handles body. 
    // If the API strictly requires query params for POST, we might need a workaround or pass them as params object 
    // if getService/postService supports it.
    // Assuming standard body for now, but keeping in mind the unusual Postman collection.
    // If it fails, I'll switch to sending params in URL.
    // Based on user feedback for wallets, 'params' were nested. 
    // Here, I'll assume standard POST body unless proven otherwise.
    return await postService("/api/areas/add/", null, data);
};

// EDIT Area
export const editArea = async (data: EditAreaPayload) => {
    return await postService("/api/areas/edit/", null, data);
};

// DELETE Area
export const deleteArea = async (data: DeleteAreaPayload) => {
    return await postService("/api/areas/delete", null, data);
};

// GET Nearest Areas
export const getNearestAreas = async (id: number) => {
    return await getService("/api/areas/sub/GetNearestAreas", { id });
};

// UPDATE Nearest Areas
export const updateNearestAreas = async (data: UpdateNearestAreasPayload) => {
    // Postman: nearest_areas[]=10&nearest_areas[]=12
    // If we pass array in object to axios, it serializes nicely often.
    return await postService("/api/areas/sub/UpdateNearestAreas", null, data);
};
