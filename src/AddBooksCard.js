import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import {Form,Button,Modal} from  'react-bootstrap/';

class AddBooksCard extends React.Component {

handleClose () {

this.setState({

  show:true,
})


}
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
            <Modal  show={this.props.show} onHide={this.props.handleClose}> 
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label name="newBook" > ADD YOUR BOOK {this.props.addBook} </Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit" onHide={this.props.handleClose}>
    Submit
  </Button>
</Form>
</Modal>
            </>
        );
    }
}

export default withAuth0(AddBooksCard);