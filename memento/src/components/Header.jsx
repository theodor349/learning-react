import { useEffect } from 'react'
import React from 'react'

const Header = ({ handleNewGame, wins}) => {

  useEffect(() => {
    document.title = `Memory Game (${wins})`;
  });

  return (
    <header>
      <h4>{wins} Wins</h4>
      <h3>Memory Game</h3>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  )
}

export default Header