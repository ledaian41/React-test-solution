import React, { Component } from 'react';
import Calculator from './components/Calculator'
import Test1 from './components/Test1'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isTest1 : true,
		}
	}

  render() {
    return (
      <div>
      	{this.display()}
      	<button onClick={() => {
      		this.setState({ isTest1: !this.state.isTest1 })
      	}}>{this.state.isTest1 ? 'Calculator' : 'Test 1'}</button>
      </div>
    );
  }

  display() {
  	return this.state.isTest1 ? <Test1 /> : <Calculator />
  }
}

export default App;
