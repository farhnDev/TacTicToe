import {useState} from 'react'
import {GrPowerReset} from "react-icons/gr";

// eslint-disable-next-line react/prop-types
const Square = ({value, onSquariClick}) => {
    const style = {
        backgroundColor: value === 'X' ? 'red' : value === 'O' ? 'blue' : 'transparent',
    }

    return <button className="square" onClick={onSquariClick}style={style}>{value}</button>
}

// eslint-disable-next-line react/prop-types
const Button = ({onButtonClick}) => {
    const [isHovered, setIsHovered] = useState(false)

    const style = {
        backgroundColor: isHovered ? '#fcbe3e' : '#f3a807',
    }
    return <button
        className="button"
        onClick={onButtonClick}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    ><GrPowerReset/></button>
}

// eslint-disable-next-line react/prop-types,no-unused-vars
function Board({squares, xIsNext, onPlay}) {


    function handleClick(i) {
        if (squares[i] || calculativeWinner(squares)) return;

        // eslint-disable-next-line react/prop-types
        const nextSquares = squares.slice();

        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares)
    }

    const winner = calculativeWinner(squares)
    let status;

    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = `Player: ${xIsNext ? 'X' : 'O'}`
    }

    return (
        <>
            <div style={{ position:'absolute',top:'100px', left:'40%'}}>
            <h1 style={{ width:'100%', color:'orange'}}>GAME TAC TIC TOE</h1>
            </div>
        <div className="board">
            <Square value={squares[0]} onSquariClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquariClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquariClick={() => handleClick(2)}/>
            <Square value={squares[3]} onSquariClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquariClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquariClick={() => handleClick(5)}/>
            <Square value={squares[6]} onSquariClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquariClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquariClick={() => handleClick(8)}/>
            <h1 className="status" style={{color:'orange'}}>{status}</h1>
        </div>
        </>
    )
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0)
    const xIsNext = stepNumber % 2 === 0;
    const current = history[stepNumber];

    function jumpTo(nextMove) {
        setStepNumber(nextMove)
    }

    function handlePlay(nextSquares) {
        const newHistory = [...history.slice(0, stepNumber + 1), nextSquares];
        setHistory(newHistory)
        setStepNumber(newHistory.length - 1)
    }

    const moves = history.map((squares, move) => {
        let desc;

        if (move > 0) {
            desc = `Go to move ` + move;
        } else {
            desc = `Go to game start`;
        }

        return (
            <li key={move}>
                <button className="history" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    })

    function handleReset() {
        setHistory([Array(9).fill(null)])
        setStepNumber(0)
    }

    return (
        <div className="game">
            <div className="board-game">
                <Board xIsNext={xIsNext} squares={current} onPlay={handlePlay}/>
            </div>
            <div className="game-history">
                <ol>
                    {moves}
                </ol>
            </div>
            <div className="game-reset">
                <span>Reset Game and History</span>
                <Button onButtonClick={handleReset}/>
            </div>
        </div>
    )
}

function calculativeWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]

        if (squares[a] && squares[a] === squares[b] && squares[c]) {
            return squares[a];
        }
    }
    return false;
}

