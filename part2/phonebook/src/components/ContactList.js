import React from 'react'
import Contact from './Contact'

const ContactList = ({ contactsToShow }) => {
    return (
        <div>
            {
                contactsToShow.map(contact =>
                    <Contact person={contact} key={contact.name} />
                )
            }
        </div>
    )
}

export default ContactList