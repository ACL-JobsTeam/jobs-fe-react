export const fetchAllJobs = async () => {
  const res = await fetch('http://localhost:7890/api/v1/jobs/all');

  const jobData = await res.json();

  console.log(jobData);
  return jobData;
};

export const fetchJobsByCompany = async (company) => {
  const res = await fetch(`${process.env.API_BASE_URL}/jobs/${company}`);

  const companyJobData = await res.json();

  return companyJobData;
};
