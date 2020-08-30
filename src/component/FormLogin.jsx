import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap'

class FormLogin extends Component {
    state ={
        validate : false
    }
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.setState({validate : true});
      };
    render() {
        return (
            <div>
                <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required/>
                       
                        <Form.Control.Feedback type="invalid">
                            Email harus di isi!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                        <Form.Control.Feedback type="invalid">
                            Password harus di isi!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox" >
                        <Button variant="outline-secondary" type="submit">
                        Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default FormLogin;