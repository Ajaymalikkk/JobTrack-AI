import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { createJob } from "../../services/JobService";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob(formData);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Add New Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-5"
        >
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
            required
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <input
            type="text"
            name="location"
             placeholder="Location"
             value={formData.location}
             onChange={handleChange}
             className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {loading
              ? "Saving..."
              : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
