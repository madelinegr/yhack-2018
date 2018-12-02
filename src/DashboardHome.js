import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './DashboardHome.css';
import Journal from './Journal';
import  ChatBot from './chat/ChatBot';
import Chat  from './chat/Chat';
import firebase from './firebase';

export default class DashboardHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loaded: false,
        }
    }

    componentWillMount() {
        let curr_user_id = firebase.auth().currentUser.uid;
        console.log(curr_user_id);
        var ref = firebase.database().ref("users"); // query to get all user data
        ref.orderByChild("uid")
            .equalTo(curr_user_id)
            .on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // you will get your key here
                    console.log(key);
                    let x = snapshot.val()[key];
                    this.setState({user: x});
                });
        });

        var ref2 = firebase.database().ref('entries');
        let newState = [];

        ref2.orderByChild("owner_uid")
        .equalTo(curr_user_id)
        .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var key = childSnapshot.key; // you will get your key here
                let x = snapshot.val()[key];
                console.log(x);
                newState.push(x);
            });
        });

        this.setState({posts: newState, loaded: true});

        console.log(curr_user_id);
        console.log(newState.length);
    }

    render() {
<<<<<<< HEAD
        return (
          <div>
            <div>
              <button className='white-btn'>
                  <Link to="/journal" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Journal</Link>
              </button>
              <button className='white-btn'>
                  <Link to="/chat/chatbot" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Personal Space</Link>
              </button>
              <button className='white-btn'>
                  <Link to="/chat/chat" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Chat</Link>
              </button>
            </div>
            <Switch>
              <Route path= "/journal" component={Journal} />
              <Route path='/chat/chatbot' component={ChatBot}/>
              <Route path='/chat/chat' component={Chat}/>
            </Switch>
          </div>
        );
      }
=======
        // ref.on('value', (snapshot) => {
        //     let user = snapshot.val();
        //     console.log(user);
        // });

        if (this.state.user && this.state.user !== undefined) {
            return (
                <div>
                    <h1>
                        Welcome to calmunity, {this.state.user.first_name}!
                    </h1>
                    <button>
                        <Link to={{pathname: "/journal", state: {posts: this.state.posts}}}> Journal </Link>
                    </button>
                    <button>
                        <Link to="/chat"> Chat </Link>
                    </button>
                    <button>
                        <Link to="/chatbot"> Chat Bot</Link>
                    </button>
                </div>
            );
        } else {
            return (<div />);
        }
    }
>>>>>>> f14269d56535f27440ea1df267cd6af9e31ed8f4
}
