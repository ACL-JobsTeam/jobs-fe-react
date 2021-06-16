export const fetchQuestions = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/questions/${id}`);
  const result = await res.json();
      
  return result;
};
  
