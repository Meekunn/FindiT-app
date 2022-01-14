import React from "react";
import '../style/welcome.scss'
import { Button } from "@material-ui/core";

const Welcome = () =>{

    return(
        <div className='main-welcome'>
            <div className='welcome-box'>
                <div className='box-content'>
                    <h1>Welcome to FindiT</h1>
                    <p>Dedicated to help you improve your relation with lecturers.</p>
                    <Button variant="contained">Sign up as a lecturer</Button>
                    <Button variant="outlined">Continue as a Student</Button>
                </div>
                <div className='box-blank'>
                </div>
            </div>
        </div>
    )
}

export default Welcome