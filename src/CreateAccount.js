import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route, Link } from 'react-router-dom'

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          username: '',
          password: '',
          age: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(e) {
        e.preventDefault();

        let email = this.state.username + "@calmunity.com";
        console.log(email);

        firebase.auth().createUserWithEmailAndPassword(email, this.state.password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
          });

          let fn = this.state.first_name;
          let un = this.state.username;
          let a = this.state.age;

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("in create account");
                const usersRef = firebase.database().ref("users");
                const user = {
                    uid: firebase.auth().currentUser.uid,
                    first_name: fn,
                    username: un,
                    age: a,
                    messages: [{
                        text: "hello world",
                        entities: [],
                        categories: [],
                    }]
                }
                usersRef.push(user);
            } else {
                console.log('user is to be signed out');
            }
          });

        this.setState({
          first_name: '',
          username: '',
          password: ''
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
                <form>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="What's your first name?"
                        onChange={this.handleChange}
                        value={this.state.first_name}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Create a username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="Create a password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your aage"
                        onChange={this.handleChange}
                        value={this.state.age}
                    />
                    <button onClick={this.handleSubmit}>
                        <Link to="/dashboard">Sign Up!</Link>
                    </button>
                </form>
            </div>
        );
    }
};

// export default CreateAccount;