import { useState, useEffect, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { doc,setDoc } from 'firebase/firestore'
import { db, auth, storage } from '../config/firebase'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { TextField, Button, MenuItem } from '@material-ui/core'
import '../style/setup.scss'

const Edit = () => {

    const history = useHistory()
    const currentUser = auth.currentUser

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

    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [photo, setPhoto] = useState<any>()
    const [preview, setPreview] = useState<any>()
    const [photoURL, setPhotoURL] = useState<any>()
    const [phone, setPhone] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [uploading, setUploading] = useState<boolean>(false)

    useEffect(() => {

        const state = history.location.state as  ILecturers | undefined
        setName(state?.fullname || '')
        setPhone(state?.phone|| '')
        setTitle(state?.title|| '')
        setDepartment(state?.department || '')
        setLocation(state?.location || '')
        setOffice(state?.office || '')
        setBio(state?.bio || '')
        setPhotoURL(state?.photoURL || "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png")
    }, [] )

    const handlePhoto = (e:any) => {
        if(e.target.files[0])
            //window.URL.createObjectURL(e.target.files[0])
            setPhoto(e.target.files[0])
    }

    const uploadPicture = async (photo: any, id: any, setUploading: any) => {
        const photoRef = ref(storage, "/lecturer" + id.uid + ".png")
      
        setUploading(true)
      
        await uploadBytes(photoRef, photo)
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
        uploadPicture(photoURL,currentUser,setUploading)
    }

    const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }

    const handleDepartment = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
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
                bio
            }
            const setDocRef = await setDoc(docRef, payload, {merge:true})
        }
        history.push('/dashboard')
    }

    return(
        <div className='setup-wrap'>
            <div className='setup-contain'>
                <h1>Profile Edit</h1>
                <p>Dedicated to helping you navigate your relation with lecturers</p>
                <div className='img-upload'>
                    <img src={photoURL} alt='User-Image' />
                    <input type='file' onChange={handlePhoto}/>
                    <Button variant="outlined" onClick={submitUpload} disabled={uploading || !photo} >Setup Picture</Button>
                </div>
                <div className='setup-form'>
                    <TextField
                    id="outlined-uncontrolled"
                    label="Full Name"
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
                    id="outlined-uncontrolled"
                    label="Location"
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
                    <div className="status-btns">
                        <Button variant="outlined" className='active'>Active</Button>
                        <Button variant="outlined" className='busy'>Busy</Button>
                        <Button variant="outlined" className='absent'>Absent</Button>
                    </div>
                    <Button variant="contained" onClick={handleEdit}><Link to="/dashboard">DONE</Link></Button>
                </div>
            </div>
        </div>
    )
}

export default Edit