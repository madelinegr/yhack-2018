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
                <form onSubmit={this.handleSubmit}>
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
                    <button>
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