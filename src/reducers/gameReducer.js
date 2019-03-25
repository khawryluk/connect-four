import {initGrid} from '../containers/Game';
const defaultState =  {
        player:1,
        colCount:7,
        rowCount:6,
        grid:initGrid(7,6)
    };

function updateGame(state, newState) {
    return {
      ...state,
      player: newState.player,
      grid: newState.grid
    }

  }

function getNextPlayer(player){
    return player == 1 ? 2 : 1;
}

function addChip(state, idx) {
    const {grid, rowCount, player} = state;
    let newGrid = grid.slice();
    let selectedCol = grid[idx];
    let r = rowCount - 1;
    let foundEmptyCell = false;
    while (foundEmptyCell == false && r >=0){
        if(selectedCol[r] == 0){
            selectedCol[r] = player;
            foundEmptyCell = true;
        }
        r--;
    }
    newGrid[idx] = selectedCol;

    return {
      grid: newGrid,
      player: getNextPlayer(player)
    };
  }

function appReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_CHIP': {
      let newState = addChip(state, action.column);
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