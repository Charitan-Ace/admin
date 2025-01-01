import { MockData, Project } from "./types";

class ProjectsMockAPI {
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
  };

  private async simulateNetworkDelay() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  private filterProjects(column: keyof Project, value: string): Project[] {
    return this.mockData.projects.filter((project) => {
      const columnValue = project[column];
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

  async get(
    resource: keyof MockData,
    params?: Record<string, string>,
  ): Promise<MockData[keyof MockData]> {
    await this.simulateNetworkDelay();

    if (this.mockData[resource]) {
      const data = this.mockData[resource];
      if (params && resource === "projects") {
        let filteredData = [...data] as Project[];

        for (const [key, value] of Object.entries(params)) {
          if (value) {
            filteredData = this.filterProjects(key as keyof Project, value);
          }
        }

        return filteredData;
      }
      return data;
    }
    throw new Error(`Resource ${resource} not found`);
  }
}

const projectsApiClient = new ProjectsMockAPI();
export default projectsApiClient;
