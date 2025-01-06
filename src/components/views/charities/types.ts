export interface Charity {
  id: number;
  name: string;
  status: string;
  donationGoal: number;
}

export interface MockData {
  charities: Charity[];
}
