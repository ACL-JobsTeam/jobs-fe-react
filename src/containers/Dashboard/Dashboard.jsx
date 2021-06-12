import React from 'react';
import { testHook } from './actualHook';


const Dashboard = () => {
  const [user] = testHook()
  
  
  

  return (
    <>
      <p>The Dashboard {user} Page!</p>
      <p></p>
    </>
  );
};

export default Dashboard;
