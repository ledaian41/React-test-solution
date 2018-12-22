import React, { Component } from 'react';
import Calculator from './components/Calculator'

class App extends Component {
  render() {
    return (
      <div>
      		<Calculator />
          <img className='center' src='/Visualization.png' alt='Visualization'/>
      </div>
    );
  }
}

export default App;
