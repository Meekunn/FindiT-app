import { FC, useState, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Avatar, Button, TextField, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

const ProfileSetup:FC<ILecturerBasic> = props => {

    const history = useHistory()

    const titles = [
        {
            value: "Mrs.",
            label: "Mrs."
        },{
            value: "Mr.",
            label: "Mr."
        },{
            value: "Dr.",
            label: "Dr."
        },{
            value: "Prof.",
            label: "Prof."
        },{
            value: "Engr.",
            label: "Engr."
        }
    ]

    const departments = [
        {
            value: "Informationa dand Communication Technology",
            label: "ICT"
        },
        {
            value: "Electrical and Electronics Engineering",
            label: "EEE"
        }
    ]

    const [fullname, setFullname] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [setup, setSetup] = useState<boolean>(false)

    const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    const handleDepartment = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }

    const handleSetup = async () => {
        const user = auth.currentUser
        if(user !== null){
            const uid = user.uid
            const docRef = doc(db, "lecturers", uid)
            const payload = {
                fullname,
                title,
                phone,
                department,
                location,
                office
            }
            const setDocRef = await setDoc(docRef, payload, {merge:true})
        }
    }

    return(
        <div className='setup-wrap'>
            <div className='setup-contain'>
                <h1>Profile Setup</h1>
                <p>Dedicated to helping you navigate your relation with lecturers</p>
                <div className='img-upload'>
                    <Avatar style={{backgroundColor: "#f3f0f0"}}>
                        <AccountCircle />
                    </Avatar>
                    <Button variant="outlined">Setup Picture</Button>
                </div>
                <div className='setup-form'>
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Full Name"
                    placeholder=""
                    value={fullname}
                    onChange={(e) =>setFullname(e.target.value)}
                    />
                    <TextField
                    id="outlined-basic"
                    select
                    variant="outlined"
                    label="Title"
                    placeholder=""
                    value={title}
                    onChange={handleTitle}
                    >
                        {titles.map((opt) => {
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        })}
                    </TextField>
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Phone Number"
                    placeholder=""
                    value={phone}
                    onChange={(e) =>setPhone(e.target.value)}
                    />
                    <TextField
                    id="outlined-select-currency"
                    select
                    label="Department"
                    placeholder=""
                    value={department}
                    onChange={handleDepartment}
                    >
                        {departments.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Location"
                    placeholder="SEET Building"
                    value={location}
                    onChange={(e) =>setLocation(e.target.value)}
                    />
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Office"
                    placeholder="38, 1st Floor"
                    value={office}
                    onChange={(e) =>setOffice(e.target.value)}
                    />
                    <div className="status-btns">
                        <Button variant="outlined">Active</Button>
                        <Button variant="outlined">Busy</Button>
                        <Button variant="outlined">Absent</Button>
                    </div>
                    <Button variant="contained" onClick={handleSetup}>DONE</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetup