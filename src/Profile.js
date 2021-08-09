import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Image from 'react-bootstrap/Image'
import './Profile.css';

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
                {isAuthenticated &&
                    <>
                        <Image className="pic" src={user.picture} roundedCircle  />
                        {/* <img src={user.picture} alt='profile pic' /> */}
                        <div className="divs" >Name : {user.name}</div>
                        <div className="divs" >Email :{user.email}</div>
                    </>
                }
            </>
        );
    }
}

export default withAuth0(Profile);