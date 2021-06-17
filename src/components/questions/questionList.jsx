import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleQuestion from './singleQuestion';
import { useParams } from 'react-router';
import CardActions from '@material-ui/core/CardActions';
import style from './question.css';
import Button from '@material-ui/core/Button';


const QuestionList = ({ questions, setQuestions }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const { id } = useParams();
  
      
  const createNewQuestion = async (e) => {
    e.preventDefault();
    const newQuestion = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/questions/new`, {
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
    const deleted = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/questions/${id}`, {
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
    <li className={style.questionItem} key={question.id}>
      
      <SingleQuestion {...question} index={index} handleDeleteQuestion={handleDeleteQuestion}/>
    </li>
  ));

  return (
    <div className={style.questionCon} >
      <p className={style.questionsIntro} >Questions </p>
      <form onSubmit={createNewQuestion}>
        <span>
          <textarea className={style.questionInput} placeholder="What type of benefits do they offer" onChange={(e) => setUserQuestion(e.target.value)}/>
        </span>
        <CardActions>
          <span  className={style.questionButton}>
            <Button type="submit" variant="contained" size="large" color="primary">
        Add Question&gt; 
            </Button>
          </span> 
        </CardActions>
      </form>
        
      <ul className={style.questionContainer}>
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
