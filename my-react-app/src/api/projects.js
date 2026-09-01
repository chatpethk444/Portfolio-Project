import apiClient from "./client";

export async function fetchProjects() {
  const response = await apiClient.get("/projects");
  return Array.isArray(response.data) ? response.data : [];
}
