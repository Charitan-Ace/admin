import { apiClient } from "@/lib/api/Client";
import { CharityGetResponse } from "./interfaces";
import charityStore from "../store/createCharityStore";
import { CreateCharityFormData } from "../child-components/CreateCharityModal/interfaces";

class CharitiesAPI {
  static async fetchAllCharities() {
    try {
      charityStore.getState().setLoading(true);

      const queryParams = charityStore.getState().filterData;

      const response = await apiClient.get<CharityGetResponse>(
        "/api/profile/charity/all",
        { params: { ...queryParams } },
      );

      console.log(response, queryParams);

      charityStore.getState().setData(response.content);
      charityStore.getState().setPaginationData(response.pageable);
      charityStore.getState().setTotalElements(response.totalElements);
      charityStore.getState().setTotalPages(response.totalPages);
    } catch (error) {
      charityStore
        .getState()
        .setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
    } finally {
      charityStore.getState().setLoading(false);
    }
  }

  static async registerNewCharity(
    data: Omit<CreateCharityFormData, "confirmPassword">,
  ) {
    try {
      const requestData = {
        email: data.email,
        password: data.password,
        role: "CHARITY",
        profile: {
          companyName: data.companyName,
          address: data.address,
          taxCode: data.taxCode,
          organizationType: data.organizationType,
        },
      };

      const response = await apiClient.post<
        Omit<CreateCharityFormData, "confirmPassword">
      >("/api/admin/auth/create", {
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export { CharitiesAPI };
