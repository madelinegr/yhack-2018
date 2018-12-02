import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import firebase from './firebase';

export default class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
      }
    // var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    componentDidMount() {
        const postsRef = firebase.database().ref('posts');
        postsRef.on('value', (snapshot) => {
            let posts = snapshot.val();
            let newState = [];
            for (let post in posts) {
                newState.push({
                    id: post,
                    date: posts[post].date,
                    content: posts[post].content
                });
            }
            this.setState({
                posts: newState
            });
        });
    }

    render() {
        console.log(this.state.posts);
        return (
            <div>
                <button>
                    <Link to="/journal/new_entry"> Click here to make a new blog post </Link>
                </button>
                {this.state.posts.length > 0 ?
                    <ul>
                        <li>
                            <Link to={`/journal/${this.state.posts[0].entry_num}`}>
                                {this.state.posts[0].entry_num}
                            </Link>
                        </li>
                    </ul>
                    :
                    null
                }
            </div>
        );
    }
}
