import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Home from './Home';

const Main = () => {
    return (
         <main>
            <Switch>
                <Route exact path = "/" component={Home} />
                <Route path='/createaccount' component={CreateAccount}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </main>
    );
};

export default Main;