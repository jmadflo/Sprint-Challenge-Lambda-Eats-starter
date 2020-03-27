import React from 'react'


const Complete = ({order}) => {
    return(
        <div className='completed-page'>
            <h2>Thanks for ordering! Here is a summary of your order.</h2>
            <pre>{JSON.stringify(order, null, 2)}</pre>
        </div>
    )
}

export default Complete;