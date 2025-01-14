const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME || "http://localhost:";
const API_PORT = import.meta.env.VITE_API_PORT || "8080";
export const API_URL = `${DOMAIN_NAME}${API_PORT}`;
