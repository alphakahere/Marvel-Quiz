import React, { useContext, useState } from 'react'
import FirebaseContext from '../Firebase/FirebaseContext'

const SignUp = () => {

    const data = {
        pseudo:'',
        email: '',
        password: '',
        confirmPassword:''
    }

    const [error, setError] = useState('')

    const firebase = useContext(FirebaseContext)
    console.log(firebase)

    const [logindata, setLoginData] = useState(data)

    const {pseudo, email, password, confirmPassword} = logindata

    const handleChange = e => {
        setLoginData({...logindata, [e.target.id]:e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const {email,password}= logindata;
        firebase.signupUser(email,password)
        .then(user => {
            setLoginData({...data})
        })
        .catch(error =>{
            setError(error)
        })
    }

    const errorMsg = error !== '' && <span>{error.message}</span>

    const btn = pseudo === '' || email === '' || password === '' || confirmPassword !== password ?
    <button disabled>Inscription</button>:<button>Inscription</button>


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>
                            {errorMsg}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
