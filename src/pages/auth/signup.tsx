import React, { useState } from 'react'
import '../../style/signup.scss'
import { auth, db } from '../../config/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core"
import { TextField } from '@material-ui/core'

const SignUp = () =>{

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')

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
                        />
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        placeholder='******'
                        autoComplete="current-password"
                        />
                        <TextField
                        id="outlined-confirmpassword-input"
                        label="Confirm Password"
                        type="password"
                        placeholder='******'
                        autoComplete="current-password"
                        />
                        <Button variant="contained">GET STARTED</Button>
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