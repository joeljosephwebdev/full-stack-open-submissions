import React from 'react'
import Contact from './Contact'

const ContactList = ({ contactsToShow, handleDelete }) => {
    return (
        <div>
            {
                contactsToShow.map(contact =>
                    <Contact person={contact} key={contact.name} handleDelete={handleDelete} />
                )
            }
        </div>
    )
}

export default ContactList