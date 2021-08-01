import React, { useState, Fragment, useEffect, useContext } from 'react'
import FirebaseContext from '../Firebase/FirebaseContext'
import Logout from '../Logout/Logout'
import Quiz from '../Quiz/Quiz'

const Welcome = (props) => {

    const [authUser, setAuthUser] = useState(null)
    const firebase = useContext(FirebaseContext)


    useEffect(() =>{
       const unlisten = firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser(authUser)
              : props.history.push("/")
          },
       );
       return () => {
           unlisten();
       }
    });


    const welcome = authUser === null ?(
    <Fragment>
        <h1>Loading...</h1>
    </Fragment>
    ) : (
    <Fragment>
         <div className="quiz-bg">
             <div className="container">
                 <Logout />
                 <Quiz />
                Welcome
            </div>
        </div>
    </Fragment>
    )
    return welcome
}

export default Welcome
