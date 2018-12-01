import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
<<<<<<< HEAD
serviceWorker.unregister();
=======
serviceWorker.unregister();

let text = "i've been depressed for most of my teenage years, i'm 19 now and i've been feeling worse than ever for the last couple of months due to some internal issues, I do believe i'll resolve these issues with myself one day, but i'm scared i'll keep feeling this way... It's like there's no point in anything. Anything. I can't see how any of this can be worth it. I also keep fearing the day of my death, even if it's far far away. I'm scared that when it comes to the end i'll look back and not see the point of it all. I know that once I resolve these issues I have right now there'll just come others and i'm scared...";

//TODO: get text from user
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
/*
$.post(`https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc`, postParameters, responseJSON => {
	//api call to get various useful properties from given text
	const response = JSON.parse(responseJSON);
});*/

//I think this is React version of above code
fetch('https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc', {
    method: 'POST',
    mode: 'CORS',
    body: JSON.stringify(postParameters),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res => {
	console.log(res);
    return res;
}).catch(err => err);

>>>>>>> 15204b297923cf764404276b027a31031daa4b16
