import React, {useEffect, useRef, useState} from 'react'
import Levels from '../Levels/Levels'
import { QuizMarvel } from '../QuizMarvel/QuizMarvel'
import ProgressBar from '../ProgressBar/ProgressBar'
import QuizOver from '../QuizOver/QuizOver'
import { toast ,} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure()

const Quiz = (props) => {

    const [level, setLevel] = useState(["debutant", "confirme", "expert"])
    const [quizLevel, setQuizLevel] = useState(0)
    const [storedQuestions, setStoredQuestions] = useState([])
    const [idQuestion, setIdQuestion] = useState(0)
    const [isLoading, setisLoading] = useState(true)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [userAnswer, setUserAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [showMsg, setShowMsg] = useState(false)
    const [quizEnd, setQuizEnd] = useState(false)
    const [percent, setPercent] = useState(0)


    const storedQuestionsData = useRef(null);
    const maxQuestions = 10 
    const pseudo = props.userData.pseudo
    const loading = props.loading

    

    useEffect(() => {
        if (!showMsg && loading === false) {
            setShowMsg(true)
            toast.warn(`Bienvenue ${pseudo}! et Bonne Chance`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: 'toastify-color-welcome',
            });
        }
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level[quizLevel]]
        if(fetchedArrayQuiz.length >= maxQuestions) {
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
            setStoredQuestions(newArray)
            storedQuestionsData.current = fetchedArrayQuiz
            setisLoading(false)
        }
       
    }, [level, quizLevel, pseudo, showMsg, loading])

    const submitAnswer = (selectedAnswer) => {
        setUserAnswer(selectedAnswer)
        setBtnDisabled(false)
    }

    const getPercentage = (maxQuest, ourScore) => (ourScore/maxQuest ) * 100;
    const nextQuestion = () => {
        if(idQuestion === maxQuestions -1) {
            // End
            const gradePercent =  getPercentage(maxQuestions, score);
            setPercent(gradePercent)
            setQuizEnd(true)
            if(gradePercent >= 50) {
                setQuizLevel(quizLevel + 1)

            }
        }else {
            setIdQuestion(idQuestion+1)
        }

        const goodAnswer = storedQuestionsData.current[idQuestion].answer
        if (goodAnswer  === userAnswer) {
            setScore(score+1)
            setUserAnswer(null)
            setBtnDisabled(true)
            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: 'toastify-color',
            });
        } else {
            setUserAnswer(null)
            setBtnDisabled(true)
            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: 'toastify-color',
            });
        }

    }

    const welcome = !isLoading && ( quizEnd ? (
        <QuizOver 
            ref = {storedQuestionsData}
            levelNames = {level}
            maxQuestions = {maxQuestions}
            score = {score}
            quizLevel = {quizLevel}
            percent = {percent}
        />
    ) : (
        <>
             <div>
                <Levels />
                <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />                
                <h2>{storedQuestions[idQuestion].question}</h2>
                {
                    storedQuestions[idQuestion].options.map((option, index) => (
                        <p 
                            key={index} 
                            className={`answerOptions ${userAnswer === option && "selected"}`}
                            onClick={() => submitAnswer(option)}
                        >
                            {option}
                        </p>
                    ))
                }
                <button 
                    disabled={btnDisabled} 
                    className="btnSubmit"
                    onClick={nextQuestion}
                >
                {idQuestion < maxQuestions -1 ? "Suivant" : "Terminer"}
                </button>
            </div>
        </>
    ))

    return welcome
}

export default React.memo(Quiz)
