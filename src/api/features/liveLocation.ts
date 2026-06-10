import api from "../service/axios";

export interface LiveDriver {
  user_id: number;
  name: string;
  phone: string;
  is_online: boolean;
  image: string | null;
  latitude: number | null;
  longitude: number | null;
  last_updated: string | null;
}

export interface LiveDriversResponse {
  success: string;
  data: LiveDriver[];
  online_count: number;
  offline_count: number;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface DriverRouteResponse {
  success: string;
  driver: {
    user_id: number;
    name: string;
    phone: string;
    is_online: boolean;
    image: string | null;
  };
  date: string;
  total_records: number;
  locations: RoutePoint[];
}

export const getAllLiveDrivers = (): Promise<LiveDriversResponse> =>
  api.get("api/live-drivers").then((r) => r.data);

export const getDriverRoute = (userId: number): Promise<DriverRouteResponse> =>
  api.get(`api/get_driver_location/${userId}`).then((r) => r.data);
