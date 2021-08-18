import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames, quizLevel}) => {

    const [quizSteps, setQuizSteps] = useState([])

    useEffect(() => {
        const steps = levelNames.map(level => ({title: level.toUpperCase()}))
        setQuizSteps(steps)
    }, [levelNames])
    return (
        <div className="levelsContainer" style={{background: 'transparent'}}>
            <Stepper 
                steps = {quizSteps}
                activeStep = {quizLevel}
                activeColor = {'#d31017'}
                completeColor = {'#E0E0E0'}
                defaultColor = {'#E0E0E0'}
                activeTitleColor = {'#d31017'}
                completeTitleColor = {'#E0E0E0'}
                defaultTitleColor = {'#E0E0E0'}
                size = {40}
                circleFontSize = {20}
                titleFontSize = {20}
                circleTop = {0}
                barStyle={'dashed'}
                defaultBarColor = {'#E0E0E0'}
                completeBarColor = {'#E0E0E0'}
            />
        </div>
    )
}

export default Levels
