import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class NewPostPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            done: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.title) {
            alert("Post title cannot be blank");
            return;
        }

        if (!this.state.content) {
            alert("Post content cannot be blank");
            return;
        }

        fetch("https://blog-backend-serwisy-www.herokuapp.com/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("basicAuth")
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content
            })
        })
            .then(response => {
                this.setState({
                    done: true
                });
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        if (this.state.done)
            return <Redirect to="/" />

        return (
            <div>
                <div>
                    <h1>New post</h1>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Enter title" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" name="content" as="textarea" rows="3" placeholder="Enter content" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Add post</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(NewPostPage);