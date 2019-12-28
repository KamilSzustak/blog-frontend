import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Post from "./Post";  
import { ListGroup, Button, Form } from 'react-bootstrap';
import './App.css';
import { LinearProgress, CircularProgress, Dialog, Tooltip } from "@material-ui/core"

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            logout: (localStorage.getItem("basicAuth") == null),
            searchText: "",
            displayProgressBar: "visible",
            displaySearchForm: "none",
            showDialog: false,
            dialogName: ""
        };

        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("https://blog-backend-serwisy-www.herokuapp.com/api/posts", {
            headers: {
                "Authorization": localStorage.getItem("basicAuth"),
                "Access-Control-Allow-Origin": '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    displayProgressBar: "none",
                    posts: data
                });
            })
    }

    handleLogoutButtonClick(event) {
        event.preventDefault();
        localStorage.removeItem("basicAuth");
        this.setState({
            logout: true
        });
        this.props.history.push("/");
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        if (this.state.posts == null) {
            return;
        }

        const query = this.state.searchText;
        const filtered = this.state.posts.filter(post => 
            (post.title.includes(query) || post.content.includes(query))
        );

        this.setState({
            posts: filtered
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    render() {
        if (this.state.logout)
            return <Redirect to="/" />
            
        return(
            <div>
                <div>
                    <Tooltip title="You will be logged out from Blog app">
                        <Button variant="outline-danger" type="button" style={{marginBottom: "16px"}} onClick={this.handleLogoutButtonClick}>Logout</Button>
                    </Tooltip>
                </div>
                <div>
                    <Form onSubmit={this.handleSearchSubmit}>
                        <Form.Group>
                            <Form.Control type="text" name="searchText" placeholder="Search" onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Search</Button>
                    </Form>
                </div>
                <div>
                    <LinearProgress style={{display: this.state.displayProgressBar, marginTop: "16px", marginBottom: "16px"}} />
                </div>
                <div style={{marginTop: "16px"}}>
                    <ListGroup>
                        {this.state.posts.map(post =>
                            <Link to={`/posts/${post.id}`} key={post.id}>
                                <ListGroup.Item key={post.id} style={{marginBottom: "16px"}}><Post data={post} /></ListGroup.Item>
                            </Link>    
                        )}
                    </ListGroup>
                </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="icon-bar">
                    <a href="#" className="facebook"><i class="fa fa-facebook" onClick={() => this.setState({ showDialog: true, dialogName: "Facebook" })}></i></a>
                    <a href="#" className="twitter"><i class="fa fa-twitter" onClick={() => this.setState({ showDialog: true, dialogName: "Twitter" })}></i></a>
                    <a href="#" className="google"><i class="fa fa-google"></i></a>
                    <a href="#" className="linkedin"><i class="fa fa-linkedin"></i></a>
                    <a href="#" className="youtube"><i class="fa fa-youtube" onClick={() => this.setState({ showDialog: true, dialogName: "YouTube" })}></i></a>
                </div>
                <Dialog open={this.state.showDialog}>
                    <div style={{padding: "16px"}}>
                        <p>Redirecting to our {this.state.dialogName} page</p>
                        <CircularProgress />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(MainPage);