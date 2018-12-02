import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import firebase from './firebase';

export default class CreateEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            newEntry: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
      }

      componentWillMount() {
          console.log(this.props.location.state.posts);
          this.setState({
            posts: this.props.location.state.posts,
            num_entries: this.props.location.state.posts.length + 1
        });
      }

     submit(e) {
          console.log(this.props.location.state.posts);
        let curr_user_id = firebase.auth().currentUser.uid;
        e.preventDefault();

        var ref = firebase.database().ref("entries");

        var entry = {
            owner_uid: curr_user_id,
            date: Date.now(),
            content: this.state.content,
            entry_num: this.state.num_entries
        }
        ref.push(entry);
      }

    handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
    }


    render() {
        return (
            <div>
                <Link to={{ pathname:"/journal", state:{posts: this.props.location.state.posts}}}>
                    Back to Journal
                </Link>
                <h1>Entry #{this.state.num_entries}</h1>
                <textarea
                    // type="text"
                    name="content"
                    placeholder="Write how you're feeling here..."
                    onChange={this.handleChange}
                    value={this.state.content}
                />
                <button onClick={this.submit}>
                    <Link to={{ pathname:"/journal", state:{posts: this.props.location.state.posts}}}>Save Entry!</Link>
                </button>
            </div>
        )
    }
}