export const fetchEvents = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/events/${id}`);
  const result = await res.json();
  
   

  return result;
};
    
  
