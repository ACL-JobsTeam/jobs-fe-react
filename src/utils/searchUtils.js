export const fetchAllJobs = async () => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/jobs/all`);

  const jobData = await res.json();

  console.log(jobData.length);
  return jobData;
};

export const fetchJobsByCompany = async (company) => {
  console.log(company);
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/${company}`
  );

  const companyJobData = await res.json();

  return companyJobData;
};
