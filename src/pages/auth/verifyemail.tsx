import { useHistory } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { Button } from '@material-ui/core'

const VerifyPage = () => {

    const history = useHistory()
    const user = auth.currentUser

    const verifiedEmail = () => {
        if(user && user.emailVerified){
            history.replace('./setup')
        } else{
            alert("verify your email")
        }
    }

    const verifyEmail = () => {
        if(user) {
            sendEmailVerification(user)
            .then(() => {
                //Verification sent
                alert("Check your email")
            })
            .catch(() =>{
                //Error
                alert("An Error occured")
            })
        }
    }

    return (
        <div>
            <h1>Verfied Email?</h1>
            <Button onClick={verifiedEmail} >Continue to Setup</Button>
            <Button onClick={verifyEmail} >Resend Link</Button>
        </div>
    )
}

export default VerifyPage