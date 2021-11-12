import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './index.css';
import NavBar from "./components/ui/NavBar/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserPage from './components/page/User'

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login/:type?' component={Login} />
                <Route path='/users/:userId'  component={UserPage} />
                <Route path='/users'  component={Users} />
            </Switch>
        </>
    );
}

export default App;