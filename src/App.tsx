import React, { FC } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Welcome from './pages/welcome'
import SignUp from './pages/auth/signup'
import SearchPage from './pages/searchpage'

const App:FC<IApp> = (props:any) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <SearchPage />
          </Route>
          <Route path="/signup">
            <SignUp email={Email} password={password} />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


{/* <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return(
             <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => {
                  if(route.protected)
                    {return <AuthRoute><route.component {...props} /></AuthRoute>}

                  return <route.component 
                  {...props}
                  {...route.props} />
              }}
            />
          )})}
        </Switch>
      </BrowserRouter> */}