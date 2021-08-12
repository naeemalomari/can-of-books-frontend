import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Form, Button, Modal } from 'react-bootstrap/';

class AddBooksCard extends React.Component {


  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        {/* <Modal show={this.props.show} onHide={this.props.handleClose}> */}
          <Form  onSubmit={(e) => this.props.updateBook(e)}>


            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label >Book Title </Form.Label>
              <Form.Control type="text" placeholder="book title" name="title"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="book description" name="description"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>status</Form.Label>
              <Form.Control type="text" placeholder="status" name="status"/>
            </Form.Group>
            <Button variant="primary" type="submit" onHide={this.handleClose}>
              Submit
            </Button>
          </Form>
        {/* </Modal> */}
      </>
    );
  }
}

export default withAuth0(AddBooksCard);