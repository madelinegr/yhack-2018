import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard';

// const CreateAccount = () => {
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          password: '',
          username: '',
          loggedIn: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        // e.preventDefault();
    
        // // const usersRef = firebase.database().ref('users');
        // // const user = {
        // //   name: this.state.name,
        // //   username: this.state.username
        // // }
        // // usersRef.push(user);

        let email = this.state.username + "@calmunity.com";
        firebase.auth().signInWithEmailAndPassword(email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
          });

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(firebase.auth().currentUser);
              // User is signed in.
            //   var displayName = user.displayName;
            //   var email = user.email;
            //   var emailVerified = user.emailVerified;
            //   var photoURL = user.photoURL;
            //   var isAnonymous = user.isAnonymous;
            //   var uid = user.uid;
            //   var providerData = user.providerData;
            //   console.log(user);
              // ...
            } else {
                // console.log("user to be signed out");
              // User is signed out.
              // ...
            }
          });
    
        this.setState({
            loggedIn: 1
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
                    name="username"
                    placeholder="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    />
                    <input
                    type="text"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    />
                    <button onClick={this.handleSubmit}>
                        <Link to="/dashboard">Login</Link>
                    </button>
                </form>
                {/* {this.state.loggedIn ?
                    <p>Just logged {this.state.username} in!</p>
                    :
                    null
                } */}
            </div>
        );
    }
};