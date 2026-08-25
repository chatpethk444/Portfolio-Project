import { useEffect, useState } from 'react';
import apiClient from '../api/client'; // Import client.js ที่สร้างขึ้น

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // ยิง Request ไปที่ /projects (จะต่อท้าย BASE_URL อัตโนมัติ)
    apiClient.get('/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Fetch projects error:', err));
  }, []);

  return (
    <div>
      {/* Render projects */}
    </div>
  );
}