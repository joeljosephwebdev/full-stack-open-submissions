import React from 'react'

const Contact = ({ person }) => <p key={person.name}>{person.name} {person.number}</p>

export default Contact