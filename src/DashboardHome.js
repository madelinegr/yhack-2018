import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './DashboardHome.css';
import Journal from './Journal';
import  ChatBot from './chat/ChatBot';
import Chat  from './chat/Chat';

export default class DashboardHome extends Component {
    render() {
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
}
