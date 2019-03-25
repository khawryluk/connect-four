import React from 'react';
import PropTypes from 'react';
import './Grid.css';
import Column from '../Column/Column.js';
import ColumnContainer from '../../containers/Column';

const Grid = (props) => {
    const listItems = props.grid.map((colValues, index) => (
        <ColumnContainer index={index} />
    ));
    return (
      <div className="grid">
        {listItems}  
    </div>
    )
  };

Grid.propTypes = {
  grid : PropTypes.array
}

export default Grid;