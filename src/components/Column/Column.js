import React from 'react';
import PropTypes from 'react';
import './Column.css';
import Cell from '../Cell/Cell';


const Column = (props) => {
    const {grid, index} = props;
    const listItems = grid[index].map((cellVal, r) => (
        <Cell grid={grid} colIndex={index} rowIndex={r}/>
    ));
    return (
      <div className="column"             
      onClick={(e) => props.addChipToColumn(props.index)} >
    
        {listItems}  
     
    </div>
    )
  };
Column.propTypes = {
  grid: PropTypes.array,
  index:PropTypes.number,
}

export default Column;