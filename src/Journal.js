import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import firebase from './firebase';
import TextAnalysis from './TextAnalysis';

export default class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
      }

    // var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    componentWillMount() {
        this.setState({posts: this.props.location.state.posts});

        // postsRef.on('value', (snapshot) => {
        //     let posts = snapshot.val();
        //     let newState = [];
        //     for (let post in posts) {
        //         newState.push({
        //             owner_uid: curr_user_id,
        //             date: posts[post].date,
        //             content: posts[post].content
        //         });
        //     }
        //     this.setState({
        //         posts: newState
        //     });
        // });
    }

    render() {
        console.log(this.state.posts)
        return (
            <div>
                <button>
                    <Link to={{ pathname: "/journal/new_entry", state: {posts: this.state.posts} }}>
                        Click here to make a new blog post
                    </Link>
                </button>
                {this.state.posts.length > 0 ?
                    <ul>
                        {
                            this.state.posts.map(p => (
                                <li key={p.entry_num}>
                                    <Link to={{ pathname: `/journal/${p.entry_num}`, state: {posts: this.state.posts}}}>
                                        Entry # {p.entry_num}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    :
                    null
                }

                <TextAnalysis />
            </div>
        );
    }
}
