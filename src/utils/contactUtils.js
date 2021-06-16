
export const fetchContacts = async (id) => {
  // MUST TAKE IN LINKED APP ID, NEEDS TO IN BACK END ALSO
  const res = await fetch(`http://localhost:7890/api/v1/contacts/${id}`);
  // console.log(res)
  const result = await res.json();
  
  return result;
};

