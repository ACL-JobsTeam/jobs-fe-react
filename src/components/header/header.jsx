import React, { useState } from 'react';


const Header = ({user}) => {
   const [theUser, setTheUser] = useState('');


    if(user) {
        setTheUser(user)
    }


    

  return (
    <div>
     {theUser}
    </div>
  );
};



export default Header;
