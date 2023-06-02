import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import { useSpring, animated } from '@react-spring/web'
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTie, setShowTie] = useState(false);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });
 
  const reset = () => {
    setTurn("X");
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
    setShowCelebration(false)
    setShowTie(false)
  };

  const checkForWinner = (newSquares) => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        endGame(newSquares[a], winningPositions[i]);
        setShowCelebration(true)
        return;
      }
    }

    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      setShowTie(true)

      return;
    }
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleClick = (square) => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 4000);
  };
  const resetScore = () => {
    setScore({
      X: 0,
      O: 0,
    });
  };
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setShowCelebration(false)

  };

  const Celebration = () => {
    const styles = useSpring({
      from: {
        opacity: 0,
        transform: 'scale(0.5)',
        color: 'red',
        position: 'relative',
        top: '-50%',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
        color: 'rgb(17, 142, 215)',
        top: '0%',
      },
      delay: 500,
    });
  
    return (
      <animated.div style={styles}>
        <h2>¡Win!</h2>
      </animated.div>
    );
  };
  const Tie = () => {
    const styles = useSpring({
      from: {
        opacity: 0,
        transform: 'scale(0.5)',
        color: 'red',
        position: 'relative',
        top: '-50%',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
        color: 'rgb(17, 142, 215)',
        top: '0%',
      },
      delay: 500,
    });
  
    return (
      <animated.div style={styles}>
        <h2>¡Tie!</h2>
      </animated.div>
    );
  };

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <Board
        winningSquares={winningSquares}
        turn={turn}
        squares={squares}
        onClick={handleClick}
      />
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
      {showCelebration && <Celebration />}
      {showTie && <Tie />}
      <button onClick={resetGame}>RESET GAME</button>
      <button onClick={resetScore}>RESET SCORE</button>
    </div>
  );
};

export default App;
