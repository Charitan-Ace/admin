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
    newDonors: NewDonor[];
    continentData: RegionData[];
    countryData: RegionData[];
  }

  interface StatisticsParams {
    userId?: string;
    role?: string;
    category?: string;
    isoCode?: string;
    continent?: string;
    status?: string;
  }
  
  interface StatisticsResponse {
    totalDonations?: number;
    totalProjects?: number;
    [key: string]: any;
  }
  
  interface NewUserParams {
    time?: 'week' | 'month' | 'year';
  }
  
  interface NewUserResponse {
    count: number;
    period: string;
    data: Array<{
      date: string;
      count: number;
    }>;
  }