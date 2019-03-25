import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Game from './containers/Game';
import appReducer from './reducers/gameReducer';

const store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Game />
        </div>
      </Provider>
    );
  }
}

export default App;