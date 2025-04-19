export interface Entertainer {
  entertainerId: number;
  stageName: string;
  bookingCount: number;
  lastBookingDate: string | null; // or Date if you convert it later
}
