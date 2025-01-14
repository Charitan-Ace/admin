import { apiClient } from "@/lib/api/Client.ts";
import { StatisticsResponse, StatisticsParams, NewUserParams, NewUserResponse, ProjectCategory } from "@/components/views/statistics/services/statistics";

interface ProjectDonationsResponse {
  [projectId: string]: number;
}

export class StatisticsAPI {
  private static BASE_URL = '/api/statistics';

  /**
   * Get statistics totals with optional filters
   */
  static async getTotals(params: StatisticsParams = {}): Promise<StatisticsResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    return apiClient.get<StatisticsResponse>(
      `${this.BASE_URL}/totals?${queryParams.toString()}`
    );
  }

  /**
   * Get current user's statistics
   */
  static async getMyTotals(): Promise<StatisticsResponse> {
    return apiClient.get<StatisticsResponse>(`${this.BASE_URL}/totals/me`);
  }

  /**
   * Get new user statistics by time period
   */
  static async getNewUsers(params: NewUserParams = {}): Promise<NewUserResponse> {
    const queryParams = new URLSearchParams();
    if (params.time) queryParams.append('time', params.time);

    return apiClient.get<NewUserResponse>(
      `${this.BASE_URL}/newUser`
    );
  }

  /**
   * Get statistics for approved projects
   * Returns a map of project IDs to their donation amounts
   */
  static async getApprovedProjects(): Promise<ProjectDonationsResponse> {
    return apiClient.get<ProjectDonationsResponse>(
      `${this.BASE_URL}/totals?status=APPROVED`
    );
  }

  /**
   * Get approved projects statistics by category
   */
  static async getApprovedProjectsByCategory(category: ProjectCategory): Promise<ProjectDonationsResponse> {
    return apiClient.get<ProjectDonationsResponse>(
      `${this.BASE_URL}/totals?category=${category}&status=APPROVED`
    );
  }
}
