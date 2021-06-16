export const fetchContacts = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/contacts/${id}`);
  const result = await res.json();
 
  return result;
};

