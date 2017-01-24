import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import CityChooser from './components/CityChooser'

class App extends Component {
  render() {
    return (
      <div className={styles.topContainer}>
        <CityChooser />
      </div>
    );
  }
}

var styles = {
  topContainer: {
    margin: '0 auto',
    maxWidth: 1200,
    minWidth: 400,
    overflow: 'hidden'
  }
};

ReactDOM.render(<App />, document.getElementById('root'))
