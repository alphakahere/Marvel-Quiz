import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';
import FirebaseContext from '../Firebase/FirebaseContext'

const Logout = () => {

    const [checked, setChecked] = useState(false)

    const firebase = useContext(FirebaseContext)


    useEffect(() => {
        if(checked) {
            firebase.signoutUser()
            console.log('deconnectee')
        }
    }, [checked, firebase ])

    const handleChange = e => {
        setChecked(e.target.checked)
    }
    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip 
                place="left"
                type="dark"
                effect="solid"
            />
        </div>
    )
}

export default Logout
