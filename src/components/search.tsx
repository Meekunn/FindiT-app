import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import axios from 'axios'
import { TextField, MenuItem } from '@material-ui/core'
import ProfileCard from './profilecard'
import '../style/component/search.scss'
import '../style/searchpage.scss'

const departments = [
    {
        value: "Information and Communication Technology",
        label: "ICT"
    },
    {
        value: "Electrical and Electronics Engineering",
        label: "EEE"
    }
]

const Search = () => {


    const [department, setDepartment] = useState<string>("")
    const [searchName, setSearchName] = useState<string>("")
    const [lecturerData, setLecturerData] = useState<ILecturers[]>([])
    const [searchDept, setSearchDept] = useState<string>("")
    const [output, setOutput] = useState<ILecturers[]>([])
    

    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get("https://us-central1-findit-4cd7f.cloudfunctions.net/app/lecturers")
            const data = res.data
            setLecturerData(data)
            setOutput(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const newOutput = output.filter((lecturer) => lecturer.name.includes(searchName.toLowerCase()))
        setOutput(newOutput)
    },[searchName])
    const handleDept = (val:string) => {
        setSearchDept(val)
    }

    // const handleName = (val: string) => {
    //     if(searchName === ""){
    //         return setOutput([])
    //     }
    //     const filteredData = lecturerData.filter((data:any) => {
    //         return Object.values(data).join('').toLowerCase().includes(searchName.toLowerCase())
    //     })
    //     setOutput(filteredData)
    // }

    return(
        <div className='nav-wrap'>
            <h1>Lecturers</h1>
            <div className='contents'>
                <div className='search-contain'>
                <TextField
                style={{margin: 10, minWidth: 150}}
                id="outlined-select-currency"
                select
                label="Department"
                value={department}
                onChange={(e) => {setDepartment(e.target.value); handleDept(e.target.value)}}
                >
                {departments.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField 
                id='name-search' 
                label='Search by name' 
                variant='outlined'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}>
                </TextField>
                </div>
                <div className='profile-cards'>
                    {searchName.length > 0 ? 
                        (output.map((lecturer) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department} />
                            )
                        })) :  (
                        lecturerData.map((lecturer) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department} />
                            )
                        }))
                    }
                </div>        
            </div>
        </div>
    )
}

export default Search