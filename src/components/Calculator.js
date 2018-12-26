import React, { Component } from 'react';
import CalculatorButton from './CalculatorButton'

export default class Calculator extends Component {

	constructor(props) {
		super(props)
		this.helper = new CalculateHelper()
		this.state = {
			result: '0',
			isComputed: false,
			isOperatorPending: false,
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
		const tmp = this.state.result
		const before = tmp.slice(tmp.length - 1)
		if (this.state.isComputed && isNaN(tmp)) {
			newResult = operator
		} else if (isNaN(before) && before !== '.') {
			newResult = tmp.slice(0, tmp.length - 1) + operator
		} else {
			newResult = this.state.result + operator
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
		if (this.state.isComputed || !this.state.result) {
			newResult = '0.'
			this.setState({result: newResult, isComputed: false, dotAvailable: false})
		} else if (this.state.dotAvailable) {
			const length = this.state.result.length
			if (isNaN(this.state.result[length - 1])) {
				dot = '0' + dot
			}
			newResult = this.state.result + dot
			this.setState({result: newResult, isComputed: false, dotAvailable: false})
		}
	}

	calculate() {
		let newResult = ''
		const exp = this.state.result
		if (exp) {
			const checkedExp = this.helper.checkLastChar(exp)
			try {
				newResult = this.helper.calculate(checkedExp)
			} catch (e) {
				newResult = 'Error!!'
			}
			this.setState({result: newResult, isComputed: true})
		}
	}

	back() {
		if (!this.state.isComputed) {
			const length = this.state.result.length
			const newResult = this.state.result.slice(0, length - 1)
			let dotAvailable = this.state.dotAvailable
			const before = this.state.result[length - 1]
			if (before === '.') {
				dotAvailable = true
			} else if (before !== '.' && isNaN(before)) {
				const indexOfDot = newResult.lastIndexOf('.')
				if (indexOfDot !== -1)  {
					dotAvailable = false
					for (let i = newResult.length - 1; i > indexOfDot; i--) {
						if (isNaN(newResult[i])) {
							dotAvailable = true
							break;
						}
					}
				}
			}
			this.setState({result: newResult, dotAvailable: dotAvailable})
		}
	}

	clear() {
		this.setState({result: '0', isComputed: false, isOperatorPending: false, dotAvailable: true})
	}
}

class CalculateHelper {
	checkNumStartWithZero(exp, insertValue, dotAvailable) {
		let lastOperator = -1
		for (let i = exp.length - 1; i > 0; i--) {
			if (isNaN(exp[i]) && exp[i] != '.') {
				lastOperator = i
				break
			}
		}
		if (exp[lastOperator + 1] === '0' && dotAvailable) {
			return (exp.slice(0, exp.length - 1) + insertValue)
		}
		return exp + insertValue
	}

	calculate(exp) {
		let result = eval(exp)
		if (result === Infinity || result === -Infinity) {
			throw new Error('Infinity')
		}
		result = String(result)
		if (result === 'NaN') {
			result = '0'
		}
		return result
	}

	checkLastChar(exp) {
		const lastChar = exp.slice(exp.length - 1)
		if (isNaN(lastChar) && lastChar !== '.') {
			const sub = eval(exp.slice(0, exp.length - 1))
			return sub + lastChar + sub
		}
		return exp
	}
}