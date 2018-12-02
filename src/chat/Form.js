import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      message: '',
      list: [],
    };
    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }

  componentDidMount() {
    let curr_user_id = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("users");
    ref.orderByChild("uid")
        .equalTo(curr_user_id)
        .on('value', (snapshot) => {
          console.log("stop2")
            snapshot.forEach((childSnapshot) => {
              console.log("stop3")
                var key = childSnapshot.key; // you will get your key here
                let x = snapshot.val()[key];
                console.log(x.first_name);
                if (this.state.userName !== x) {
                  this.setState({userName: x.first_name});
                }
                console.log(this.state.userName)
            });
        });
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.user) {
  //     this.setState({'userName': nextProps.user.displayName});
  //   }
  // }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
  listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }
  render() {
    return (
      <div className="form">
        <div className="form__message">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}