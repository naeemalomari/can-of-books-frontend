import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import './Buttons.css';

function LoginButton() {

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    // <button onClick={loginWithRedirect}>Log in</button>
    
    <Button variant="success" className='loginbutton' onClick={loginWithRedirect}>Log in</Button>
  );
}

export default LoginButton;