import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { ButtonToolbar, Button, ListGroup } from 'react-bootstrap';
import { Card, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

class PostPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            post: {
                title: "",
                content: "",
                comments: []
            },
            done: false
        };

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
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
                    post: data
                });
            })
    }

    handleDeleteButtonClick() {
        const deletePost = window.confirm("Do you want to delete this post?");
        if (deletePost) {
            fetch(`https://blog-backend-serwisy-www.herokuapp.com/api/posts/${this.state.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("basicAuth")
                }
            })
                .then(() => {
                    this.setState({
                        done: true
                    });
                });
        }
    }

    render() {
        if (this.state.done)
            return <Redirect to="/" />

        return (
            <div>
                <Card style={{padding: "16px"}}>
                    <Typography variant="h4" style={{display: "inline"}}>{this.state.post.title}</Typography>
                    <ButtonToolbar style={{display: "inline", marginLeft: "16px"}}>
                        <Button variant="danger" size="sm" onClick={this.handleDeleteButtonClick}>Delete</Button>
                        {" "}
                        <Link to={`/edit/${this.state.id}`}>
                            <Button variant="info" size="sm">Edit</Button>
                        </Link>
                    </ButtonToolbar>
                    <Typography variant="h6">{this.state.post.content}</Typography>
                    <Rating max={5} />
                </Card>
                <h4 style={{marginTop: "16px"}}>Comments</h4>
                <CommentForm data={this.state.id} />
                <ListGroup>
                    {this.state.post.comments.map(comment => <ListGroup.Item key={comment.id} style={{marginTop: "16px"}}>{comment.content}</ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(PostPage);