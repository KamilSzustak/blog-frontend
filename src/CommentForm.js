import React from 'react';
import { Form, Button } from 'react-bootstrap';

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            postId: this.props.data,
            content: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch(`https://blog-backend-serwisy-www.herokuapp.com/api/comments/${this.state.postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("basicAuth")
            },
            body: JSON.stringify({
                content: this.state.content
            })
        });

        this.setState({
            done: true
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" name="content" as="textarea" rows="2" placeholder="Enter comment" value={this.state.content} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Add comment</Button>
                </Form>
            </div>
        );
    }
}

export default CommentForm;