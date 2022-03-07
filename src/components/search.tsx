import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import axios from 'axios'
import { TextField, MenuItem, List, ListItem, ListItemText } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import ProfileCard from './profilecard'
import '../style/component/search.scss'
import '../style/searchpage.scss'
import SearchBar from "material-ui-search-bar"

const Search = () => {

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

    const [department, setDepartment] = useState<any>([])
    //const department = createRef<HTMLInputElement>()
    const [searchName, setSearchName] = useState<string>("")
    const [lecturerData, setLecturerData] = useState<any>([])
    const [searchDept, setSearchDept] = useState<string>("")
    const [output, setOutput] = useState<any>([])
    const trimText = useCallback((text: string) => text.replace(/\s+/g,'').toLowerCase(),[])
    //const [nameOutput, setNameOutput] = useState<any>([])
    //const names:any[] = []

    useEffect(() => {
        fetchData()
        //getNames()
    }, [])

    const fetchData = async () => {
        const res = await axios.get("https://us-central1-findit-4cd7f.cloudfunctions.net/app/lecturers")
        const data = res.data
        setLecturerData(data)
    }

    // const getNames = async () => {
    //     const allData: ILecturers[] = []
    //     const querysnapshot = await getDocs(collection(db, 'lecturers'))
    //     querysnapshot.forEach((doc:any) => allData.push(doc.data()))
    //     allData.map((name: any, id: any) => {
    //         names.push(name.name)
    //     })
    //     setNameOutput(names)
    //     console.log(names, nameOutput)
    // }

    // const handleDept = (val: string) => {
    //     setSearchDept(trimText(val))
    //     const filteredData = lecturerData.filter((data: any) => {
    //         (data.department).includes(searchDept)
    //     })
    //     setOutput(filteredData)
    //     console.log(output)
    // }

    const handleName = (val: string) => {
        setSearchName(trimText(val))
        const filteredData = lecturerData.filter((data:any) => {
            return trimText(data.name).includes(searchName.toLowerCase())
        })
        setOutput(filteredData)
        console.log(output)
    }

    const cancelSearch = () => {
        setSearchName("");
      };

    return(
        <div className='nav-wrap'>
            <h1>Lecturers</h1>
            <div className='contents'>
                <div className='search-contain'>
                {/* <TextField
                style={{margin: 10, minWidth: 150}}
                id="outlined-select-currency"
                variant='outlined'
                label="Department"
                value={searchDept}
                onChange={(e) => {setSearchDept(e.target.value); handleDept(e.target.value)}}
                > */}
                {/* {departments.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))} */}
                {/* </TextField> */}
                <TextField 
                id='name-search' 
                label='Search by name' 
                variant='outlined'
                value={searchName}
                onChange={(e) => {setSearchName(e.target.value); handleName(e.target.value)}}>
                </TextField>
                </div>
                <div className='profile-cards'>
                    {searchName.length > 0 || searchDept.length > 0 ? 
                    (output.map((lecturer:any) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department} />
                            )
                        })) :  (
                        lecturerData.map((lecturer:any) => {
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