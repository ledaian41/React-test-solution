import React, { Component } from 'react';
import CalculatorButton from './CalculatorButton'
import CalculatorHelper from '../helpers/CalculatorHelper'

export default class Calculator extends Component {

	constructor(props) {
		super(props)
		this.helper = new CalculatorHelper()
		this.state = {
			result: '0',
			isComputed: false,
			dotAvailable: true
		}
		this.insertNum = this.insertNum.bind(this)
		this.insertOperator = this.insertOperator.bind(this)
		this.insertDot = this.insertDot.bind(this)
		this.calculate = this.calculate.bind(this)
		this.back = this.back.bind(this)
	}

	render() {
		return (
			<div className='bg'>
				<table className="contain">
					<thead>
						<tr>
							<td colSpan='4'><input type="text" value={this.state.result} id="display" disabled/></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><CalculatorButton value='C' onClick={() => {this.clear()}}/></td>
							<td><CalculatorButton value='<' onClick={ this.back }/></td>
							<td><CalculatorButton value='/' onClick={ this.insertOperator }/></td>
							<td><CalculatorButton value='*' onClick={ this.insertOperator }/></td>
						</tr>
						<tr>
							<td><CalculatorButton value='7' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='8' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='9' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='-' onClick={ this.insertOperator }/></td>
						</tr>
						<tr>
							<td><CalculatorButton value='4' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='5' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='6' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='+' onClick={ this.insertOperator }/></td>
						</tr>
						<tr>
							<td><CalculatorButton value='1' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='2' onClick={ this.insertNum }/></td>
							<td><CalculatorButton value='3' onClick={ this.insertNum }/></td>
							<td rowSpan='2'><CalculatorButton id='btn-equals' value='=' onClick={ this.calculate }/></td>
						</tr>
						<tr>
							<td colSpan='2'><CalculatorButton id='btn-zero' value='0' onClick={this.insertNum}/></td>
							<td><CalculatorButton value='.' onClick={this.insertDot}/></td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	insertOperator(operator) {
		let newResult = ''
		const result = this.state.result
		const lastChar = result.slice(result.length - 1)
		if (this.state.isComputed && isNaN(result)) {
			newResult = operator
		} else if (this.helper.isOperator(lastChar)) {
			newResult = result.slice(0, result.length - 1) + operator
		} else {
			newResult = result + operator
		}
		this.setState({result: newResult, isComputed: false, dotAvailable: true})
	}

	insertNum(value) {
		let newResult = ''
		if (this.state.isComputed && !isNaN(value)) {
			newResult = value
		} else {
			newResult = this.helper.checkNumStartWithZero(this.state.result, value, this.state.dotAvailable)
		}
		this.setState({result: newResult, isComputed: false})
	}

	insertDot(dot) {
		let newResult = ''
		const result = this.state.result
		if (this.state.isComputed || !result) {
			newResult = '0.'
			this.setState({result: newResult, isComputed: false, dotAvailable: false})
		} else if (this.state.dotAvailable) {
			if (isNaN(result[result.length - 1])) {
				dot = '0' + dot
			}
			newResult = result + dot
			this.setState({result: newResult, isComputed: false, dotAvailable: false})
		}
	}

	calculate() {
		let newResult = ''
		const exp = this.state.result
		if (exp) {
			const checkedExp = this.helper.convertIfLastCharIsOperator(exp)
			try {
				newResult = this.helper.calculate(checkedExp)
			} catch (e) {
				newResult = 'Error!!'
			}
			this.setState({result: newResult, isComputed: true, dotAvailable: true})
		}
	}

	back() {
		if (!this.state.isComputed) {
			const result = this.state.result
			const newResult = result.slice(0, result.length - 1)
			const lastChar = result[result.length - 1]
			const dotAvailable = this.helper.checkDotAvailable(this.state.dotAvailable, lastChar, newResult)
			this.setState({result: newResult, dotAvailable: dotAvailable})
		}
	}

	clear() {
		this.setState({result: '0', isComputed: false, dotAvailable: true})
	}
}
