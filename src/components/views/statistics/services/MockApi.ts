import { MockData } from "./types.ts";

class MockAPI {
  private mockData: MockData = {
    projects: [
      {
        id: 1,
        name: "Project Alpha",
        status: "active",
        tags: ["development", "frontend"],
      },
      {
        id: 2,
        name: "Project Beta",
        status: "inactive",
        tags: ["design", "backend"],
      },
      {
        id: 3,
        name: "Project Gamma",
        status: "active",
        tags: ["development", "API"],
      },
      { id: 4, name: "Project Delta", status: "inactive", tags: ["research"] },
      {
        id: 5,
        name: "Project Epsilon",
        status: "active",
        tags: ["frontend", "UI"],
      },
    ],
    donations: [
      { category: "Education", value: 5000 },
      { category: "Healthcare", value: 7000 },
      { category: "Environment", value: 3000 },
      { category: "Social Services", value: 4000 },
    ],
    newDonors: [
      { period: "Week 1", count: 20 },
      { period: "Week 2", count: 25 },
      { period: "Week 3", count: 30 },
      { period: "Week 4", count: 35 },
    ],
    continentData: [
      { name: "Africa", Education: 2000, Food: 3000, Healthcare: 2500 },
      { name: "Asia", Education: 3000, Food: 2000, Healthcare: 3500 },
      { name: "Europe", Education: 4000, Food: 1500, Healthcare: 3000 },
      { name: "North America", Education: 3500, Food: 2500, Healthcare: 4000 },
      { name: "South America", Education: 1500, Food: 2000, Healthcare: 1500 },
      { name: "Oceania", Education: 1000, Food: 1000, Healthcare: 1000 },
    ],
    countryData: [
      { name: "Vietnam", Education: 1000, Food: 1500, Healthcare: 1200 },
      { name: "Thailand", Education: 1200, Food: 1000, Healthcare: 1400 },
      { name: "Indonesia", Education: 800, Food: 1200, Healthcare: 900 },
    ],
  };

  private async simulateNetworkDelay() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  private filterByColumn<T extends Record<string, any>>(
    data: T[],
    column: keyof T,
    value: string
  ): T[] {
    return data.filter((item) => {
      const columnValue = item[column];
      if (Array.isArray(columnValue)) {
        return columnValue
          .join(",")
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      return columnValue
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  }

  async get<T extends keyof MockData>(
    resource: T,
    params?: Record<string, string>
  ): Promise<MockData[T]> {
    await this.simulateNetworkDelay();

    if (this.mockData[resource]) {
      const data = this.mockData[resource];
      if (params) {
        let filteredData = [...data] as Array<Record<string, any>>;

        for (const [key, value] of Object.entries(params)) {
          if (value) {
            filteredData = this.filterByColumn(filteredData, key, value);
          }
        }

        return filteredData as MockData[T];
      }
      return data;
    }
    throw new Error(`Resource ${resource} not found`);
  }
}

const mockApiClient = new MockAPI();
export default mockApiClient;
