import Column from '../components/Column/Column';
import { connect } from 'react-redux';
import { addChipToColumn } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const {grid} = state;
  const index = ownProps.index;

  return {
    grid: grid,
    index:index
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChipToColumn: index => dispatch(addChipToColumn(index))
  };
}

const ColumnContainer = connect(mapStateToProps, mapDispatchToProps)(Column);

export default ColumnContainer;