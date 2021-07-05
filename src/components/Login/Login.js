import React, { useContext, useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import FirebaseContext from '../Firebase/FirebaseContext'


const Login = () => {

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false)
    const [error, setError] = useState('')

    const history = useHistory()

    const firebase = useContext(FirebaseContext)
    console.log(firebase)

    const handleSubmit = e =>{
        e.preventDefault()
        firebase.loginUser(email, password)
        .then( user => {
            setEmail('')
            setPassword('')
            history.push("/welcome")
        })
        .catch(error => {
            setEmail('')
            setPassword('')
            setError(error)
        })
    }


    useEffect(()=>{
        if (email !=='' && password.length >= 6){ 
            setBtn(true)
        }else if(btn){
            setBtn(false)
        }
    }, [email, password, btn])

    return (
        <div className="SignUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">

                </div>
                <div className="formBoxRight">
                    {error !== '' && <span>{error.message}</span>}
                    <div className="formContent">
                        <form onSubmit={handleSubmit}> 
                            <h2>Connexion</h2>
                            <div className="inputBox">
                                <input type="email" id="email" autoComplete="off" required value={email} onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" autoComplete="off" required value={password} onChange={e => setPassword(e.target.value)}/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {
                                btn ? (<button>Connexion</button>) : (<button disabled>Connexion</button>)
                            }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">vous n'avez pas de compte, inscrivez vous ici.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
