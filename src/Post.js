import React from 'react';

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: props.data
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <div>
                    <p>Date: {this.formatDateString(this.state.post.createdAt)} | Comments: {this.state.post.comments.length}</p>
                </div>
            </div>
        );
    }

    formatDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
}

export default Post;