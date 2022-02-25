import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from "@material-ui/core"
import { TextField } from '@material-ui/core'
import '../../style/signin.scss'

const SignIn:FC<IPageProps> = (props) => {

    const history = useHistory()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [signin, setSignin] = useState<boolean>(false)

    const signIn = (e: any) => {
        e.preventDefault()
        if (error !== ""){
            setError("")
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            const user = userCredential.user
            history.push("/home")
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
                        type="password"
                        placeholder='******'
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button variant="contained" onClick={signIn} >GET STARTED</Button>
                    </div>
                    <div className='signin-footer'>
                        <p>New Here?</p>
                        <p>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn