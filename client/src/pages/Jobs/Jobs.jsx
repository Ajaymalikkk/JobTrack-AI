import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../services/JobService";
import { useNavigate } from "react-router-dom";
const Jobs = () => {
    const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

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
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.position
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
  
    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <h2 className="p-6">Loading Jobs...</h2>;
  }

  return (
      <div className="min-h-screen bg-slate-950 text-white p-8">      
      <div className="mb-8">
      <h1 className="text-4xl font-bold">
        My Applications 🚀
      </h1>

      <p className="text-slate-400 mt-2">
      Track and manage all your job applications.
      </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
  <input
    type="text"
    placeholder="Search company or position..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-white/5 border border-white/10 rounded-2xl p-3 text-white flex-1 backdrop-blur-xl"  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="bg-white/5 border border-white/10 rounded-2xl p-3 text-white backdrop-blur-xl"  >

    <option value="All">All Status</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Offer">Offer</option>
  </select>
  </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">      {Array.isArray(jobs) &&
        filteredJobs.map((job) => (
          <div
            key={job._id}
          className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          hover:border-blue-500/50
          transition
          duration-300
"          >
          <h2 className="text-2xl font-bold">              {job.company}
            </h2>

            <p className="text-slate-400 mt-1">              {job.position}
            </p>

            <p className="mt-2">
              Status:
              <span
              className="
              ml-2
              px-3
              py-1
              rounded-full
              text-sm
              bg-blue-500/20
              text-blue-400
              "
            >
              {job.status}
            </span>
            </p>

            <div className="mt-4 flex gap-3">

            <button
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-xl
            transition
            "
            onClick={() =>
            navigate(`/jobs/edit/${job._id}`)
            }
            >
            Edit
            </button>

            <button
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-xl
            transition
            "
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
  
