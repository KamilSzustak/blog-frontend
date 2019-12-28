import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class EditPostPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            post: {},
            title: "",
            content: "",
            done: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`https://blog-backend-serwisy-www.herokuapp.com/api/posts/${this.state.id}`, {
            headers: {
                "Authorization": localStorage.getItem("basicAuth")
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    post: data,
                    title: data.title,
                    content: data.content
                })
            })
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

        const post = this.state.post;
        post.title = this.state.title;
        post.content = this.state.content;

        fetch(`https://blog-backend-serwisy-www.herokuapp.com/api/posts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": localStorage.getItem("basicAuth")
            },
            body: JSON.stringify(post)
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
            return <Redirect to={`/posts/${this.state.id}`} />

        return (
            <div>
                <div>
                    <h1>Edit post</h1>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Edit title" value={this.state.title} onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" name="content" as="textarea" rows="3" placeholder="Edit content" value={this.state.content} onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Edit post</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditPostPage);