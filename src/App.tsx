import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, AuthRoute } from 'react-router-dom';
import routes from './config/route'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
