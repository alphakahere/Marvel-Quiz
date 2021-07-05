import React, { useContext, useState } from 'react'
import FirebaseContext from '../Firebase/FirebaseContext'
import { Link } from 'react-router-dom'

const SignUp = (props) => {

    const data = {
        pseudo: '',
        email: '',
        password: '', 
        confirmPassword: ''
    }
    const [dataLogin, setDataLogin] = useState(data)

    const {pseudo, email, password, confirmPassword} = dataLogin

    const [error, setError] = useState('')

    const handleChange = e => {
       setDataLogin({...dataLogin, [e.target.id]: e.target.value})
    }

    const firebase = useContext(FirebaseContext)


    const btn = (pseudo === '' || email === '' || password === '' || password !== confirmPassword) ?
    <button disabled className="formButton">Inscription</button> : <button className="formButton">Inscription</button>

    const handleSubmit = e => {
        e.preventDefault()
        const {email, password} = dataLogin
        firebase.signupUser(email, password)
        .then(user=>{
            setDataLogin({...data})
            props.history.push("/welcome")
        })
        .catch(error => {
            setError(error)
        })

    }


    // * Gestion  des Erreurs
    const errorMsg = error !== '' &&  <span>{error.message}</span>
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <form onSubmit={handleSubmit}> 
                            <h2>Inscription</h2>
                            <div className="inputBox">
                                <input type="text" id="pseudo" autoComplete="off" required value={pseudo} onChange={handleChange}/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input type="email" id="email" autoComplete="off" required value={email} onChange={handleChange}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" autoComplete="off" required value={password} onChange={handleChange}/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="confirmPassword" autoComplete="off" required value={confirmPassword} onChange={handleChange}/>
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {btn}
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

export default SignUp
