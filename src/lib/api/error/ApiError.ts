import { ErrorDetails } from "./interfaces";

export class ApiError extends Error {
  public code: number;
  public details?: ErrorDetails;

  private static errorMap: Record<number, string> = {
    400: "Bad Request – The server could not understand the request.",
    401: "Unauthorized – Authentication is required.",
    403: "Forbidden – You do not have permission to access this resource.",
    404: "Not Found – The requested resource could not be found.",
    408: "Request Timeout – The request took too long to complete.",
    429: "Too Many Requests – You have sent too many requests in a given amount of time.",
    500: "Internal Server Error – An unexpected error occurred on the server.",
    502: "Bad Gateway – The server received an invalid response from the upstream server.",
    503: "Service Unavailable – The server is currently unable to handle the request.",
    504: "Gateway Timeout – The server did not receive a timely response from the upstream server.",
  };

  constructor(code: number, details?: ErrorDetails) {
    const message = ApiError.errorMap[code] || "An unknown error occurred.";
    super(message);
    this.code = code;
    this.details = details;
    this.name = "ApiError";
  }
}
