import { FC, useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, db, storage } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytes  } from 'firebase/storage'
import { Button, TextField, MenuItem } from '@material-ui/core'
import '../style/setup.scss'

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
        value: "Information and Communication Technology",
        label: "ICT"
    },
    {
        value: "Electrical and Electronics Engineering",
        label: "EEE"
    },
    {
        value: "Computer Engineering",
        label: "CPE"
    }
]

const updateStatus = [
    {
        value: "Available",
        label: "Available"
    },{
        value: "Busy",
        label: "Busy"
    },{
        value: "Unavailable",
        label: "Unavailable"
    }
]

const ProfileSetup:FC<ILecturerBasic> = props => {

    const history = useHistory()
    const user = auth.currentUser


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>('')
    const [title, setTitle] = useState<string>("")
    const [photo, setPhoto] = useState<any>()
    const [photoURL, setPhotoURL] = useState<string>("https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png")
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [uploading, setUploading] = useState<boolean>(false)

    const handlePhoto = (e:any) => {
        if(e.target.files[0])
            setPhoto(e.target.files[0])
    }

    const uploadPicture = async (file: any, id: any, setUploading: any) => {
        const photoRef = ref(storage, "/lecturer" + id.uid + ".png")
      
        setUploading(true)
      
        await uploadBytes(photoRef, file)
        .then(() => {
            getDownloadURL(photoRef).then((photoURL) => {
                setPhotoURL(photoURL)
            }).catch((error:any) => {
                console.log(error.message, "error getting photourl")
            })
        }).catch((error:any) => {
            console.log(error.message, "error uploading")
        })

        updateProfile(id, {photoURL})
        setUploading(false)
        alert("Uploaded file!")
    }

    const submitUpload = () => {
        uploadPicture(photo,user,setUploading)
    }
    
    const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }

    const handleDepartment = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }

    const handleStatus= (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    const handleSetup = async () => {
        const user = auth.currentUser
        if(user !== null){
            const uid = user.uid
            const docRef = doc(db, "lecturers", uid)
            const payload = {
                name,
                title,
                phone,
                email,
                department,
                location,
                office,
                photoURL,
                status
            }
            await setDoc(docRef, payload, {merge:true})
            history.replace('/dashboard')
        }
    }

    return(
        <div className='setup-wrap'>
            <div className='setup-contain'>
                <h1>Profile Setup</h1>
                <p>Dedicated to helping you navigate your relation with lecturers</p>
                <div className='img-upload'>
                    <img src={photoURL} alt='User' />
                    <input type='file' onChange={handlePhoto}/>
                    <Button variant="outlined" onClick={submitUpload} disabled={uploading || !photo} >Setup Picture</Button>
                </div>
                <div className='setup-form'>
                    <p>Ensure you fill required field to proceed</p>
                    <TextField
                    id="outlined-basic"
                    label="Full Name"
                    required
                    placeholder=""
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    select
                    required
                    label="Title"
                    placeholder=""
                    value={title}
                    onChange={handleTitle}
                    >
                        {titles.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                    id="outlined-basic"
                    label="Email"
                    required
                    placeholder=""
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    />
                    <TextField
                    id="outlined-basic"
                    
                    label="Phone Number"
                    placeholder=""
                    value={phone}
                    onChange={(e) =>setPhone(e.target.value)}
                    />
                    <TextField
                    id="outlined-select-currency"
                    select
                    required
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
                    label="Location"
                    required
                    placeholder="SEET Building"
                    value={location}
                    onChange={(e) =>setLocation(e.target.value)}
                    />
                    <TextField
                    id="outlined-basic"
                    label="Office"
                    placeholder="38, 1st Floor"
                    value={office}
                    onChange={(e) =>setOffice(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    select
                    label="Status"
                    placeholder=""
                    value={status}
                    onChange={handleStatus}
                    >
                        {updateStatus.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" style={{marginTop: 2}} onClick={handleSetup}>DONE</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetup