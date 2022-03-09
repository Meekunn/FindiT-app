import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TextField } from '@material-ui/core'
import ProfileCard from './profilecard'
import '../style/component/search.scss'
import '../style/searchpage.scss'

const Search = () => {

    const [searchName, setSearchName] = useState<string>("")
    const [lecturerData, setLecturerData] = useState<any>([])
    const [searchDept, setSearchDept] = useState<string>("")
    const [output, setOutput] = useState<any>([])
    const trimText = useCallback((text: string) => text.replace(/\s+/g,'').toLowerCase(),[])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await axios.get("https://us-central1-findit-4cd7f.cloudfunctions.net/app/lecturers")
        const data = res.data
        setLecturerData(data)
    }

    const handleDept = (val: string) => {
        setSearchDept(trimText(val))
        const filteredData = lecturerData.filter((data: any) => {
            return trimText(data.department).includes(searchDept.toLowerCase())
        })
        setOutput(filteredData)
    }

    const handleName = (val: string) => {
        setSearchName(trimText(val))
        const filteredData = lecturerData.filter((data:any) => {
            return trimText(data.name).includes(searchName.toLowerCase())
        })
        setOutput(filteredData)
    }

    return(
        <div className='nav-wrap'>
            <div className='nav-header'>
                <h1>Lecturers</h1>
                <Link to='/'>Welcome Page</Link>
            </div>
            <div className='search-contents'>
                <div className='search-contain'>
                <TextField
                id="outlined-select-currency"
                variant='standard'
                label="Department"
                value={searchDept}
                onChange={(e) => {setSearchDept(e.target.value); handleDept(e.target.value)}}
                >
                </TextField>
                <TextField 
                id='name-search' 
                label='Search by name' 
                variant='standard'
                value={searchName}
                onChange={(e) => {setSearchName(e.target.value); handleName(e.target.value)}}>
                </TextField>
                </div>
                <div className='profile-cards'>
                    {searchName.length > 0 || searchDept.length > 0? 
                    (output.map((lecturer:any) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department}
                                photoURL={lecturer.photoURL} bio={lecturer.bio} status={lecturer.status} />
                            )
                        })) :  (
                        lecturerData.map((lecturer:any) => {
                            return(
                                <ProfileCard key={lecturer.id} name={lecturer.name} title={lecturer.title} phone={lecturer.phone}
                                email={lecturer.email} location={lecturer.location} office={lecturer.office} department={lecturer.department}
                                photoURL={lecturer.photoURL} bio={lecturer.bio} status={lecturer.status} />
                            )
                        }))
                    }
                </div>        
            </div>
        </div>
    )
}

export default Search
