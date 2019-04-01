import React from 'react';
import PropTypes from 'react';
import './Game.css';
import Grid from '../Grid/Grid';
import GameLabels from '../GameLabels/GameLabels';


const Game = (props) => {
    const {grid, player, gameOver} = props;
        return (
          <form>
            <div className={`header`}>
                <h1>Connect Four</h1>
            </div>
            <div className={`mainComponents`}>
            <GameLabels player={player} gameOver={gameOver}/>
            <Grid 
                grid={grid}
            />
            </div>
            </form>
            )
}

Game.propTypes = {
    grid: PropTypes.array,
    player:PropTypes.number,
    gameOver:PropTypes.bool
  }
  
export default Game;