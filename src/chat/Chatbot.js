import React, {Component} from 'react'
import '../App.css';
import firebase from 'firebase';

// code from https://medium.com/@Chilid/react-firebase-chat-app-a115653b7477

export default class ChatBot extends Component {
    render() {
        return (
            <div>
                <h1>Chatbot Page</h1>
                <iframe
    allow="microphone;"
    width="350"
    height="500"
    src="https://console.dialogflow.com/api-client/demo/embedded/2b5694b6-a421-4d24-9b95-0e62d78d9236">
</iframe>
            </div>
        );
    }
}