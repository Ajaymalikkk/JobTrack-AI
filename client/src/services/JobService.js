import api from "./api";

// Dashboard Stats
export const getJobStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/jobs/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create Job
export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/jobs",
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get All Jobs
export const getJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get Single Job
export const getJobById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update Job
export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/jobs/${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  console.log("DELETE TOKEN:", token);

  const response = await api.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};