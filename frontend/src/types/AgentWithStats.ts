export interface AgentWithStats {
  agentId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bookingCount: number;
  lastBookingDate: string | null; // or Date if parsed
}
