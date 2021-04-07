import React from 'react'

const Contact = ({ person, handleDelete }) => {
    return (
        <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
        </p>
    )
}

export default Contact