import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './main.css';

const Main = ({data, restart}) =>{
    var guess;
    const [gamePoints,setGamePoints] = useState(0);
    const [name,setName] = useState("");
    const [list,setList]=useState([]);
    const [displayHTML, setDisplayHTML] = useState(null);
    const [displayPoints, setDisplayPoints] = useState(null);
    const [guessCount, setGuessCount] = useState(4);
    const [roundCount, setRoundCount] = useState(4);
    const [endRoundMessage, setEndRoundMessage] = useState(null);
    
    const restartGame = () => {
        window.location.reload();
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const userName={name}
        if (name) {
            setList((ls)=>[...ls,userName])
            setName("")
        }
        guess = (userName['name']).trim();
        const sendGuess = async () => {
            const result = await fetch('http://localhost:9000/data', {
                method:'POST',
                headers:{
                    'Content-Type':'text/plain'
                },
                body:guess
            })

            let correctOrNot = await result.text();
            let correctOrNotArray = correctOrNot.split(',');
            let rightOrWrong = correctOrNotArray[0].replace('[', '');
            rightOrWrong = rightOrWrong.replace('"', '');
            rightOrWrong = rightOrWrong.replace('"', '');
            let correctAnswer = correctOrNotArray[1].replace('"', '');
            correctAnswer = correctAnswer.replace('"', '');
            correctAnswer = correctAnswer.replace(']', '');
            correctAnswer = correctAnswer.replace('\\r', '');

            var pointToDisplay;

            if (rightOrWrong === 'true' && guessCount === 4) {
                setDisplayHTML(<h3 className='outputtedCorrect'>Correct</h3>);
                setGamePoints(gamePoint => {
                    let updatedGamePoints = gamePoint + 1;
                    pointToDisplay = updatedGamePoints;
                    setDisplayPoints(<h3 className='outputtedScore'>{updatedGamePoints.toFixed(2)} Points</h3>);
                    return gamePoint + 1;
                });
                setRoundCount(round => round - 1);
                if (roundCount === 0) {
                    setEndRoundMessage(
                        <div>
                            <h3 className='outputtedGameOver'>Game Over. You won {(gamePoints+1).toFixed(2)}/5.00. Click "Play Again" to play again.</h3>
                            <form onRestartGame={restartGame}>
                                <button className='centerPlayAgainButton'>Play Again!</button>
                            </form>
                        </div>
                    );
                }
                restart();
            } else if (rightOrWrong === 'true') {
                setDisplayHTML(<h3 className='outputtedCorrect'>Correct</h3>);
                setGamePoints(gamePoint => {
                    let updatedGamePoints = gamePoint + (1 - (0.2 * (4 - guessCount)));
                    setDisplayPoints(<h3 className='outputtedScore'>{updatedGamePoints.toFixed(2)} Points</h3>);
                    return gamePoint + (1 - (0.2 * (4 - guessCount)));
                });
                setDisplayPoints(<h3 className='outputtedScore'>{gamePoints.toFixed(2)} Points</h3>)
                setGuessCount(4);
                setRoundCount(round => round - 1);
                if (roundCount === 0) {
                    setEndRoundMessage(
                        <div>
                            <h3 className='outputtedGameOver'>Game Over. You won {(gamePoints+(1 - (0.2 * (4 - guessCount)))).toFixed(2)}/5.00. Click "Play Again" to play again.</h3>
                            <form onRestartGame={restartGame}>
                                <button className='centerPlayAgainButton'>Play Again!</button>
                            </form>
                        </div>
                    );
                }
                restart();
            } else if (rightOrWrong === 'false' && guessCount > 0) {
                setDisplayHTML(<h3 className='outputtedIncorrect'>Incorrect</h3>);
                setGuessCount(guessCount - 1);
                setDisplayPoints(<h3 className='outputtedScore'>{gamePoints.toFixed(2)} Points</h3>)
            } else {
                setDisplayHTML(<h3 className='outputtedIncorrect'>You ran out of guesses. The word was {correctAnswer}</h3>)
                setGuessCount(4);
                setDisplayPoints(<h3 className='outputtedScore'>{gamePoints.toFixed(2)} Points</h3>)
                setRoundCount(round => round - 1);
                if (roundCount === 0) {
                    setEndRoundMessage(
                        <div>
                            <h3 className='outputtedGameOver'>Game Over. You won {gamePoints.toFixed(2)}/5.00 points.</h3>
                            <form onRestartGame={restartGame}>
                                <button className='centerPlayAgainButton'>Play Again!</button>
                            </form>
                        </div>
                    );
                }
                restart();
            }
        }

        sendGuess();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='centeredPrompt'>Unscramble the word: </h1>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='centerInput'/>
                <br></br>
                <button className='centerButton'>Submit</button>
            </form>
            {displayHTML}
            {displayPoints}
            {endRoundMessage}
        </div>

    )
}

const App = () => {
    const [data,setData]=useState("");

    const getData = async() => {
        const response = await Axios.get("http://localhost:9000/data");
        setData(response.data);
    }
    
    const restart = () => {
        getData();
    }

    useEffect(() => {
        getData()
    },[]);

    return (
        <div className = 'container'>
            <h1 className='centeredScrambledWord'>{data}</h1>
            <Main restart={restart}/>
        </div>
    )
}

export default App;