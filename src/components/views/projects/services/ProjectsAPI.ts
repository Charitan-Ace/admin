import { apiClient } from "@/lib/api/Client";
import { Project } from "./interfaces";
import projectStore from "../store/createProjectsStore";
import { Pageable } from "@/lib/api/interfaces/table";

class ProjectsAPI {
  static async fetchAllProjects() {
    try {
      projectStore.getState().setLoading(true);

      const pageNo = (projectStore.getState().filterData?.pageNo ?? 0) + 1;
      const pageSize = projectStore.getState().filterData?.pageSize ?? 10;

      const queryParams = {
        page: pageNo,
        size: pageSize,
      };

      const requestBody: Record<string, unknown> = {};
      if (projectStore.getState().filterData?.filter) {
        let filterKey = projectStore.getState().filterData?.filter;
        const filterValue = projectStore.getState().filterData?.keyword;
        if (filterKey !== undefined && filterValue !== undefined) {
          if (filterKey === "statusType") {
            filterKey = "status";
            requestBody[filterKey] = filterValue;
          } else if (filterKey === "categoryType") {
            filterKey = "categoryTypes";
            requestBody[filterKey] = [filterValue];
          } else if (filterKey === "countryIsoCode") {
            filterKey = "countryIsoCodes";
            requestBody[filterKey] = [filterValue];
          } else if (filterKey === "title") {
            filterKey = "name";
            requestBody[filterKey] = filterValue;
          } else {
            requestBody[filterKey] = filterValue;
          }
        }
      }

      const response = await apiClient.post<Project[]>("/project/search", {
        params: { ...queryParams },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        returnHeaders: true,
      });

      if ("data" in response) {
        console.log(response.data, queryParams);
        projectStore.getState().setData(response.data);

        const paginationData: Pageable = {
          pageNumber: pageNo - 1,
          pageSize: pageSize,
          sort: {
            sorted: false,
            empty: response.data.length === 0,
            unsorted: true,
          },
          offset: (pageNo - 1) * pageSize,
          paged: true,
          unpaged: false,
        };

        projectStore.getState().setPaginationData(paginationData);
        projectStore.getState().setTotalElements(response.data.length);
        projectStore
          .getState()
          .setTotalPages(Number(response.headers["total-pages"]));
      }
    } catch (error) {
      projectStore
        .getState()
        .setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
    } finally {
      projectStore.getState().setLoading(false);
    }
  }

  static async createProject(
    projectData: Record<string, unknown>,
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<undefined> {
    projectStore.getState().setLoading(true);
    try {
      await apiClient.post<Project>("/project/create", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating project:", error);
      onFailure();
      throw error;
    } finally {
      onFinish();
      projectStore.getState().setLoading(false);
    }
  }

  static async getProjectById(
    projectId: string,
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<Project | undefined> {
    try {
      const response = await apiClient.get<Project>(`/project/${projectId}`);
      onSuccess();
      return response;
    } catch (error) {
      console.error("Error fetching project:", error);
      onFailure();
      throw error;
    } finally {
      onFinish();
    }
  }

  static async updateProjectDetails(
    projectId: string,
    projectData: Record<string, unknown>,
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<Project | undefined> {
    projectStore.getState().setLoading(true);
    try {
      const response = await apiClient.put<Project>(
        `/project/update-details/${projectId}`,
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        },
      );
      onSuccess();
      return response;
    } catch (error) {
      console.error("Error updating project details:", error);
      onFailure();
      throw error;
    } finally {
      onFinish();
      projectStore.getState().setLoading(false);
    }
  }

  static async approveProject(
    projectId: string,
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<undefined> {
    projectStore.getState().setLoading(true);
    try {
      await apiClient.post<Project>(`/project/approve/${projectId}`);
      onSuccess();
    } catch (error) {
      console.error("Error approving project:", error);
      onFailure();
      throw error;
    } finally {
      onFinish();
      projectStore.getState().setLoading(false);
    }
  }

  static async haltProject(
    projectId: string | string[],
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<undefined> {
    projectStore.getState().setLoading(true);
    try {
      if (Array.isArray(projectId)) {
        await Promise.all(
          projectId.map((id) => apiClient.post<Project>(`/project/halt/${id}`)),
        );
      } else {
        await apiClient.post<Project>(`/project/halt/${projectId}`);
      }
      onSuccess();
    } catch (error) {
      console.error("Error halting project:", error);
      onFailure();
      throw error;
    } finally {
      projectStore.getState().setLoading(false);
      onFinish();
    }
  }

  static async deleteProject(
    projectId: string | string[],
    onSuccess: () => void,
    onFailure: () => void,
    onFinish: () => void,
  ): Promise<undefined> {
    projectStore.getState().setLoading(true);
    try {
      if (Array.isArray(projectId)) {
        await Promise.all(
          projectId.map((id) =>
            apiClient.post<Project>(`/project/delete/${id}`),
          ),
        );
      } else {
        await apiClient.post<Project>(`/project/delete/${projectId}`);
      }
      onSuccess();
    } catch (error) {
      console.error("Error deleting project:", error);
      onFailure();
      throw error;
    } finally {
      projectStore.getState().setLoading(false);
      onFinish();
    }
  }
}

export { ProjectsAPI };
