import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleQuestion from './singleQuestion';
import { useParams } from 'react-router';

const QuestionList = ({ questions, setQuestions }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const { id } = useParams();
  
      
  const createNewQuestion = async (e) => {
    e.preventDefault();
    const newQuestion = await fetch('http://localhost:7890/api/v1/questions/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        userQuestion,
        appId: id
      })

    });
    const newQuestionJson = await newQuestion.json();
    if(newQuestionJson) {
      setQuestions(prevArray => {
        const copy = [...prevArray];
        copy.push(newQuestionJson);
        return copy;
      });
    }
  };

  const handleDeleteQuestion = async (id, index) => {
    const deleted = await fetch(`http://localhost:7890/api/v1/questions/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const deletedJson = await deleted.json();
   

    if(deletedJson) {
      setQuestions(prevArray => {
        const copy = [...prevArray];
        copy.splice(index, 1);
        return copy;
      });
    }
  };
  
  const questionItems = questions.map((question, index) => (
    <li key={question.id}>
      
      <SingleQuestion {...question} index={index} handleDeleteQuestion={handleDeleteQuestion}/>
    </li>
  ));

  return (
    <div>
      <p>view/add questions </p>
      <form onSubmit={createNewQuestion}>
        <input placeholder="new contact" onChange={(e) => setUserQuestion(e.target.value)}/>
        <button type="submit">click me</button>
      </form>
        
      <ul>
      
        {questionItems}
 
      
      </ul>
    </div>
  );};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      userQuestion: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  )
};

export default QuestionList;