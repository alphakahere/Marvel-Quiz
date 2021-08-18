import React from 'react'

const Loader = ({loaderMsg, styling}) => {
    return (
        <>
            <div className="loader"></div>
            <p style={styling}>{loaderMsg}</p> 
        </>
    )
}

export default Loader
