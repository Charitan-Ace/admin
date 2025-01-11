export interface Project {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    tags: string[];
  }
  
  export interface Donation {
    category: string;
    value: number;
  }
  
  export interface NewDonor {
    period: string;
    count: number;
  }
  
  export interface RegionData {
    name: string;
    Education: number;
    Food: number;
    Healthcare: number;
  }
  
  export interface MockData {
    projects: Project[];
    donations: Donation[];
    newDonors: NewDonor[];
    continentData: RegionData[];
    countryData: RegionData[];
  }