import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getJobById,
  updateJob,
} from "../../services/JobService";

const EditJob = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);

        setFormData({
          company: data.job.company,
          position: data.job.position,
          status: data.job.status,
          location: data.job.location,
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, formData);

      alert("Job Updated Successfully");

      navigate("/jobs");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg">

      <h1 className="text-3xl font-bold mb-6">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default EditJob;