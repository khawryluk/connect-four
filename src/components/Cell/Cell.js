import React from 'react';
import PropTypes from 'react';
import './Cell.css';

/*
classNuToText converts enum to class label.
*/
function classNumToText (props){
    const {colIndex, rowIndex,grid} = props;
    let num = grid[colIndex][rowIndex];
    switch (num){
        case 1:
            return "black";
        case 2:
            return "red";
        default:
            return "white";
    }
}

const Cell = (props) => (
  <div className="cell">
      <div className={`circle ${classNumToText(props)}`}></div>
  </div>
);

Cell.propTypes = {
  colIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  grid: PropTypes.array
}

export default Cell;