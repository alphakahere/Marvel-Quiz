import React, { useState, Fragment, useEffect, useContext } from 'react'
import FirebaseContext from '../Firebase/FirebaseContext'
import Loader from '../Loader'
import Logout from '../Logout/Logout'
import Quiz from '../Quiz/Quiz'

const Welcome = (props) => {

    const [userSession, setUserSession] = useState(null)

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const firebase = useContext(FirebaseContext)


    useEffect(() =>{
       const unlisten = firebase.auth.onAuthStateChanged(
          userSession => {
            userSession
              ? setUserSession(userSession)
              : setTimeout(() => {props.history.push("/")}, 2000);
          },
       );
        
       if(!!userSession){
       firebase.user(userSession.uid)
       .get()
       .then((doc) => {
           if(doc && doc.exists){
                const myData = doc.data()
                setUserData(myData)
                setLoading(false) 
           }
       })
       .catch(e => {
            console.log(e)
       })
       }


       return () => {
           unlisten();
       }

    }, [firebase, props.history, userSession]);


    const welcome = userSession === null ?(
    <Fragment>
        <Loader 
            loaderMsg={"Authentification..."}
            styling={{textAlign: 'center', color: 'red'}}
        />
    </Fragment>
    ) : (
    <Fragment>
         <div className="quiz-bg">
             <div className="container">
                 <Logout />
                 <Quiz userData = {userData} loading={loading}/>
            </div>
            
        </div>
    </Fragment>
    )
    return welcome
}

export default Welcome
