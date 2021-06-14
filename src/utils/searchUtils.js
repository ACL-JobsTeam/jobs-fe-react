export const fetchAllJobs = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/jobs/all`);

  const jobData = await res.json();

  return jobData;
};

export const fetchJobsByCompany = async (company) => {
  const res = await fetch(`${process.env.API_BASE_URL}/jobs/${company}`);

  const companyJobData = await res.json();

  return companyJobData;
};
