import { onAuthStateChanged } from 'firebase/auth'
import { Link, useHistory } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { FC, useState, useEffect} from 'react'
import { auth, db } from '../config/firebase'
import { TextField, Button } from '@material-ui/core'
import '../style/dashboard.scss'

const Dashboard:FC<ILecturers> = props => {

    const history = useHistory()

    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [photoURL, setPhotoURL] = useState<any>("https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png")
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [dash, setDash] = useState<any>({})

    useEffect(() => {
        userOnline()
    },[])

    const userOnline = () => {
        onAuthStateChanged(auth, async (user: any) => {
            if(user){
                const uid = user.uid
                getInfo(uid)
            } else {
                console.log("no user found!")
            }
        })
    }

    const getInfo = async (id: any) => {
        const docRef = doc(db, "lecturers", id)
        const snapDoc = await getDoc(docRef)
        const docData = snapDoc.data()
        if(docData){
            setDash(docData)
            setEmail(docData.email)
            setName(docData.name)
            setTitle(docData.title)
            setPhone(docData.phone)
            setOffice(docData.office)
            setDepartment(docData.department)
            setLocation(docData.location)
            setBio(docData.bio)
            setPhotoURL(docData.photoURL)
            setStatus(docData.status)
        }else{
            console.log("no data found")
            return
        }
    }

    const logOut = () => {
        signOut(auth)
        .then(() => {
            history.replace('/signin')
        })
        .catch(() => {
            console.log("Can't logout")
        })
    }

    return(
        <div className='dash-wrap'>
            <div className='dash-contain'>
                <h1>Dashboard</h1>
                <div className='img-upload'>
                    <img alt='User' src={photoURL} />
                    <Button variant="outlined"><Link to={{
                                pathname: "/edit",
                                state: dash
                            }} className='edit-link'>EDIT PROFILE</Link></Button>
                </div>
                <div className='dash-form'>
                    <TextField
                    InputProps={{
                        readOnly: true
                    }}
                    InputLabelProps={{ shrink: true }}
                    id="outlined-uncontrolled"
                    label="Full Name"
                    value={name}
                    />
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    id="outlined-uncontrolled"
                    label="Title"
                    value={title}
                    />
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    id="outlined-uncontrolled"
                    label="Email"
                    value={email}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Phone Number"
                    value={phone}
                    />
                    <TextField
                    id="outlined-select-currency"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Department"
                    value={department}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    label="Location"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    value={location}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Office"
                    value={office}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label="Bio"
                    value={bio}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label="You are currently"
                    value={status}
                    />
                    <Button variant="contained"><Link to='/editpassword'>Change Password</Link></Button>
                    <Button variant="contained" className='sign-out' onClick={logOut}>SIGNOUT</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard