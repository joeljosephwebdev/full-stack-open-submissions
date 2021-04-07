import React from 'react'

const Notification = ({ message, type, handleReset }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${type}`} onClick={handleReset}>
            {message}
        </div>
    )
}

export default Notification