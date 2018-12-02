import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Journal from './Journal'
import Entry from './Entry'
import CreateEntry from './CreateEntry';

// The Roster component matches one of two different routes
// depending on the full pathname
const Dashboard = () => (
  <Switch>
    <Route exact path='/dashboard' component={DashboardHome}/>
    <Route exact path='/journal' component={Journal}/>
    <Route exact path='/journal/new_entry' component={CreateEntry}/>
    <Route path='/journal/:number' component={Entry}/>
  </Switch>
)

export default Dashboard