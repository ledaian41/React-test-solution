import React, { Component } from 'react';

export default class CalculatorButton extends Component {

	render() {
		return (
			<input id={this.props.id} type="button" value={this.props.value} onClick={() => { this.props.onClick(this.props.value) }}/>
		)
	}
}