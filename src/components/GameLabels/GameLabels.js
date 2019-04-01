import React from 'react';
import PropTypes from 'react';
import './GameLabels.css';


const GameLabels = (props) => {
    const {player, gameOver} = props;
    console.log('gamel',props)
    function stillPlaying() {return gameOver ? 'hide' : 'unhide'};
    function gameOverClass() {return gameOver ? 'unhide' : 'hide'};
    function playerClass() {return 'player'+player};
    return (
      <div className="labels" >
        <h3 className={stillPlaying() + " " + playerClass()}>Current Player: Player {player}</h3>
        <h3 className={gameOverClass() + " " + playerClass()}>Player {player} Won!</h3>
    </div>
    )
  };
GameLabels.propTypes = {
  player: PropTypes.number,
  gameOver:PropTypes.bool,
}

export default GameLabels;