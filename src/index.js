import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();





const postParameters = {
 "document": {
  "content": text,
  "type": "PLAIN_TEXT"
 },
 "features": {
  "classifyText": true,
  "extractDocumentSentiment": true,
  "extractEntities": true,
  "extractEntitySentiment": true,
  "extractSyntax": false
 }
}

$.post(`https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc`, postParameters, responseJSON => {
	//api call to get various useful properties from given text
	const response = JSON.parse(responseJSON);
});