import React, {Component} from 'react';
import firebase from './firebase';
import { Switch, Route, Link } from 'react-router-dom'
import './CreateAccount.css';

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
                <strong><h1>Start chatting, journalling, and connecting now.</h1></strong>
                <h2>We value users’ anonymity, therefore we only require a first name, username, password, and birthdate. This information creates a personalized experience for each user, while optimizing user matching. </h2>
                <form>
                    <h3 style={{marginTop: '30px', marginLeft: '30px'}}>First Name</h3>
                    <input
                        style={{marginTop: '0px'}}
                        type="text"
                        name="first_name"
                        placeholder="What's your first name?"
                        onChange={this.handleChange}
                        value={this.state.name}
                    /> *Required for chat and personalization.

                    <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Username</h3>
                    <input
                        style={{marginTop: '0px'}}
                        type="text"
                        name="username"
                        placeholder="Create a username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    /> *Required for account management.

                    <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Password</h3>
                    <input
                        style={{marginTop: '0px'}}
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    /> *Required for account management.

                    <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Age</h3>
                    <input
                        style={{marginTop: '0px'}}
                        type="text"
                        name="password"
                        placeholder="What is your age?"
                        onChange={this.handleChange}
                        value={this.state.age}
                    /> *Required for optimal user matching.

                    <h3 style={{marginTop: '30px', marginLeft: '30px'}}>Gender</h3>
                    <input
                        style={{marginTop: '0px'}}
                        type="text"
                        name="password"
                        placeholder="Input your gender"
                        onChange={this.handleChange}
                        value={this.state.gender}
                    /> Optional for more optimized user matching
                </form>

                <button className='white-btn' onClick={this.handleSubmit} style={{margin: '30px'}}>
                    <Link to="/dashboard" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Sign up!</Link>
                </button>
            </div>
        );
    }
};

// export default CreateAccount;
