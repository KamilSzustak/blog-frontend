import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            done: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.email) {
            alert("Email cannot be blank");
            return;
        }

        if (!this.state.password) {
            alert("Password cannot be blank");
            return;
        }

        if (!this.state.firstName) {
            alert("First name cannot be blank");
            return;
        }

        if (!this.state.lastName) {
            alert("Last name cannot be blank");
            return;
        }

        fetch("https://blog-backend-serwisy-www.herokuapp.com/api/users/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName
            })
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        done: true
                    });
                }
                else {
                    alert("Sign up unsuccessful")
                }
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.done)
            return <Redirect to="/login" />

        return (
            <div>
                <div>
                    <h1>Sign up</h1>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" placeholder="Enter email" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Sign up</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);