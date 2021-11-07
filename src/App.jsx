import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './index.css';
import NavBar from "./components/NavBar/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import User from './components/User/user'

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/users/:userId'  component={User} />
                <Route path='/users'  component={Users} />
            </Switch>
        </>
    );
}

export default App;