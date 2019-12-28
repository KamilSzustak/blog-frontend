import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';    
import PostPage from './PostPage';
import MainPage from './MainPage';
import NewPostPage from './NewPostPage';
import EditPostPage from './EditPostPage';
import AuthorizationRoute from './AuthorizationRoute';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { Tooltip, Fab, FormGroup, Switch as MaterialSwitch, FormControlLabel } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            darkModeEnabled: false,
            backgroundColor: "#F8F8F8"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            darkModeEnabled: event.target.checked
        }, () => {
            if (this.state.darkModeEnabled) {
                this.setState({
                    backgroundColor: "#666666"
                });
            } else {
                this.setState({
                    backgroundColor: "#FFFFFF"
                });
            }
        });
    }

    render() {
        return (
            <div style={{backgroundColor: this.state.backgroundColor, padding: "16px"}}>
                <BrowserRouter>
                    <div style={{marginBottom: "16px"}}>
                        <Link to="/">
                            <Tooltip title="Click to refresh the main page">
                                <h1 style={{display: "inline"}}>Blog</h1>
                            </Tooltip>
                        </Link>
                        <Link to="/new">
                            <Tooltip title="Click to add a new post">
                                <Fab color="primary" aria-label="New post" style={{marginLeft: "32px"}}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </Link>
                        <FormGroup style={{display: "inline", margin: "32px"}}>
                            <FormControlLabel control={
                                <MaterialSwitch checked={this.state.darkModeEnabled} onChange={this.handleChange} value="darkModeEnabled"/>
                            } label="Dark mode"/>
                        </FormGroup>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" component={AuthorizationRoute} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignUpPage} />
                            <Route path="/home" component={MainPage} />
                            <Route path="/posts/:id" component={PostPage} />
                            <Route path="/new" component={NewPostPage} />
                            <Route path="/edit/:id" component={EditPostPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
