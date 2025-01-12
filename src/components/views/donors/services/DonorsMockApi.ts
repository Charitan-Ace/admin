import { MockData, Donor } from "../types";

class DonorsMockAPI {
  private mockData: MockData = {
    donors: [
      { id: 1, name: "Alice Johnson", status: "active", donationAmount: 100 },
      { id: 2, name: "Bob Smith", status: "inactive", donationAmount: 50 },
      { id: 3, name: "Charlie Davis", status: "active", donationAmount: 200 },
      { id: 4, name: "David Lee", status: "inactive", donationAmount: 75 },
      { id: 5, name: "Eve Clark", status: "active", donationAmount: 150 },
    ],
  };

  private async simulateNetworkDelay() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  private filterDonors(column: keyof Donor, value: string): Donor[] {
    return this.mockData.donors.filter((donor) => {
      const columnValue = donor[column];
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
      if (params && resource === "donors") {
        let filteredData = [...data] as Donor[];

        for (const [key, value] of Object.entries(params)) {
          if (value) {
            filteredData = this.filterDonors(key as keyof Donor, value);
          }
        }

        return filteredData;
      }
      return data;
    }
    throw new Error(`Resource ${resource} not found`);
  }

  async getById(id: string) {
    const donors = await this.get("donors");
    const donor = donors.find((d: any) => d.id.toString() === id);
    if (!donor) {
      throw new Error(`Donor with id ${id} not found`);
    }
    return donor;
  }
}

const donorsApiClient = new DonorsMockAPI();
export default donorsApiClient;
