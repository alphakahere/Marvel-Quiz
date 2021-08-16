import React, { Fragment } from 'react'

const QuizOver = ({asked}) => {
    const questionAnswer = asked.map(question => (
        <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
                <button className="btnInfo">Infos</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <div className="stepsBtnContainer">
                <div className="successMsg">Bravo ! vous êtes un expert</div>
                <button className="btnResult success">Niveau Suivant</button>
            </div>
            <div className="percentage">
                <div className="progressPercent">Reussite: 10%</div>
                <div className="progressPercent">Note: 10/10</div>
            </div>
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

export default QuizOver
