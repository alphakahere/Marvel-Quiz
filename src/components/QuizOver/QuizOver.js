import React, { Fragment, useEffect, useState } from 'react'

import {GiTrophyCup} from 'react-icons/gi'
import axios from 'axios'

import Loader from '../Loader/'
import Modal from '../Modal/'


const QuizOver = React.forwardRef((props, ref) => {
        const {levelNames, maxQuestions, score, quizLevel, percent, loadQuestions} = props
        const [asked, setAsked] = useState([])
        const [openModal, setOpenModal] = useState(false)
        const [charactersInfos, setCharactersInfos] = useState([])
        const [loading, setLoading] = useState(true)



        useEffect(() => {
            setAsked(ref.current)
            const date = localStorage.getItem('dataStorageDate')
            checkedDataAge(date)
        }, [ref])

        const checkedDataAge = date => {
            const today = Date.now()
            const timeDifferrence = today - date;
            const daysDifferrence = timeDifferrence / (1000*3600*24)
            
            if (daysDifferrence >= 15) {
                localStorage.clear()
                localStorage.setItem('dataStorageDate', Date.now())

            }
         }


        const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
        const hash = 'eb0e3468442d49267d219e19571e9000'

        const showModal = id => {
            setOpenModal(true)

            if(localStorage.getItem(id)) {
                setCharactersInfos(JSON.parse(localStorage.getItem(id)))
                setLoading(false)
            } else {
                axios
                .get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
                .then((response) => {
                    // console.log(response)
                    setCharactersInfos(response.data)
                    setLoading(false)
                    localStorage.setItem(id, JSON.stringify(response.data))
                    if(!localStorage.getItem('dataStorageDate')) {
                        localStorage.setItem('dataStorageDate', Date.now())
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
            }
           

            
        }

        const hideModal = () => {
            setOpenModal(false)
            setLoading(true)
        }

        
 
        const averageGrade = maxQuestions / 2

        if (score < averageGrade) {
            setTimeout(() => loadQuestions(quizLevel), 3000)
        }
    
        const decision = score >= averageGrade ? (
            <Fragment>
                {quizLevel < levelNames.length ? (
                <>
                    <div className="stepsBtnContainer">
                        <div className="successMsg">Bravo ! vous pouvez  passer au niveau suivant.</div>
                        <button 
                            className="btnResult success"
                            onClick={() => loadQuestions(quizLevel)}
                        >
                            Niveau Suivant
                        </button>
                    </div>
                    <div className="percentage">
                        <div className="progressPercent">{`Reussite: ${percent}%`}</div>
                        <div className="progressPercent">{`Note:${score}/${maxQuestions}`}</div>
                    </div>
                </>
                ) : (
                <>
                    <div className="stepsBtnContainer">
                        <div className="successMsg"><GiTrophyCup size='3em'/> Bravo ! vous êtes un expert</div>
                        <button 
                            className="btnResult gameOver"
                            onClick={() => loadQuestions(0)}
                        >
                            Accueil
                        </button>
                    </div>
                    <div className="percentage">
                        <div className="progressPercent">{`Reussite: ${percent}%`}</div>
                        <div className="progressPercent">{`Note:${score}/${maxQuestions}`}</div>
                    </div>
                </>
                )}
                
            </Fragment>
        ) : (
            <Fragment>
                <div className="stepsBtnContainer">
                        <div className="failureMsg">Désolé vous avez échoué, ne perdez pas espoir</div>
                </div>
                    <div className="percentage">
                        <div className="progressPercent">{`Reussite: ${percent}%`}</div>
                        <div className="progressPercent">{`Note:${score}/${maxQuestions}`}</div>
                    </div>
            </Fragment>
        )
        const questionAnswer = score >= averageGrade ? (
            asked.map(question => (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button 
                            className="btnInfo"
                            onClick={() => showModal(question.heroId)}
                        >
                            Infos
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="3">
                   <Loader
                        loaderMsg={"Pas de réponses"} 
                        styling={{textAlign: 'center', color: 'red'}}
                   /> 
                </td>
            </tr>
        )

        const resultModal = !loading ? (
            <>
                <Modal showModal={openModal} hideModal={hideModal}>
                    <div className="modalHeader">
                        <h2>{charactersInfos.data.results[0].name}</h2>
                    </div>
                    <div className="modalBody">
                        <h3>Body</h3>
                    </div>
                    <div className="modalFooter">
                        <button className="modalBtn">Fermer</button>
                    </div>
                </Modal>
            </>
        ) : (
            <>
                <Modal showModal={openModal} hideModal={hideModal}>
                    <div className="modalHeader">
                        <h2>Marvel Info Loading ...</h2>
                    </div>
                    <div className="modalBody">
                        <Loader />
                    </div>
                </Modal>
            </>
        )
        return (
            <Fragment>
                {decision}
                <hr />
    
                <p>Les réponses aux questions posées:</p>
                <div className="answerContainer">
                    <table className="answers">
                        <thead>
                            <tr>
                                <th>Quéstions</th>
                                <th>Réponses</th>
                                <th>Infos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionAnswer}
                        </tbody>
                    </table>
                </div>
                {resultModal}
            </Fragment>
        )
    }
    
) 
export default QuizOver
