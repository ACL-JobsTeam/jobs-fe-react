export const fetchEvents = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/${id}`);
  const result = await res.json();
  
   

  return result;
};
    
  
