import { z } from "zod";

export const bookingStaySchema = z
  .object({
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
    adults: z.number().min(1).max(4),
    children: z.number().min(0).max(4),
  })
  .refine((value) => value.checkOut > value.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export const guestDetailsSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(8),
  notes: z.string().max(400),
});

export type BookingStayInput = z.infer<typeof bookingStaySchema>;
export type GuestDetailsInput = z.infer<typeof guestDetailsSchema>;
