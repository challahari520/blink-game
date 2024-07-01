import React, {useEffect, useState} from 'react';
import "../Styles/styling.css"


export const Game = () => {

    const [boxes, setBoxes] = useState(Array(5).fill(null));
    const [randomIndex, setRandomIndex] = useState(null);
    const [active, setActive] = useState(null);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const timer = React.useRef(null);

    useEffect(() => {
        console.log('at mount timer is', timer.current);
        return () => clearInterval(timer.current);
    }, [])

    useEffect(() => {
        if (highScore < score){
            setHighScore(score);
        }
    }, [score])


    const handleSquareClick = (boxIndex) => {
        if (boxIndex === randomIndex){
            setSuccess(boxIndex);
            setScore(() => score + 10);
        }
        else {
            setFailure(boxIndex);
            setScore(() => score - 10);
        }
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setRandomIndex(Math.floor(Math.random() * 5));
            setFailure(null);
            setSuccess(null);
        }, 1000);

        console.log('timer is', timer.current);
    }


    const handleStop = (type) => {

        console.log('stopped timer is ', timer.current);
        
        clearInterval(timer.current);

        if (type === 'reset'){
            setScore(0);
            setRandomIndex(null);
            setActive(null);
            setSuccess(null);
            setFailure(null);
        }
    }
    
    return (
        <>
            <div className='box-container'>
                {boxes.map((box, i) => {
                    return (
                        <div className={`box ${randomIndex === i ? `active-blue` : ''}
                        ${success === i ? `success-green` : ''}
                        ${failure === i ? `failure-red` : ''}
                        `} onClick={ (e) => handleSquareClick(i)}></div>
                    )
                })}
            </div>
            <button className='start-button' disabled={!!randomIndex} onClick={() => handleStart()}>Start</button>
            <button className='stop-button' onClick={() => handleStop('stop')}>Stop</button>
            <button className='reset-button' onClick={() => handleStop('reset')}>Reset</button>
            <div>Score: {score}</div>
            <div>timer: {timer.current}</div>
            <div>High Score: {highScore}</div>
        </>

    )

}