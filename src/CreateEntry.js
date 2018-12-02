import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import firebase from './firebase';

export default class CreateEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(e) {
        let curr_user_id = firebase.auth().currentUser.uid;
        e.preventDefault();

        const ref = firebase.database().ref("entries");
        const entry = {
            owner_uid: curr_user_id,
            date: Date.now(),
            content: this.state.content,
            entry_num: 1
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
                <Link to='/journal'>Back to Journal</Link>
                <h1>Entry #</h1>
                <textarea
                    // type="text"
                    name="content"
                    placeholder="Write how you're feeling here..."
                    onChange={this.handleChange}
                    value={this.state.content}
                />
                <button onClick={this.handleSubmit}>
                    <Link to='/journal'>Save Entry!</Link>
                </button>
            </div>
        )
    }
}