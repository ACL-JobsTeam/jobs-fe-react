export const fetchNotes = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/notes/${id}`);
  const result = await res.json();
    
  return result;
};
