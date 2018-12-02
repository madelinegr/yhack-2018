import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard';
import './Login.css';

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
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              console.log(user);
              // ...
            } else {
                console.log("user to be signed out");
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
              <strong><h1>Welcome Back!</h1></strong>
              <form>
                <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Username</h3>
                    <input
                      style={{marginTop: '0px'}}
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Password</h3>
                    <input
                      style={{marginTop: '0px'}}
                      type="text"
                      name="password"
                      placeholder="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                    </form>
                    <button className='white-btn' onClick={this.handleSubmit} style={{margin: '30px'}}>
                        <Link to="/dashboard" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Login</Link>
                    </button>

          </div>
        );

    }
};
