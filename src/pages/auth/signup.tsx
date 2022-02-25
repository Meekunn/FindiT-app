import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { Button } from "@material-ui/core"
import { TextField } from '@material-ui/core'
import '../../style/signup.scss'

const SignUp:FC<ILecturersAuth> = (props) => {
    const history = useHistory()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [signup, setSignup] = useState<boolean>(false)

    const verifyEmail = (user: any) => {
        if(user) {
            sendEmailVerification(user)
            .then(() => {
                //Verification sent
                alert("Check your email")
            })
            .catch((error:any) =>{
                //Error
                alert("An Error occured")
            })
        }
    }

    const signUp = async (e: any) => {
        e.preventDefault()

        if(password !== confirm){
            setError("Password doesn't match")
            alert("Password does not match")
        }

        setSignup(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then( (userCredential: any) =>{
            const user = auth.currentUser
            if(user){
                verifyEmail(user)
                if(user.emailVerified){
                    history.push('/home')
                }
            }
        })
        .catch((error:any) => {

            if(error.code === 'auth/weak-password'){
                setError('Please enter a strong password')
                alert('Please enter a strong password')
            } 
            else if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use')
                alert('Email is already in use')
            } 
            else{
                setError('Unable to Sign Up. Try again later.')
                alert('Oops, Try again later')
            }

            setSignup(false)
        })
        setEmail("")
        setPassword("")
        setConfirm("")
    }

    return(
        <div className='main-signup'>
            <div className='signup-box'>
                <div className='signup-content'>
                    <h1>Sign Up on FindiT</h1>
                    <p>Dedicated to helping you navigate your relation with lecturers</p>
                    <div className='form'>
                        <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        placeholder='john@example.com'
                        autoComplete="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        placeholder='******'
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <TextField
                        id="outlined-confirmpassword-input"
                        label="Confirm Password"
                        type="password"
                        placeholder='******'
                        autoComplete="current-password"
                        value={confirm}
                        onChange={(e)=>setConfirm(e.target.value)}
                        />
                        <Button variant="contained" onClick={signUp} >GET STARTED</Button>
                    </div>
                    <div className='signup-footer'>
                        <p>Already have an account?</p>
                        <p>Sign In</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp