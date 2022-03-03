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
    const [email, setEmail] = useState<any>()
    const [photo, setPhoto] = useState<any>()
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [office, setOffice] = useState<string>("")
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
                return
                console.log("no user found!")
            }
        })
    }

    const getInfo = async (id: any) => {
        const docRef = doc(db, "lecturers", id)
        const snapDoc = await getDoc(docRef)
        const docData = snapDoc.data()
        const user = auth.currentUser
        if (user !== null) {
            setEmail(user.email)
            setPhoto(user.photoURL)
            if(docData){
                setDash(docData)
                setName(docData.fullname)
                setTitle(docData.title)
                setPhone(docData.phone)
                setOffice(docData.office)
                setDepartment(docData.department)
                setLocation(docData.location)
                setBio(docData.bio)
            }
        }else{
            console.log("no data found")
            return
        }  
    }

    const logOut = () => {
        signOut(auth)
        .then((result: any) => {
            history.replace('/signin')
        })
        .catch((error: any) => {
            console.log("Can't logout")
        })
    }

    return(
        <div className='dash-wrap'>
            <div className='dash-contain'>
                <h1>Dashboard</h1>
                <div className='img-upload'>
                    <img alt='User-Image' src={photo} />
                    <Button variant="outlined"><Link to={{
                                pathname: "/edit",
                                state: dash
                            }} className='edit-link'>EDIT PROFILE</Link></Button>
                </div>
                <div className='dash-form'>
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    id="outlined-disabled"
                    label="Full Name"
                    defaultValue={name}
                    />
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    id="outlined-uncontrolled"
                    label="Title"
                    defaultValue={title}
                    />
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    id="outlined-disabled"
                    label="Email"
                    defaultValue={email}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Phone Number"
                    defaultValue={phone}
                    />
                    <TextField
                    id="outlined-select-currency"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Department"
                    defaultValue={department}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    label="Location"
                    InputProps={{
                        readOnly: true,
                    }}
                    defaultValue={location}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Office"
                    defaultValue={office}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Bio"
                    defaultValue={bio}
                    />
                    <Button variant="contained"><Link to='/editpassword'>Change Password</Link></Button>
                    <Button variant="contained" onClick={logOut}>SIGNOUT</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard