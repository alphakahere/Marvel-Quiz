import React, { Fragment, useEffect, useState } from 'react'

const QuizOver = React.forwardRef((props, ref) => {
        const {levelNames, maxQuestions, score, quizLevel, percent, loadQuestions} = props
        const [asked, setAsked] = useState([])
        console.log(levelNames.length)

        useEffect(() => {
            setAsked(ref.current)
        }, [ref])
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
                        <div className="successMsg">Bravo ! vous êtes un expert</div>
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
                        <button className="btnInfo">Infos</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="3">
                    <p style={{textAlign: 'center', color: 'red'}}>Pas de réponses!</p> 
                    <div className="loader"></div>
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
            </Fragment>
        )
    }
    
) 
export default QuizOver
