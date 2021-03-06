/**
 * Retrns an updated grin if the game has been won and a bool flag to say the game is over.
 * @param {*} grid 
 * @param {*} row 
 * @param {*} col 
 * @param {*} player 
 */
export function updateForWin(grid, row, col, player){
    var vertWinCords = getVerticalWinCoords(grid, row, col, player);
    var horiztWinCords = getHorizontalWinCoords(grid, row, col, player);
    var tlbrWinCords = getTopLeftBottomRightlWinCoords(grid, row, col, player);
    var trblWinCords = getTopRightBottomLeftWinCoords(grid, row, col, player);
    var winningCords = [];
  
    // Grab all winning coordinates
    winningCords = vertWinCords.length >= 4 ? winningCords.concat(vertWinCords) : winningCords;
    winningCords = horiztWinCords.length >= 4 ? winningCords.concat(horiztWinCords) : winningCords;
    winningCords = tlbrWinCords.length >= 4 ? winningCords.concat(tlbrWinCords) : winningCords;
    winningCords = trblWinCords.length >= 4 ? winningCords.concat(trblWinCords) : winningCords;
    
    var gridWithWinningCords = changeCoordsToWinners(grid, winningCords, player);
    let gameOver = winningCords.length > 0;
    return {winningGrid:gridWithWinningCords,gameWon:gameOver};
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
  function getTopLeftBottomRightlWinCoords(grid, placedRow, placedCol, player){
    if (grid === null || grid.length === 0){
      throw Error("Grid Has No Rows. Cannot Check For Win.");
    }
    let lastCol = grid.length;
    let lastRow = grid[0].length;
    var diagWinCords = [];
    //Look right
    let col = placedCol;
    let row = placedRow;
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
    col = placedCol - 1;
    row = placedRow - 1;
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
  function getTopRightBottomLeftWinCoords(grid, placedRow, placedCol, player){
    if (grid === null || grid.length === 0){
      throw Error("Grid Has No Rows. Cannot Check For Win.");
    }
    let lastCol = grid.length;
    let lastRow = grid[0].length;
    var diagWinCords = [];
    //Look right
    let col = placedCol;
    let row = placedRow;
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
    col = placedCol - 1;
    row = placedRow + 1;
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