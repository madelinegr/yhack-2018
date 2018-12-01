import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route } from 'react-router-dom'

// const CreateAccount = () => {
export default class CreateAccount extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        e.preventDefault();
    
        const usersRef = firebase.database().ref('users');
        const user = {
          name: this.state.name,
          username: this.state.username
        }
        usersRef.push(user);
    
        this.setState({
          name: '',
          username: ''
        });
      }
    
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="text"
                    name="name"
                    placeholder="What's your name?"
                    onChange={this.handleChange}
                    value={this.state.name}
                    />
                    <input
                    type="text"
                    name="username"
                    placeholder="Create a username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    />
                    <button>Add Item</button>
                </form>
            </div>
        );
    }
};

// export default CreateAccount;