import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};


export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 1. Request Interceptors (แนบ Bearer Token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptors (จัดการ Error & Token หมดอายุ)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // ดักจับสถานะ 401 Unauthorized (Token หมดอายุ หรือ Invalid Token)
    if (error.response && error.response.status === 401) {
      // เคลียร์ข้อมูล Token เก่าออกจาก LocalStorage
      localStorage.removeItem("access_token");

      // ตรวจสอบว่าไม่ได้อยู่ในหน้า Auth เพื่อป้องกัน Redirect Loop
      if (!window.location.pathname.includes("/login")) {
        alert("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        window.location.href = "/login"; // หรือใช้ navigate('/login') จาก React Router
      }
    }

    return Promise.reject(error);
  }
);