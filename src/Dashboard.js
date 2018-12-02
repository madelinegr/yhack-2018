import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Journal from './Journal'
import { Link } from 'react-router-dom';

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
