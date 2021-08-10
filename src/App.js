import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';
import Profile from './Profile';
import axios from 'axios';
import AddBooksCard from './AddBooksCard';
import Button from 'react-bootstrap/Button'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: false,
    };
}
show = () => {
  this.setState({
      show:true,
  })
}
hide=()=>{
  this.setState({
    show:false,
  })
}


addBookHandling=(event) => {
  event.preventDefault();

  const title= event.target.title.value;
  const description= event.target.description.value;
  const status= event.target.status.value;  
  const {user} =this.props.auth0;
}





  render() {
    const { user, isAuthenticated } = this.props.auth0;
    // console.log('app', this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <AddBooksCard 
            addBook={this.addBook}
            show={this.props.show}
            />
            <Button variant="primary" type="submit" onClick={this.props.Clicking}>ADD NEW BOOK</Button>
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks /> : <Login />}
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
              <Route exact path='/profile'>
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}
export default withAuth0 (App) ;

