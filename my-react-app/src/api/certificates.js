import apiClient from "./client";

export async function fetchCertificates() {
  const response = await apiClient.get("/certificates");
  return Array.isArray(response.data) ? response.data : [];
}
