import React, {Component} from 'react'
import '../App.css';
import Form from './Form';
import firebase from 'firebase';

// code from https://medium.com/@Chilid/react-firebase-chat-app-a115653b7477

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  // handleSignIn() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // }
  // handleLogOut() {
  //   firebase.auth().signOut();
  // }
  render() {
    return (
      <div className="app">
        <div className="app__header">
          <h2>
            Calmunity: Chat
          </h2>
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}