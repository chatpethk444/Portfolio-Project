import { useEffect, useState } from "react";
import { fetchCertificates } from "../api/certificates";

export function useCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCertificates();
        if (active) setCertificates(data);
      } catch {
        if (active) setError("Unable to load certificates. Please try again later.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return { certificates, loading, error };
}
