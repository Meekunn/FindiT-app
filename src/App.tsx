import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import routes from './config/route'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return(
             <Route 
                key={index}
                path={route.path}
                element={route.element}
              //   render={(props: RouteComponentProps<any>) => {
              //     if(route.protected)
              //       {return <AuthRoute><route.component {...props} /></AuthRoute>}

              //     return <route.component 
              //     {...props}
              //     {...route.props} />
              // }}
            />
          )})}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
