

export const fetchQuestions = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/questions/${id}`);
  const result = await res.json();
      
  return result;
};
  
