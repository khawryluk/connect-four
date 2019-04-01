import Game from "../components/Game/Game";
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const {grid, player, gameOver} = state;
  return {
      grid: grid,
      player:player,
      gameOver:gameOver
    }
  }

   
  const GameContainer = connect(mapStateToProps, null)(Game);

  export default GameContainer;