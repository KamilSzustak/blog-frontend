import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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

        const basicAuth = "Basic " + btoa(this.state.email + ":" + this.state.password);

        fetch("https://blog-backend-serwisy-www.herokuapp.com/api/users/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": basicAuth
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.saveCredentials();
                    this.setState({
                        done: true
                    });
                }
                else {
                    alert("Invalid login credentials")
                }
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    saveCredentials() {
        const basicAuth = btoa(this.state.email + ":" + this.state.password);
        localStorage.setItem("basicAuth", `Basic ${basicAuth}`);
    }
    
    render() {
        if (this.state.done)
            return <Redirect to="/" />

        return (
            <div>
                <div>
                    <h1 style={{display: "inline"}}>Login</h1>
                    <Link to="/signup">
                        <Button variant="primary" style={{marginLeft: "16px"}}>Sign up</Button>
                    </Link>
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
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
    
}

export default withRouter(LoginPage);