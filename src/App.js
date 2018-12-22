import React, { Component } from 'react';
import Calculator from './components/Calculator'
import Test1 from './components/Test1'

class App extends Component {
  render() {
    return (
      <div>
      	  <Calculator />
          <Test1 />
      </div>
    );
  }
}

export default App;
