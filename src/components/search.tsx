import { useState, ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import '../style/component/search.scss'

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

    const handleDepartment = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }
    const handleName = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value)
    }

    return(
        <div className='nav-wrap'>
            <h1>Lecturers</h1>
            <div className='search-contain'>
                <TextField
                style={{margin: 10, minWidth: 150}}
                id="outlined-select-currency"
                select
                label="Department"
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
                id='name-search' 
                label='Search by name' 
                variant='outlined'
                value={searchName}
                onChange={handleName}>
                </TextField>
            </div>
        </div>
    )
}

export default Search