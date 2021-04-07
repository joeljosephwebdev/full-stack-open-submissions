import React from 'react'

const Filter = ({ handleSearch, searchString }) => {
    return (
        <div>
            search: <input onChange={handleSearch} value={searchString} placeholder="search by name" />
        </div>
    )
}

export default Filter