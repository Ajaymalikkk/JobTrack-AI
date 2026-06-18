import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../services/JobService";
import { useNavigate } from "react-router-dom";
const Jobs = () => {
    const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      // Instant UI Update
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );
    } catch (error) {
        console.error("DELETE ERROR:", error.response?.data);
        console.error(error);
      
        alert("Failed to delete job");
      }
  };

  if (loading) {
    return <h2 className="p-6">Loading Jobs...</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      <div className="grid gap-4">
      {Array.isArray(jobs) &&
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">
              {job.company}
            </h2>

            <p className="text-gray-600">
              {job.position}
            </p>

            <p className="mt-2">
              Status:
              <span className="font-semibold ml-2">
                {job.status}
              </span>
            </p>

            <div className="mt-4 flex gap-3">

            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() =>
            navigate(`/jobs/edit/${job._id}`)
            }
            >
            Edit
            </button>

            <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDelete(job._id)}
            >
            Delete
        </button>

        </div>
          </div>
        ))}
      </div>
    </div>
  );

  };
export default Jobs;
  
