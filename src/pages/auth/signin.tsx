import { FC, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Visibility, VisibilityOff} from '@material-ui/icons'
import { Button, TextField, InputAdornment } from "@material-ui/core"
import '../../style/signin.scss'

const SignIn:FC<IPageProps> = (props) => {

    const history = useHistory()
    const user = auth.currentUser

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [showpass, setShowpass] = useState<boolean>(true)

    const handleShowPass = () => {
        setShowpass(!showpass)
    }

    const signIn = (e: any) => {
        e.preventDefault()
        if (error !== ""){
            setError("")
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            if(user){
                if(user.emailVerified){
                    history.push('/dashboard')
                }else{
                    alert("Verify your email")
                }
            } 
        })
        .catch((error:any) => {
            setError(error.message)
            alert("Invalid Email or Password")
        })
    }

    return(
        <div className='main-signin'>
            <div className='signin-box'>
                <div className='signin-content'>
                    <h1>Sign In on FindiT</h1>
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
                        <Button variant="contained" onClick={signIn} >SIGN IN</Button>
                    </div>
                    <div className='signin-footer'>
                        <p>New Here? <Link to='/signup'>Sign Up</Link></p>
                        <Link to='/'>Welcome Page</Link>
                    </div>
                    <div className='signin-footer2'>
                        <Link to='/forgotpassword'>Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn