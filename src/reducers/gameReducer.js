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

function addChip(state, col) {
    const {grid, rowCount, player} = state;
    let newGrid = grid.slice();
    let selectedCol = grid[col];
    let row = rowCount - 1;
    
    let { foundEmptyCell, insertedRow } = placeChipInCol(row, selectedCol, player);
    console.log('insertedRow: ', insertedRow);
    let winningGrid = updateForWin(newGrid, insertedRow , col, player);
    return {
      grid: winningGrid,
      player: foundEmptyCell ? getNextPlayer(player) : player
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

function updateForWin(grid, row, col, player){
  console.log("updateForWin",row, col, player)
  var vertWinCords = getVerticalWinCoords(grid, row, col, player);
  console.log('vertWinCords: ', vertWinCords);
  var horiztWinCords = getHorizontalWinCoords(grid, row, col, player);
  console.log('horiztWinCords: ', horiztWinCords);
  var tlbrWinCords = getTopLeftBottomRightlWinCoords(grid, row, col, player);
  console.log('tlbrWinCords: ', tlbrWinCords);
  var trblWinCords = getTopRightBottomLeftWinCoords(grid, row, col, player);
  console.log('trblWinCords: ', trblWinCords);
  var winningCords = [];

  // Grab all winning coordinates
  winningCords = vertWinCords.length >= 4 ? winningCords.concat(vertWinCords) : winningCords;
  winningCords = horiztWinCords.length >= 4 ? winningCords.concat(horiztWinCords) : winningCords;
  winningCords = tlbrWinCords.length >= 4 ? winningCords.concat(tlbrWinCords) : winningCords;
  winningCords = trblWinCords.length >= 4 ? winningCords.concat(trblWinCords) : winningCords;
  console.log('winningCords: ', winningCords);
  
  var gridWithWinningCords = changeCoordsToWinners(grid, winningCords, player);
  console.log('gridWithWinningCords: ', gridWithWinningCords);
  
  return gridWithWinningCords;
}

function changeCoordsToWinners(grid, winningCords, player){
   winningCords.forEach((element) => {
    const {row, col} = element;
    grid[col][row] =  player + 10
});
return grid;
}

/**
 * Gets coords of all chips stacked vertically in the provided column.
 * @param {*} grid 
 * @param {*} row 
 * @param {*} col 
 * @param {*} player 
 */
function getVerticalWinCoords(grid, row, col, player){
  if (grid === null || grid.length === 0){
    throw Error("Grid Has No Rows. Cannot Check For Win.");
  }
  let lastRow = grid[0].length;
  let selectedCol = grid[col];
  var verticalWinCords = [];
  while (row < lastRow) {
    let val = selectedCol[row]
    if (isSameColor(val, player)) {
      
      verticalWinCords.push({
        row:row,
        col:col
      });
      row++;
    } else{
      break;
    }
  }
  return verticalWinCords;
}

function isSameColor(val, player) {
  return val == player || val == player + 10;
}

/**
 * Gets coords of all chips stacked horizontally in the provided row.
 * @param {*} grid 
 * @param {*} row 
 * @param {*} col 
 * @param {*} player 
 */
function getHorizontalWinCoords(grid, row, placedCol, player){
  if (grid === null || grid.length === 0){
    throw Error("Grid Has No Rows. Cannot Check For Win.");
  }
  let lastCol = grid.length;
  var horizontalWinCords = [];
  //Look right
  let col = placedCol;
  while (col < lastCol) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      horizontalWinCords.push({
        row:row,
        col:col
      });
      col++;
    } else{
      break;
    }
  }
  col = placedCol - 1;
  //Look left
  while (col > 0) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      horizontalWinCords.push({
        row:row,
        col:col
      });
      col--;
    } else{
      break;
    }
  }

  return horizontalWinCords;
}


/**
 * Gets coords of all chips diagnolly from the top left to the bottom right from the given coord.
 * @param {*} grid 
 * @param {*} row 
 * @param {*} col 
 * @param {*} player 
 */
function getTopLeftBottomRightlWinCoords(grid, row, placedCol, player){
  if (grid === null || grid.length === 0){
    throw Error("Grid Has No Rows. Cannot Check For Win.");
  }
  let lastCol = grid.length;
  let lastRow = grid[0].length;
  var diagWinCords = [];
  //Look right
  let col = placedCol;
  while (col < lastCol && row < lastRow) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      diagWinCords.push({
        row:row,
        col:col
      });
      col++;
      row++;
    } else{
      break;
    }
  }
  col = placedCol;
  //Look left
  while (col > 0 && row > 0) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      diagWinCords.push({
        row:row,
        col:col
      });
      col--;
      row--;
    } else{
      break;
    }
  }

  return diagWinCords;
}

/**
 * Gets coords of all chips diagnolly from the top right to the bottom left from the given coord.
 * @param {*} grid 
 * @param {*} row 
 * @param {*} col 
 * @param {*} player 
 */
function getTopRightBottomLeftWinCoords(grid, row, col, player){
  if (grid === null || grid.length === 0){
    throw Error("Grid Has No Rows. Cannot Check For Win.");
  }
  let lastCol = grid.length;
  let lastRow = grid[0].length;
  var diagWinCords = [];
  //Look right
  while (col < lastCol && row > 0) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      diagWinCords.push({
        row:row,
        col:col
      });
      col++;
      row--;
    } else{
      break;
    }
  }
  //Look left
  while (col > 0 && row < lastRow ) {
    let val = grid[col][row];
    if (isSameColor(val, player)) {
      diagWinCords.push({
        row:row,
        col:col
      });
      col--;
      row++;
    } else{
      break;
    }
  }

  return diagWinCords;
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