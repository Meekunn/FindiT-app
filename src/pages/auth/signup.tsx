import { FC, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { Visibility, VisibilityOff} from '@material-ui/icons'
import { Button, TextField, InputAdornment } from "@material-ui/core"
import '../../style/signup.scss'

const SignUp:FC<ILecturersAuth> = (props) => {

    const history = useHistory()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [signup, setSignup] = useState<boolean>(false)
    const [showpass, setShowpass] = useState<boolean>(true)
    const [showconfirm, setShowconfirm] = useState<boolean>(true)

    const handleShowPass = () => {
        setShowpass(!showpass)
    }
    const handleShowConfirm = () => {
        setShowconfirm(!showconfirm)
    }

    const verifyEmail = (user: any) => {
        if(user) {
            sendEmailVerification(user)
            .then(() => {
                //Verification sent
                alert("Check your email")
            })
            .catch(() =>{
                //Error
                setError("An Error occured")
                alert("An Error occured")
            })
        }
    }

    const signUp = async (e: any) => {
        e.preventDefault()
        setSignup(true)

        if(password !== confirm){
            setError("Password doesn't match")
            alert("Password does not match")
            setEmail("")
            setPassword("")
            setConfirm("")
            setSignup(true)
        } else {
            createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) =>{
            const user = auth.currentUser
            if(user){
                verifyEmail(user)
            }
            history.replace('/setup')
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
        setSignup(true)
        }
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
                        type={showpass? 'password': 'text'}
                        placeholder='******'
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <button
                                    style={{padding: '5px', background: 'transparent', outline: 'none', border: 'none', color: '#8a5d79'}}
                                    onClick={handleShowPass}
                                    >{showpass? <Visibility /> : <VisibilityOff />}
                                </button>
                              </InputAdornment>
                            ),
                          }}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <TextField
                        id="outlined-confirmpassword-input"
                        label="Confirm Password"
                        type={showconfirm? 'password': 'text'}
                        placeholder='******'
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <button
                                    style={{padding: '5px', background: 'transparent', outline: 'none', border: 'none', color: '#8a5d79'}}
                                    onClick={handleShowConfirm}
                                    >{showconfirm? <Visibility /> : <VisibilityOff />}
                                </button>
                              </InputAdornment>
                            ),
                          }}
                        autoComplete="current-password"
                        value={confirm}
                        onChange={(e)=>setConfirm(e.target.value)}
                        />
                        <Button variant="contained" disabled={signup} onClick={signUp} >GET STARTED</Button>
                    </div>
                    <div className='signup-footer'>
                        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                        <Link to='/'>Welcome Page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp