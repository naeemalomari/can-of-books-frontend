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
import MyFavoriteBooks from './BestBooks';




class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    show: true,
  }
}

addBook=(event) => {
  event.preventDefault();

  const title= event.target.title.value;
  const description= event.target.description.value;
  const status= event.target.status.value;
  const { user }=this.props.auth0;
console.log(title, description, status);
  
const booksData={

  title:title,
  description:description,
  email:user.email,
  status:status,
}
axios
.post(`http://localhost:3001/books`,booksData)
.then(result => {
  console.log(result.data);
  this.setstate({
    bookData: result.data
  })
})
.catch(err => {

  console.log(err);
})
}
show = () => {
    this.setState({
        show:true,
    })
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
            // show={this.props.show}
            />
            <Button variant="primary" type="submit" onClick={this.props.Clicking}>ADD NEW BOOK</Button>
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks 

                /> : <Login />}
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
              <Route exact path='/profile'>
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Profile />
                <MyFavoriteBooks 
                bookData={this.state.bookData}
                />
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

