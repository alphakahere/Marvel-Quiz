import React, { Fragment, useEffect, useState } from 'react'
import {GiTrophyCup} from 'react-icons/gi'
import Loader from '../Loader/'
import Modal from '../Modal/'

const QuizOver = React.forwardRef((props, ref) => {
        const {levelNames, maxQuestions, score, quizLevel, percent, loadQuestions} = props
        const [asked, setAsked] = useState([])
        const [openModal, setOpenModal] = useState(false)

        useEffect(() => {
            setAsked(ref.current)
        }, [ref])

        const showModal = id => {
            setOpenModal(true)
        }

        const hideModal = () => {
            setOpenModal(false)
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
                            onClick={() => showModal(question.heroID)}
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
                <Modal showModal={openModal} hideModal={hideModal}>
                    <div className="modalHeader">
                        <h2>Titre</h2>
                    </div>
                    <div className="modalBody">
                        <h3>Body</h3>
                    </div>
                    <div className="modalFooter">
                        <button className="modalBtn">Fermer</button>
                    </div>
                </Modal>
            </Fragment>
        )
    }
    
) 
export default QuizOver
