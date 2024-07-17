import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["","","","","","","","",""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);

    const toggle = (e, num) => {
        if (lock || data[num]) {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='cross'>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='circle'>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setLock(true);
                setWinner(data[a]);
                return;
            }
        }
    };

    const resetGame = () => {
        data = ["","","","","","","","",""];
        setCount(0);
        setLock(false);
        setWinner(null);
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = '');
    };

    return (
        <div className='container'>
            <h1 className="title">
                {winner ? (
                    <>
                        Congratulations: <img src={winner === 'x' ? cross_icon : circle_icon} alt={winner} /> Wins
                    </>
                ) : (
                    <>
                        <span>T</span>ic <span>T</span>ac <span>T</span>oe
                    </>
                )}
            </h1>
            <div className="board">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="boxes" onClick={(e) => toggle(e, i)}></div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
}

export default TicTacToe;
