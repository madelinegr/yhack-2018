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
    componentDidMount() {
        let curr_user_id = firebase.auth().currentUser.uid;

        const ref = firebase.database().ref('entries');
        let newState = [];
        ref.orderByChild("owner_uid")
            .equalTo(curr_user_id)
            .on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // you will get your key here
                    let x = snapshot.val()[key];
                    console.log(x);
                    newState.push(x);
                });
        });

        this.setState({posts: newState});
        console.log(curr_user_id);
        console.log(newState);
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
        console.log(this.state.posts);
        if (this.state.posts.length > 0) {
            console.log(this.state.posts[0]);
        }

        return (
            <div>
                <button>
                    <Link to="/journal/new_entry"> Click here to make a new blog post </Link>
                </button>
                {this.state.posts.length > 0 ?
                    <ul>
                        <li>
                            <Link to={`/journal/${this.state.posts[0].entry_num}`}>
                                Entry # {this.state.posts[0].entry_num}
                            </Link>
                        </li>
                    </ul>
                    :
                    null
                }

                <TextAnalysis />
            </div>
        );
    }
}
