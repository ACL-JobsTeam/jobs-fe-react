export const fetchAllJobs = async () => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/jobs/all`);

  const jobData = await res.json();

  
  return jobData;
};

export const fetchJobsByCompany = async (company) => {
  
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/${company}`
  );

  const companyJobData = await res.json();

  return companyJobData;
};
