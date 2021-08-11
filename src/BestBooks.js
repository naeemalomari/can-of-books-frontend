import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withAuth0 } from '@auth0/auth0-react';
import './BestBooks.css';
import axios from 'axios';
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
    if (this.props.booksData != prevProps.booksData) {
      this.getData();
    }
  }

  render() {

    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        {isAuthenticated &&
          (
            <div>
              <h1>My Favorite Books</h1>
              <p>
                This is a collection of my favorite books
              </p>
            </div>
          )}
        <Carousel>
          {this.state.book &&
            this.state.book.map((item) => {
              return (
                <Carousel.Item interval={1000}>
                  <img
                    className="d-block w-100"
                    src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_813319932_383768.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>

      </>
    )
  }
}
export default withAuth0(MyFavoriteBooks);