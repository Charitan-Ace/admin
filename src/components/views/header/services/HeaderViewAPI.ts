import { apiClient } from "@/lib/api/Client";
import { CreateAdminFormData } from "../child-components/admin-create-modal/interfaces";

class HeaderAPI {
  static async registerNewAdmin(
    data: Omit<CreateAdminFormData, "confirmPassword">,
  ) {
    try {
      const requestData = {
        email: data.email,
        password: data.password,
        role: "ADMIN",
        profile: {},
      };

      const response = await apiClient.post<
        Omit<CreateAdminFormData, "confirmPassword">
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

export { HeaderAPI };
