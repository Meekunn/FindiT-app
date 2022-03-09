import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { auth } from '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import '../style/forgotpass.scss'

const ForgotPass = () => {

    const [email, setEmail] = useState<string>("")

    const resetPass = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password Reset Link Sent")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    return(
        <div className='pass-wrapper'>
            <div className='pass-contain'>
                <h1>Forgot Password?</h1>
                <p>Click the Button to Reset Password</p>
                <div className='pass-form'>
                    <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    placeholder='john@example.com'
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Button variant="contained" onClick={resetPass} >RESET PASSWORD</Button>
                    <Link to='/signin'>Sign in</Link>
                </div>
            </div>
        </div>
    )
}
export default ForgotPass