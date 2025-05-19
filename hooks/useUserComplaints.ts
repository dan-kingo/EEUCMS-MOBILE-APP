import { useEffect, useState } from "react";
import axios from "axios";

export interface Complaint {
  user: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
}

export const useUserComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Complaint[]>(
          "https://aicms-api.onrender.com/api/complaints",
          {
            withCredentials: true,
          }
        );
        setComplaints(response.data);
      } catch (err) {
        console.error("Failed to fetch complaints", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return { complaints, loading };
};
