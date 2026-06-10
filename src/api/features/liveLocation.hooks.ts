import { useQuery } from "@tanstack/react-query";
import { getAllLiveDrivers, getDriverRoute } from "./liveLocation";

// Poll every 30 seconds — matches the driver's location update interval
export const useLiveDrivers = () =>
  useQuery({
    queryKey: ["live-drivers"],
    queryFn: getAllLiveDrivers,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
  });

export const useDriverRoute = (userId: number | null) =>
  useQuery({
    queryKey: ["driver-route", userId],
    queryFn: () => getDriverRoute(userId!),
    enabled: !!userId,
  });
