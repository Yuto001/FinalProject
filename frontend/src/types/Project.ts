export interface Agent {
  agentId: number;
  agtFirstName: string;
  agtLastName: string;
  agtStreetAddress: string;
  agtCity: string;
  agtState: string;
  agtZipCode: string;
  agtPhoneNumber: string;
  dateHired: string; // ISO date string (can convert to Date if needed)
  salary: number;
  commissionRate: number;
}
