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
        users: [],
        numToDo: 0
      };
    }
  
    componentDidMount() {
        const trainn = ['bba', 'bdsm', 'bdsm', 'bba', 'bba', 'bdsm',
            'hersh', 'tired', 'help', 'so waht', 'dead', 'creeps'];
        const traint = [
            'Paul Abrams has got it all, brilliance, kindness, and incredible sass, yall sleeping on him!!',
           'First years from the south when the sun sets at 4pm everyday. Edit: meme vetting creds to Theo Akpinar',        
            'tfw you havent bothered to do a lit review or form a coherent thesis but the papers due in an hour...',
            'Hey Tara S. at Machado Friday night would you like to get coffee sometime?',
            'Shoutout to Ahmed Ashour and the creative team for Back of the Throat -- four days isnt enough for this incredible and impactful show. Thank you for making it happen.',
            'me showing up to class for the first time since week 3 to take the midterm',
            'All I want for Christmas this year is a boyfriend who has a Hufflepuff’s loyalty and work ethic, a Slytherin’s determination and cleverness, a Gryffindor’s adventurousness and chivalry, and a Ravenclaw’s intelligence and love of learning',
            "I'm so upset. Idk why. I hate going to school. I got into college but I'm still scared if I fail my finals. I hate my teachers they make me feel like a fucking failure in life. I'm drifting apart from my friends. Seems like nobody really cares …",
            "I really need advice. There's this guy that I like, and I feel like there are so many non-verbal hints that he likes me too, like when he glances at me (often) and when he lights up when he talks to me. But then he's really shy so he doesn't take …",
            "You laugh at the way I look. I laugh at the way you look when scared by a spirit. It’s like getting scared of a tiny harmless mouse when a hundred scorpions, a thousand ants and a billion cockroaches surround your decaying corps. You stupid wimp …",
            "Did you hear the good news? He’s finally dead. George H W Bush Sr. I knew he was going to die before the end of the year. I’m so happy. First his hideous disgusting wife dies, now he’s dead. Who’s up for vandalizing his grave? I’ve been holding in this nut throughout November, and I plan to empty it all inside of his corpse’s hollowed our eyeholes. I can’t wait for his son to die. Then I’ll be truly happy.",
            "To all the selfish sex pests, the empty eye-less zombies who would fuck anyone just to share their emptiness",
        
        ]


        for(let i = 0; i<traint.length; i++){
            let text = traint[i];
            let name = trainn[i];
            console.log(text);
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
            this.setState({
              isLoaded: true,
              categories: result.categories,
              entities: result.entities,
            });
            console.log(result);
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
    }
  
    render() {
      const { error, isLoaded, categories, entities } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (categories != null && categories.length != 0){
        return <div>Res: {categories[0].name}</div>;
      } else{
        return <div>nothing here</div>;
      }
    }

    

    categorySimilarity(){
        let curr_user_id = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users"); // query to get all user data
        ref.orderByChild("uid")
            .equalTo(curr_user_id)
            .on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // you will get your key here
                    console.log(key);
                    let x = snapshot.val()[key];
                    console.log(x);
                    console.log(x.messages);
                    this.setState({user: x});
                });
        });


        let categories = this.state.categories;
        //if no category, can't narrow it down, so search other things on all users
        if(categories == null || categories.length == 0) return this.state.users;
        //for now, I am just matching the top category, adding more may help
        let category = categories[0];
        //if no results, contrinue to go levels higher according to /
        let categoryPath = category.name.split('/');
        for(let i = categoryPath.length; i > 0; i--){
            let currCategory = categoryPath.slice(0, i);
            let commonUsers = [];
            this.state.users.forEach(user => {

                user.messages.forEach(message => {
                    if(message.categories != null && message.categories.length != 0){
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

    entityThesourous(entity, resolve){
         let text = entity.name;
             //fetch('http://words.bighugelabs.com/api/2/eb3bde23bd68b58eca5cea41783ea35e/' + text + '/json')
        fetch('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + text + '?key=e2232eec-db13-48e0-bedd-c4afde262ab3')
        .then(res => res.json())
        .then(
        (result) => {
            if(result != null){
                result.forEach(res => {
                    if(typeof res === 'string' || res instanceof String){
                        this.state.entities.push(
                            {
                            name: res,
                            salience: entity.salience / 3,
                        });
                    } else{
                        if(res.meta.syns != null){
                            res.meta.syns[0].forEach(syn => {
                                this.state.entities.push(
                                    {
                                    name: syn,
                                    salience: entity.salience / 3,
                                });
                            });
                        }
                        
                    }       
                });
                this.state.numToDo --;
                if (this.state.numToDo == 0) {
                    resolve("it worked");
                }
                
                
            }
        
        },
        (error) => {}
        );
    }

    entityCommon(possibleUsers){
        let userSimilarities = {};
        possibleUsers.forEach(user => {
            let maxSimilarity = 0;
            console.log("\n\n\n");
            user.messages.forEach(message=> {
                let otherEntitites = message.entities;
                if(otherEntitites != null && this.state.entities != null){
                    let a = [], b = [];
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
                }
                console.log(message);
            })
            userSimilarities[user.name] = maxSimilarity;
            console.log(this.state.entities);
            console.log(userSimilarities);
            
        });
    }


    entitySimilarPromise() {
        let entities = this.state.entities;
        let this2 = this;
        return new Promise(function(resolve, reject) {
            if(entities != null){
                    this2.state.numToDo = entities.length;
                    entities.forEach(entity => {
                        this2.entityThesourous(entity, resolve);
                    }); 
               }

         
        });
    }

    entitySimilarity(possibleUsers){
       // let users = firebase.database().ref('users');
        let this2 = this;
        this.entitySimilarPromise().then(function(response) {
            this2.entityCommon(possibleUsers);
        })
    }

  }

  export default TextAnalysis