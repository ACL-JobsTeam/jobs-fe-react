export async function fetchUserColumns() {
  const data = await fetch('http://localhost:7890/api/v1/columns/getall', {
    method: 'GET',
    credentials: 'include',
  });
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchUserApplications() {
  const data = await fetch(
    'http://localhost:7890/api/v1/applications/getapplications',
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const jsonData = await data.json();

  return jsonData;
}
