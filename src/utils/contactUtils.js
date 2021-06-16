export const fetchContacts = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/contacts/${id}`);
  const result = await res.json();
 
  return result;
};

