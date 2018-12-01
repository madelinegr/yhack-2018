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
        categories: [],
        entities: [],
        users: [
            {
                name: 'madeline',
                messages: [
                    {
                        text: 'the world is full of hearts',
                        entities: [
                            {name: 'world',
                            salience: 0.3},
                            {name: 'hearts',
                            salience: 0.1}
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
                        categories: [{name: 'people'}]
                    }
                ],
            }
        ],
      };
    }
  
    componentDidMount() {
        let name = 'history';
        let text = 'George Herbert Walker Bush (1924-2018), served as the 41st U.S. president from 1989 to 1993. He also was a two-term U.S. vice president under Ronald Reagan, from 1981 to 1989. Bush, a World War II naval aviator and Texas oil industry executive, began his political career in the U.S. House of Representatives in 1967. ';
      
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
            this.setState({
              isLoaded: true,
              categories: result.categories,
              entities: result.entities,
            });
            let categoryMatches = this.categorySimilarity();
            this.entitySimilarity(categoryMatches);
            let set = false;
            this.state.users.forEach(user => {
                if(user.name == name){
                    set = true;
                    user.messages.push({
                        text: text,
                        entities: result.entities,
                        categories: result.categories,
                    });
                }
            })
            if(!set){
                this.state.users.push({
                    name: name,
                    messages: [{
                        text: text,
                        entities: result.entities,
                        categories: result.categories,
                    }],
                });
            }
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
        return <div>Res: {categories[0].name}</div>;
      }
    }

    

    categorySimilarity(){
        let categories = this.state.categories;
        //if no category, can't narrow it down, so search other things on all users
        if(categories.length == 0) return this.state.users;
        //for now, I am just matching the top category, adding more may help
        let category = categories[0];
        //if no results, contrinue to go levels higher according to /
        let categoryPath = category.name.split('/');
        for(let i = categoryPath.length; i > 0; i--){
            let currCategory = categoryPath.slice(0, i);
            let commonUsers = [];
            this.state.users.forEach(user => {
                user.messages.forEach(message => {
                    if(message.categories.length != 0){
                        let userPath = message.categories[0].name.split('/');
                        if(userPath.length >= i){
                            let userCategory = userPath.slice(0, i);
                            if(userCategory == currCategory){
                                commonUsers.add(user);
                            }
                        }
                    }
                });
            });
            //we got results
            if(commonUsers.length != 0) return commonUsers;
        }
        //no matches
        return this.state.users;
    }

    entitySimilarity(possibleUsers){
       // let users = firebase.database().ref('users');
       
        console.log(possibleUsers);
        let userSimilarities = {};
        possibleUsers.forEach(user => {
            let maxSimilarity = 0;
            user.messages.forEach(message=> {
                let otherEntitites = message.entities;
                let a = 0, b = 0;
                if (otherEntitites.length > this.state.entities.length){
                    a= otherEntitites; b=this.state.entities;
                } 
                else{
                    a = this.state.entities; b = otherEntitites;
                }
                let msgSimilarity = 0;
                a.forEach(entity => {
                    b.forEach(entity2 => {
                        if(entity.name == entity2.name){
                            msgSimilarity += entity.salience + entity2.salience
                        }
                    })
                });
                maxSimilarity = Math.max(maxSimilarity, msgSimilarity);
            })
            userSimilarities[user.name] = maxSimilarity;
            
        });
        console.log(userSimilarities);

    }

  }

  export default TextAnalysis