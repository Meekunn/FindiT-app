import { useState, useEffect, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { doc,setDoc } from 'firebase/firestore'
import { db, auth, storage } from '../config/firebase'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { TextField, Button, MenuItem } from '@material-ui/core'
import '../style/setup.scss'

const titles = [
    {
        value: "Mrs.",
        label: "Mrs."
    },{
        value: "Mr.",
        label: "Mr."
    },{
        value: "Miss",
        label: "Miss"
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

const Edit = () => {

    const history = useHistory()
    const user = auth.currentUser

    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [photo, setPhoto] = useState<any>()
    const [photoURL, setPhotoURL] = useState<string>()
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [uploading, setUploading] = useState<boolean>(false)

    useEffect(() => {

        const state = history.location.state as  ILecturers | undefined
        setName(state?.name || '')
        setPhone(state?.phone|| '')
        setTitle(state?.title|| '')
        setDepartment(state?.department || '')
        setEmail(state?.email || '')
        setLocation(state?.location || '')
        setOffice(state?.office || '')
        setBio(state?.bio || '')
        setStatus(state?.status || '')
        setPhotoURL(state?.photoURL || '')
    }, [] )

    const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }

    const handleDepartment = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }

    const handleStatus= (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

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


    const handleEdit = async () => {
        const user = auth.currentUser
        if(user !== null){
            const uid = user.uid
            const docRef = doc(db, "lecturers", uid)
            const payload = {
                name,
                title,
                phone,
                department,
                location,
                office,
                bio,
                email,
                photoURL,
                status
            }
            await setDoc(docRef, payload, {merge:true})
        }
        history.push('/dashboard')
    }

    return(
        <div className='setup-wrap'>
            <div className='setup-contain'>
                <h1>Profile Edit</h1>
                <p>Ensure you fill required field to proceed</p>
                <div className='img-upload'>
                    <img src={photoURL} alt='User' />
                    <input type='file' onChange={handlePhoto}/>
                    <Button variant="outlined" onClick={submitUpload} disabled={uploading || !photo} >Setup Picture</Button>
                </div>
                <div className='setup-form'>
                    <TextField
                    id="outlined-uncontrolled"
                    label="Full Name"
                    required
                    placeholder=""
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    select
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
                    id="outlined-uncontrolled"
                    label="Email"
                    placeholder=""
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    label="Phone Number"
                    placeholder=""
                    value={phone}
                    onChange={(e) =>setPhone(e.target.value)}
                    />
                    <TextField
                    id="outlined-select-currency"
                    select
                    label="Department"
                    required
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
                    id="outlined-uncontrolled"
                    label="Location"
                    required
                    placeholder="SEET Building"
                    value={location}
                    onChange={(e) =>setLocation(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    label="Office"
                    placeholder="38, 1st Floor"
                    value={office}
                    onChange={(e) =>setOffice(e.target.value)}
                    />
                    <TextField
                    id="outlined-uncontrolled"
                    label="Bio"
                    placeholder=""
                    multiline
                    value={bio}
                    onChange={(e) =>setBio(e.target.value)}
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
                    {/* <div className="status-btns">
                        <Button variant="outlined" className='active' onClick={statusActive} >Active</Button>
                        <Button variant="outlined" className='busy' onClick={statusBusy} >Busy</Button>
                        <Button variant="outlined" className='absent' onClick={statusAbsent} >Absent</Button>
                    </div> */}
                    <Button variant="contained" style={{marginTop: 2}} onClick={handleEdit}>DONE</Button>
                </div>
            </div>
        </div>
    )
}

export default Edit