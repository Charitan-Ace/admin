import { apiClient } from "@/lib/api/Client";
import { Project } from "./interfaces";
import projectStore from "../store/createProjectsStore";

class ProjectsAPI {
  static async fetchAllProjects() {
    try {
      projectStore.getState().setLoading(true);

      const pageNo = (projectStore.getState().filterData?.pageNo ?? 0) + 1;
      const pageSize = projectStore.getState().filterData?.pageSize ?? 10;

      console.log(projectStore.getState().filterData);

      const queryParams = {
        page: pageNo,
        size: pageSize,
      };

      const response = await apiClient.post<Project[]>("/project/search", {
        params: { ...queryParams },
        headers: { Accept: "*/*" },
        body: JSON.stringify({}),
      });

      console.log(response, queryParams);

      projectStore.getState().setData(response);
      // projectStore.getState().setPaginationData(response.pageable);
      // projectStore.getState().setTotalElements(response.totalElements);
      // projectStore.getState().setTotalPages(response.totalPages);
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
}

export { ProjectsAPI };
