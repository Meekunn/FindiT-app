import  React, {FC} from 'react'
import { Redirect } from 'react-router-dom'
import {auth} from '../config/firebase'
import Logging from '../config/logging'

const AuthRoute: FC<IAuthRoute> = props => {

    const {children} = props;

    if(!auth.currentUser){
        Logging.info('No user Found, Redirecting')
        return <Redirect to='/signin' />
    }

    return(
        <div>{children}</div>
    )
}

export default AuthRoute;