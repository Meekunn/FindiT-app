import { FC, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import routes from './config/route'
import AuthRoute from './components/AuthRoute'


const App:FC<IApp> = (props:any) => {

  const [initializing, setInitializing] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        console.log('user detected')
      } else {
        console.log('No user detected')
      }
      setInitializing(false)
    })
  }, [])

  if(initializing){
    <LinearProgress />
  }

  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
