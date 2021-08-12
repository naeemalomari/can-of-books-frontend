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
import { Form, Button } from 'react-bootstrap'
import MyFavoriteBooks from './BestBooks';
import UpdateBooksForm from './UpdateBooksForm';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showUpdateBookFlag:false,
      bookData:[],
      title:'',
      description:'',
      email:'',
      status:'',
      idx:-1,
    }
  }

  addBook = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const status = event.target.status.value;
    const { user } = this.props.auth0;
    console.log(title, description, status);

    const booksData = {

      title: title,
      description: description,
      email: user.email,
      status: status,
    }
    axios
      .post(`http://localhost:3001/books`, booksData)
      .then(result => {
        console.log(result.data);
        this.setState({
          bookData: result.data
        })
      })
      .catch(err => {

        console.log(err);
      })
  }
  show = () => {
    this.setState({
      show: true,
    })
  }
  deleteBook = (idx) => {
    console.log(idx);
    const { user } = this.props.auth0;
    axios
      .delete(`http://localhost:3001/books/${idx}`, { params: { email: user.email } })
      .then(result => {
        this.setState({

          bookData: result.data
        })
      })
      .catch(err => {

        console.log(err);
      })
  }
  showUpdateBook=(index)=>{
this.setState({
  showUpdateBookFlag:true,
  idx:index,
})

  }
  updateBook = (event) => {

event.preventDefault();


const updateBook ={
  title: event.target.target.value,
  description:event.target.description.value,
  email: event.target.email.value,
  status: event.target.status.value,
  
}

axios
.put(`http://localhost/updateBooks/${this.state.idx}`,updateBook)
.then(result => {


  console.log(result.data);
})
.catch(err => {

  console.log(err);
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
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks
                
                  deleteBook={this.deleteBook}
                  showUpdateBook={this.props.showUpdateBook}
                  updateBook={this.props.updateBook}
                /> : <Login />}
              </Route>
              <Route exact path='/profile'>
                <Profile />
                <MyFavoriteBooks
                  bookData={this.state.bookData}
                  updateBook={this.props.updateBook}
                />
              </Route>
            </Switch>
            <Route>
              <Switch>
                <AddBooksCard
                  addBook={this.addBook}
                // show={this.props.show}
                />
              </Switch>
            </Route>
            <Footer />
            <Route>
              <Switch>
                
                <UpdateBooksForm 
                updateBook={this.state.updateBook}
                /> 
              </Switch>
            </Route>
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}
export default withAuth0(App);

