import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { updateBooking, getBookingLogs } from "./bookings";
import type { UpdateBookingPayload, BookingLogsResponse } from "../../types/bookings";

export const useUpdateBooking = (bookingId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, UpdateBookingPayload>({
        mutationFn: (data) => updateBooking(bookingId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking", "details", String(bookingId)] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
    });
};

export const useBookingLogs = (bookingId: number | string, per_page?: number) => {
    return useQuery<BookingLogsResponse>({
        queryKey: ["booking", "logs", String(bookingId), per_page],
        queryFn: () => getBookingLogs(bookingId, per_page),
        enabled: !!bookingId,
    });
};
