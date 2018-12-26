export default class CalculatorHelper {
	checkNumStartWithZero(exp, insertValue, dotAvailable) {
		let lastOperator = -1
		for (let i = exp.length - 1; i >= 0; i--) {
			if (this.isOperator(exp[i])) {
				lastOperator = i
				break
			}
		}
		if (exp[lastOperator + 1] === '0' && dotAvailable) {
			return exp.slice(0, exp.length - 1) + insertValue
		}
		return exp + insertValue
	}

	isOperator(value) {
		return isNaN(value) && value !== '.'
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

	convertIfLastCharIsOperator(exp) {
		const lastChar = exp.slice(exp.length - 1)
		if (this.isOperator(lastChar)) {
			const sub = eval(exp.slice(0, exp.length - 1))
			return sub + lastChar + sub
		}
		return exp
	}

	checkDotAvailable(dotStatus, lastChar, newResult) {
		let isDotAvailable = dotStatus
		if (lastChar === '.') {
			isDotAvailable = true
		} else if (this.isOperator(lastChar)) {
			const indexOfDot = newResult.lastIndexOf('.')
			if (indexOfDot !== -1)  {
				isDotAvailable = false
				for (let i = newResult.length - 1; i > indexOfDot; i--) {
					if (isNaN(newResult[i])) {
						isDotAvailable = true
						break;
					}
				}
			}
		}
		return isDotAvailable
	}
}