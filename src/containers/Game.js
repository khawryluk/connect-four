import React from 'react';
import Grid from '../components/Grid/Grid.js';

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

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            player:1,
            colCount:7,
            rowCount:6,
            grid:initGrid(7,6)
        };
    }

   

    render() {    
        const {player, colCount, rowCount, grid} = this.state;
        return (
          <form>
            <h1>Connect Four</h1>
            <Grid 
                grid={grid}
            />
            </form>
            )
}
}
export default Game;