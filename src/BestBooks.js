import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
// import Jumbotron from 'react-bootstrap/Jumbotron';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Button } from 'bootstrap';
// import axios from 'axios';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      email: '',
      image:'',
      showUpdateBookFlag: false,
    }
  }
  getBooks = async () => {
    const { user, isAuthenticated } = this.props.auth0
    if (isAuthenticated) {
      let url = `http://localhost:3001/book`;
      const paramObj = {
        params: {
          name: user.email,
        },
      };
      axios
        .get(url, paramObj)
        .then((results) => {
          this.setState({
            book: results.data,
            // image:results.data
          });

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.getBooks();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.booksData != prevProps.bookData) {
      this.getBooks();
    }
  }
  // showUpdateBook=(index)=>{
  //   this.setState({
  //     showUpdateBookFlag:true
  //     this.setState({
        
        
  //     })
  //     console.log(index);
  //     console.log(this.state.bookData[index]);
  //   })
  //     }
      updateBook = () => {


        
          }
  render() {

    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        {isAuthenticated &&
          (
            <Carousel>
            {this.state.book &&
              this.state.book.map((item,idx) => {
                return (
                  
                  <Carousel.Item interval={1000} key={idx}>
      
                    <img
                    
                      className="d-block w-100"
                      src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_813319932_383768.jpg"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{item.title}</h3>
                      
                      <p>{item.description}</p>
                  <button onClick={()=> this.props.deleteBook(idx)}>X</button>
                  <button onClick={()=> this.props.showUpdateBook}>UPDATE BOOK ?</button>

                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
              
          </Carousel>
          
          )}

      </>
    )
  }
}
export default withAuth0(MyFavoriteBooks);