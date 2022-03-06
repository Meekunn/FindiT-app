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
            value: "Informationa dand Communication Technology",
            label: "ICT"
        },
        {
            value: "Electrical and Electronics Engineering",
            label: "EEE"
        }
    ]

    const [department, setDepartment] = useState<string>("")
    const [searchName, setSearchName] = useState<string>("")
    const [nameInput, setNameInput] = useState<any>()
    const [lecturerData, setLecturerData] = useState<any>([])
    const [searchDept, setSearchDept] = useState<string>("")
    const [output, setOutput] = useState<any>([])
    const [nameOutput, setNameOutput] = useState<any>([])
    const [checked, setChecked] = useState([0])
    const trimText = useCallback((text: string) => text.replace(/\s+/g,'').toLowerCase(),[])
    const names:any[] = []

    useEffect(() => {
        fetchData()
        getNames()
    }, [])

    const fetchData = async () => {
        const res = await axios.get("https://us-central1-findit-4cd7f.cloudfunctions.net/app/lecturers")
        const data = res.data
        setLecturerData(data)
    }

    const handleDept = (val:string) => {
        setSearchDept(val)
    }
    const getNames = async () => {
        const allData: ILecturers[] = []
        const querysnapshot = await getDocs(collection(db, 'lecturers'))
        querysnapshot.forEach((doc:any) => allData.push(doc.data()))
        allData.map((name: any, id: any) => {
            names.push(name.name)
        })
        setNameOutput(names)
        console.log(names, nameOutput)
    }

    const handleName = (val: string) => {
        setSearchName(val)
        if(searchName === ""){
            return setOutput([])
        } else {
            const filteredData = nameOutput.filter((data:any) => {
                return trimText(data).includes(searchName.toLowerCase())
            })
            setOutput(filteredData)
            console.log(output)
        }
    }

    const cancelSearch = () => {
        setSearchName("");
      };

    return(
        <div className='nav-wrap'>
            <h1>Lecturers</h1>
            <div className='contents'>
                <div className='search-contain'>
                    {/* <Autocomplete
                    value={searchName}
                    onChange={(e: any, val: string|null)=> setNameInput(val)}
                    inputValue={searchName}
                    onInputChange={(e, newVal) => setSearchName(newVal)}
                    options={nameOutput}
                    renderInput={(params) => <TextField {...params} label="Search..." />}
                    />
                </div>
                <div className='profile-cards'>
                    {searchName.length > 0 ? 
                    names.filter((name: string) => {
                        return 
                    }).map((lecturer:any, id:any) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department} />
                            )
                        }) :  (
                        lecturerData.map((lecturer:any, id:any) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department} />
                            )
                        }))
                    }
                </div> */}
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
                onChange={(e) => {setSearchName(e.target.value); handleName(e.target.value)}}>
                </TextField>
                </div>
                <div className='profile-cards'>
                    {searchName.length > 0 ? 
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