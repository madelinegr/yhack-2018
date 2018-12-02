import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Journal from './Journal'
import { Link } from 'react-router-dom';
import Entry from './Entry'
import CreateEntry from './CreateEntry';
import Chat from './chat/Chat'
import ChatBot from './chat/Chatbot';

// The Roster component matches one of two different routes
// depending on the full pathname
const Dashboard = () => (
    <div>
      <center><h1 style={{marginTop: '15%'}}>Hi there! What are you feeling today?</h1></center>
      <center>
      <form>
          <input
              style={{marginTop: '30px'}}
              type="text"
              name="name"
              placeholder="Start typing here."
          />
      </form>


      <button className='white-btn' style={{margin: '30px'}}>
          <Link to="/dashboardhome" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Connect</Link>
      </button>
      </center>

      <Switch>
        <Route exact path='/dashboard' component={DashboardHome}/>
        <Route exact path='/journal' component={Journal}/>
        <Route exact path='/journal/new_entry' component={CreateEntry}/>
        <Route path='/journal/:number' component={Entry}/>
        <Route path='/chat' component={Chat}/>
        <Route path='/chatbot' component={ChatBot}/>
      </Switch>
    )
    </div>
);

  // <Switch>
  //   <Route exact path='/dashboard' component={DashboardHome}/>
  //   <Route path='/journal' component={Journal}/>
  // </Switch>

  //               onChange={this.handleChange}
                // value={this.state.name}
                // onClick={this.handleSubmit}


export default Dashboard
