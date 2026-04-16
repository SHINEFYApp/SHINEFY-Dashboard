import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { updateBooking } from "./bookings";
import type { UpdateBookingPayload } from "../../types/bookings";

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
