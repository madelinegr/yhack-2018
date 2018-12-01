import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route, Link } from 'react-router-dom'

// const CreateAccount = () => {
export default class CreateAccount extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          username: '',
          password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        e.preventDefault();
    
        // const usersRef = firebase.database().ref('users');
        // const user = {
        //   name: this.state.name,
        //   username: this.state.username
        // }
        // usersRef.push(user);





        // firebase.auth().signInAnonymously().catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     console.log(errorCode);
        //     console.log(errorMessage);
        //   });

        //   firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //       // User is signed in.
        //       var isAnonymous = user.isAnonymous;
        //       var uid = user.uid;

        //       console.log("uid: " + uid);
        //       // ...
        //     } else {
        //         console.log("user to be signed out");
        //       // User is signed out.
        //       // ...
        //     }
        //     // ...
        //   });


        let email = this.state.username + "@calmunity.com";
        console.log(email);

        firebase.auth().createUserWithEmailAndPassword(email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
          });

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
            //   var displayName = user.displayName;
            //   var email = user.email;
            //   var emailVerified = user.emailVerified;
            //   var photoURL = user.photoURL;
            //   var isAnonymous = user.isAnonymous;
            //   var uid = user.uid;
            //   var providerData = user.providerData;
                console.log(user);
              // ...
            } else {
                console.log('user is signed out');
              // User is signed out.
              // ...
            }
          });

    
        this.setState({
          name: '',
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
                <form >
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
                    <input
                        type="text"
                        name="password"
                        placeholder="Create a password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <button onClick={this.handleSubmit}>
                        <Link to="/dashboard">Sign up!</Link>
                    </button>
                </form>
            </div>
        );
    }
};

// export default CreateAccount;