import React, {useState} from 'react';
import { useParams } from 'react-router';


const Detail = () => {
  const [companyContact, setCompanyContact] = useState(''); 
  const {id} = useParams();
  
  const submit = async (e) => {
    e.preventDefault();
    const newContact = await fetch('http://localhost:7890/api/v1/contacts/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        companyContact,
        appId: id
      })
    });
    const data = await newContact.json();
    console.log(data)
    if(data) {
      setCompanyContact()
      
    }

  };

  

  

  return (
    <>
      <p>This is the Details Page </p>
      <form onSubmit={submit}>
        <input placeholder="new contact" onChange={e => setCompanyContact(e.target.value)} />
        <button type="submit">click me</button>
      </form>
      <div>{companyContact}</div>
    </>
  );
};

export default Detail;
