import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class Test1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chartData: {
				labels: ['React.js', 'Jqery.js', 'HTML', 'vue.js', 'typeScript.js', 'coffeeScript'],
				datasets:[
					{
						label: 'Visualization',
						data: [28.79, 21.04, 19.73, 14.83, 7.80, 7.80],
						backgroundColor: [
							'#189af3', '#11d5de', '#19e069', '#eac81f', '#da3249', '#54387f'
						]
					}
				]
			},
			chartOptions: {
				maintainAspectRatio: true,
				legend: {
					labels: {
						usePointStyle: true
					},
					position: 'right'
				},
				title: {
					display: true,
					position: 'bottom',
					text: 'Visualization'
        }
			}
		}
	}

	render() {
		return (
			<div className='container'>
				<h4 className='mb-4'>Visualization</h4>
				<Doughnut data={this.state.chartData} options={this.state.chartOptions} height={150}></Doughnut>
			</div>
		)
	}
}