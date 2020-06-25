import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateAirplane from './pages/CreateAirplane';
import FindAirplane from './pages/FindAirplane';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateAirplane} path="/CreateAirplane" exact />
            <Route component={FindAirplane} path="/FindAirplane" exact />
        </BrowserRouter>
    );
}

export default Routes;