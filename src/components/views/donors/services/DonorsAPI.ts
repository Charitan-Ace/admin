import { apiClient } from "@/lib/api/Client";
import { DonorGetResponse } from "./interfaces";
import donorStore from "../store/createDonorStore";
import { CreateAccountFormData } from "../../create-account/schemas/createAccountSchema";
import { CreateAccountFormFields, CreateDonorData, DonorCreateSchema } from "../../create-account/types/interfaces";

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

  static async fetchDonorById(donorId: string) {
    try {
      const  data  = await apiClient.get<DonorGetResponse>(
        `/api/profile/donor/info?id=${donorId}`
      );
      console.log('API Response:', data); // Add logging to debug
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch donor");
    }
  }

  static async createAccount(data: CreateDonorData) {

    try {
        const requestData = {
            ...data,
            role: "DONOR",
            
          };
          console.log(requestData);
      const response = await apiClient.post<CreateDonorData>("/api/admin/auth/create", {
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateDonor(donorId: string, updateData: Partial<DonorCreateSchema>) {
    try {
      const response = await apiClient.patch(`/api/profile/donor/update`, {
        body: JSON.stringify({
          ...updateData
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to update donor"
      );
    }
  }
}

export { DonorsAPI };
