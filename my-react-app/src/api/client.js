import axios from 'axios';

// 1. ดึงค่าจาก VITE_API_BASE_URL
// 2. หากไม่พบ ให้ถอยไปใช้ URL บน Render ทันที (ป้องกันการหลุดไป 127.0.0.1 บน Production)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chatpeth-portfolio-backend-dockersss.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response Interceptor สำหรับดักจับ Error และทำ Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Call Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;