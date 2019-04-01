//import {initGrid} from '../containers/Game';
import {updateForWin} from '../models/winningConditions';
const defaultState =  {
        player:1,
        colCount:7,
        rowCount:6,
        grid:initGrid(7,6),
        gameOver:false
    };
    /*
    initGrid - returns a 2d grid of 0s to reflect the empty cells of the game.
*/
    export function initGrid(col, row) {
      var grid = [];
      for(var c = 0; c < col; c++){
          var colVals = [];
          for (var r = 0; r < row; r++){
              colVals.push(0);
          }
          grid.push(colVals);
      }
      return grid;
      }
function updateGame(state, newState) {
    return {
      ...state,
      player: newState.player,
      grid: newState.grid ,
      gameOver:newState.gameOver
    }

  }

function getNextPlayer(player){
    return player == 1 ? 2 : 1;
}

function addChip(state, col) {
    const {grid, rowCount, player, gameOver} = state;
    if (gameOver){
      return state;
    }
    let newGrid = grid.slice();
    let selectedCol = grid[col];
    let row = rowCount - 1;
    
    let { foundEmptyCell, insertedRow } = placeChipInCol(row, selectedCol, player);
    const {winningGrid, gameWon} = updateForWin(newGrid, insertedRow , col, player);
    return {
      grid: winningGrid,
      player: foundEmptyCell && !gameWon ? getNextPlayer(player) : player,
      gameOver:gameWon
    };
  }

function placeChipInCol(row, selectedCol, player) {
  let foundEmptyCell = false;
  while (foundEmptyCell == false && row >= 0) {
    if (selectedCol[row] == 0) {
      selectedCol[row] = player;
      return { foundEmptyCell : true, insertedRow : row};
    }
    row--;
  }
  return { foundEmptyCell : foundEmptyCell, insertedRow : row };
}

function appReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_CHIP': {
      let newState = addChip(state, action.column);
      console.log(state, newState)
      return updateGame(state, newState);
    }
   
    default:
      {
          console.log("couldn't figure out what to do");
        return state
      }
  }
}

export default appReducer;