import { response } from 'msw';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { ids } from 'webpack';


  //  const [username, setUsername] = useState('')
  //  const [userId, setUserId] = useState('')
 //   const [loggedIn, setLoggedIn] = useState(false)
 //   const [userObject, setUserObject] = useState({})
   

   export const fetchUser = async () => {
        const res = await fetch('http://localhost:7890/api/v1/auth/getuser', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        })

        const userdata = await res.json()

        console.log(userdata)
        
        return userdata.user.map((x) => ({
            user: x.userName
        }))

    }
    
  //  useEffect(() => {
  //      fetchUser()
        
        
  //  })

//   setLoggedIn(true)
//   setUserId(userdata.user.userId)
 //  setUsername(userdata.user.userName)
   