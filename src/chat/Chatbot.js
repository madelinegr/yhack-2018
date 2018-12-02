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
/*
    componentDidMount(){
        var apiai = require('apiai');

var app = apiai("<your client access token>");

var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();

fetch('https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc', {    
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postParameters),
    })
  .then(res => res.json())
  .then(
    (result) => {
      this.setState({
        isLoaded: true,
        categories: result.categories,
        entities: result.entities,
        sentiment: result.documentSentiment,
      });
      console.log(result);
      let categoryMatches = this.categorySimilarity();
      console.log(this.entitySimilarity(categoryMatches));

      //TODO:save categories and entities in db
      
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )
    }*/
}