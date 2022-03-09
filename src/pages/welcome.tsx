import { Link } from 'react-router-dom'
import '../style/welcome.scss'
import { Button } from "@material-ui/core"

const Welcome = () =>{

    return(
        <div className='main-welcome'>
            <div className='welcome-box'>
                <div className='box-content'>
                    <h1>Welcome to FindiT</h1>
                    <p>Dedicated to helping you improve your relation with lecturers.</p>
                    <Button variant="contained"><Link to='/signup'>Sign up as a lecturer</Link></Button>
                    <Button variant="outlined"><Link to='/home'>Continue as a Student</Link></Button>
                    <div className='download-div'>
                        <Link to="/files/_FindiT_15278287.apk" target="_blank" download className='download'>Download App</Link>
                    </div>
                </div>
                <div className='box-blank'>
                </div>
            </div>
        </div>
    )
}

export default Welcome