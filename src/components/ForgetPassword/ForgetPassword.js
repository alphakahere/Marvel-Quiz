import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'

import FirebaseContext from '../Firebase/FirebaseContext'

const ForgetPassword = (props) => {

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")


    const firebase = useContext(FirebaseContext)

    
    const handleSubmit = (e) => {
        e.preventDefault() 
        firebase.resetPassword(email)
        .then(() => {
            setSuccess(`Consultez votre ${email} pour confirmer la récuperation du mot de passe`)
            setError("")
            setTimeout(() => {
            
                props.history.push("/login")
                
            }, 5000);
        })
        .catch((e) => {
            setError(e)
        })
    }

    const disabled = email === ""

    return (
        <div className="SignUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {
                            success && 
                            <span style={{
                                border:'1px solid green',
                                backgroundColor: 'green',
                                color: '#FFF'
                            }} 
                            >
                            {success}
                            </span>
                        }
                        {
                            error && <span>{<error className="message"></error>}</span>
                        }
                        <form onSubmit={handleSubmit}> 
                            <h2>Mot de passe oublié</h2>
                            <div className="inputBox">
                                <input type="email" id="email" autoComplete="off" required value={email} onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled= {disabled} className="formButton" >Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit, connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ForgetPassword
