import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Journal from './Journal' 
import firebase from './firebase';

class TextAnalysis extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        categories: "",
        entities: [],
      };
    }
  
    componentDidMount() {
       let text = "Within the restless, hurried, modern world We took our hearts’ full pleasure—You and I,And now the white sails of our ships are furled,And spent the lading of our argosy.";
  
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
  
      fetch('https://language.googleapis.com/v1/documents:annotateText?key=AIzaSyBnfMYcFxnIFu_X33YEPkbY95yP0IUwdbc', {    
          method: 'POST',
          //mode: 'CORS',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postParameters),
          })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.entitySimilarity();
            this.setState({
              isLoaded: true,
              categories: result.categories,
              entities: result.entities,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, categories, entities } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return <div>Res: {categories}</div>;
      }
    }

    entitySimilarity(){
        let userSimilarities = [];
       // let users = firebase.database().ref('users');
        let users = [
            {
                name: 'madeline',
                messages: [
                    {
                        text: 'the world is full of hearts',
                        entities: [
                            {name: 'world',
                            salience: 0.3},
                            {name: 'hearts',
                            salience: 0.2}
                        ],
                        categories: []
                    },
                    {
                        text: 'do you hear the people sing?',
                        entities: [
                            {name: 'sing',
                            salience: 0.5},
                            {name: 'people',
                            salience: 0.1}
                        ],
                        categories: ['people']
                    }
                ],
            }
        ];
        console.log(usersRef);
        usersRef.forEach(user => {
            let otherEntitites = user.text.entities;
            let a = 0, b = 0;
            if (otherEntitites.length > this.state.entities.length){
                a= otherEntitites;
                 b=this.state.entities;
            } 
            else{
                a = this.state.entities;
                 b = otherEntitites;
            }
            let totalSimilarity = 0;
            a.forEach(word => {
                let word2Loc = b.indexOf(word)
                if(word2Loc > -1){
                    //word in both lists
                    totalSimilarity += word.salience;
                }
            });
        });

    }

  }

  export default TextAnalysis