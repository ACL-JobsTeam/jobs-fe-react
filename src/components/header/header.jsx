import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import style from './header.css';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';



const Header = ({ user }) => {
  
  const handleSignOut = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  };
  
  return (
    <div>
      <Card className={style.headerContainer}>
        <CardContent className={style.headerBoxes}>
          <Typography className={style.headerTypo} variant="body2" component="p">
            <span className={style.userName}>
              {user}
            </span>
            <Link component={RouterLink} to="/dashboard">
              <span className={style.link} >
          Dashboard
              </span>
            </Link>
            <Link component={RouterLink} to="/search">
              <span className={style.link}>
          Search
              </span>
            </Link>
            <Link 
              onClick={handleSignOut}
              component={RouterLink} to="/">
              <span className={style.link}>
          Sign out
              </span>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.string,
 

};



export default Header;
