import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Home from './Home';
import './Main.css';

const Main = () => {
    return (
      <Switch>
         <main>
             <Route exact path = "/" component={Home} />
             <Route path='/createaccount' component={CreateAccount}/>
             <Route path='/login' component={Login}/>
        </main>
      </Switch>
    );
};

export default Main;
