import { apiClient } from "@/lib/api/Client";
import { DonorGetResponse } from "./interfaces";
import donorStore from "../store/createDonorStore";

class DonorsAPI {
  static async fetchAllDonors() {
    try {
      donorStore.getState().setLoading(true);

      const queryParams = donorStore.getState().filterData;

      const response = await apiClient.get<DonorGetResponse>(
        "/api/profile/donor/all",
        { params: { ...queryParams } },
      );

      console.log(response, queryParams);

      donorStore.getState().setData(response.content);
      donorStore.getState().setPaginationData(response.pageable);
      donorStore.getState().setTotalElements(response.totalElements);
      donorStore.getState().setTotalPages(response.totalPages);
    } catch (error) {
      donorStore
        .getState()
        .setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
    } finally {
      donorStore.getState().setLoading(false);
    }
  }
}

export { DonorsAPI };
