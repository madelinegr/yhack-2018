import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Journal from './Journal'

// The Roster component matches one of two different routes
// depending on the full pathname
const Dashboard = () => (
  <Switch>
    <Route exact path='/dashboard' component={DashboardHome}/>
    <Route path='/journal' component={Journal}/>
  </Switch>
)

export default Dashboard