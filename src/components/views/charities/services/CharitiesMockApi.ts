import { MockData, Charity } from "../types";

class CharitiesMockAPI {
  private mockData: MockData = {
    charities: [
      { id: 1, name: "Hope Foundation", status: "active", donationGoal: 50000 },
      {
        id: 2,
        name: "Smile Initiative",
        status: "inactive",
        donationGoal: 30000,
      },
      { id: 3, name: "Future Horizons", status: "active", donationGoal: 80000 },
      { id: 4, name: "Kind Hearts", status: "inactive", donationGoal: 20000 },
      { id: 5, name: "Global Impact", status: "active", donationGoal: 100000 },
    ],
  };

  private async simulateNetworkDelay() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  private filterCharities(column: keyof Charity, value: string): Charity[] {
    return this.mockData.charities.filter((charity) => {
      const columnValue = charity[column];
      if (typeof columnValue === "number") {
        return columnValue.toString().includes(value);
      }
      return columnValue
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  }

  async get(
    resource: keyof MockData,
    params?: Record<string, string>,
  ): Promise<MockData[keyof MockData]> {
    await this.simulateNetworkDelay();

    if (this.mockData[resource]) {
      const data = this.mockData[resource];
      if (params && resource === "charities") {
        let filteredData = [...data] as Charity[];

        for (const [key, value] of Object.entries(params)) {
          if (value) {
            filteredData = this.filterCharities(key as keyof Charity, value);
          }
        }

        return filteredData;
      }
      return data;
    }
    throw new Error(`Resource ${resource} not found`);
  }
}

const charitiesApiClient = new CharitiesMockAPI();
export default charitiesApiClient;
