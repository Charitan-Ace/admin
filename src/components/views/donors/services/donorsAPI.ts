import { apiClient } from "@/lib/api/Client";
import { CreateAccountFormFields } from "../../create-account/types/interfaces";
// import { CharityGetResponse } from "../../donors/types";
// import charityStore from "../store/createCharityStore";
// import { CreateCharityFormData } from "../child-components/CreateCharityModal/interfaces";

class donorsAPI {
//   static async fetchAllDonors() {
//     try {
//       charityStore.getState().setLoading(true);

//       const queryParams = charityStore.getState().filterData;

//       const response = await apiClient.get<CharityGetResponse>(
//         "/api/profile/donor/all",
//         { params: { ...queryParams } },
//       );

//       console.log(response, queryParams);

//       charityStore.getState().setData(response.content);
//       charityStore.getState().setPaginationData(response.pageable);
//       charityStore.getState().setTotalElements(response.totalElements);
//       charityStore.getState().setTotalPages(response.totalPages);
//     } catch (error) {
//       charityStore
//         .getState()
//         .setError(
//           error instanceof Error ? error.message : "An unknown error occurred",
//         );
//     } finally {
//       charityStore.getState().setLoading(false);
//     }
//   }

  static async createAccount(
      data: Omit<CreateAccountFormFields, "image" | "video" >,
    ) {
      try {
        const requestData = {
          ...data,
          role: "DONOR",
          profile: {},
        };
  
        const response = await apiClient.post<
          Omit<CreateAccountFormFields, "image" | "video">
        >("https://gateway.tail03350e.ts.net/", {
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
}

export { donorsAPI };
