export interface Donor {
  id: number;
  name: string;
  status: string;
  donationAmount: number;
}

export interface MockData {
  donors: Donor[];
}
