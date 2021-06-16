export const fetchNotes = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/notes/${id}`);
  const result = await res.json();
    
  return result;
};
