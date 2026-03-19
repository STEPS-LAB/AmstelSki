export type BookingSuggestionType = "tonight" | "weekend" | "business";

export interface BookingStay {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}
