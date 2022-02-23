import React, { useState, ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'

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

    const [department, setDepartment] = useState("Department")

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }

    return(
        <div className='nav-wrap'>
            <h1>Lecturers</h1>
            <div className='search-contain'>
                <TextField
                id="outlined-select-currency"
                select
                label="Department"
                value={department}
                onChange={handleChange}
                >
                {departments.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField id='name-search' label='Search by name' variant='outlined'></TextField>
            </div>
        </div>
    )
}

export default Search