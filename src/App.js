import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLastValue, appendNextValue, appendOperator } from './actions';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayAnswer: false
		}
		this.printExpression = this.printExpression.bind(this);
		this.handleNumberClick = this.handleNumberClick.bind(this);
		this.handleOperatorClick = this.handleOperatorClick.bind(this);
		this.calculate = this.calculate.bind(this);
	}

	componentDidUpdate() {
		
	}

	handleNumberClick(e) {
		//console.log(e.target.value);
		this.props.updateLastValue(e.target.value);
		// Force a re-render
		this.setState({});
	}

	handleOperatorClick(e) {
		this.props.appendNextValue();
		this.props.appendOperator(e.target.value);
		// Force a re-render
		this.setState({});
	}

	printExpression() {
		if (this.state.displayAnswer) {
			try {
				return this.calculate();
			}
			catch (error) {
				return "Invalid expression!";
			}
		}
		let expression = '';
		for (let i = 0; i < this.props.values.length; ++i) {
			expression += this.props.values[i];
			if (i < this.props.operators.length) {
				expression += this.props.operators[i];
			}
		}
		
		return expression;
	}

	calculate() {
		let operators = this.props.operators;
		let values = this.props.values;
		values = values.map((v) => parseFloat(v));
		//console.log(values);
		// Multiply and divide
		let i = 0;
		for (i = 0; i < operators.length; ++i) {
			if (operators[i] === '*'){
				let newValue = values[i] * values[i + 1];
				values.splice(i, 2, newValue);

				operators.splice(i, 1);
				i = -1;
			}
			else if (operators[i] === '/') {
				let newValue = values[i] / values[i + 1];
				if (!isFinite(newValue)) throw new Error("Invalid division");
				values.splice(i, 2, newValue);

				operators.splice(i, 1);
				i = -1;
			}
		}
		// Add and subtract
		for (i = 0; i < operators.length; ++i) {
			if (operators[i] === '+'){
				let newValue = values[i] + values[i + 1];
				values.splice(i, 2, newValue);

				operators.splice(i, 1);
				i = -1;
			}
			else if (operators[i] === '-') {
				let newValue = values[i] - values[i + 1];
				values.splice(i, 2, newValue);

				operators.splice(i, 1);
				i = -1;
			}
		}
		return values[0];
	}

	render() {
		return (
				<div className="App">
					<div className="calculator-holder">
			    		<div className="calculator-display">
			    			{this.printExpression()}
			    		</div>
			    		<div className="button-row">
			    			<button className="button" value={1} onClick={this.handleNumberClick}>
			    				1
			    			</button>
			    			<button className="button" value={2} onClick={this.handleNumberClick}>
			    				2
			    			</button>
			    			<button className="button" value={3} onClick={this.handleNumberClick}>
			    				3
			    			</button>
			    			<button className="button" value={'+'} onClick={this.handleOperatorClick}>
			    				+
			    			</button>
			    		</div>
			    		<div className="button-row">
			    			<button className="button" value={4} onClick={this.handleNumberClick}>
			    				4
			    			</button>
			    			<button className="button" value={5} onClick={this.handleNumberClick}>
			    				5
			    			</button>
			    			<button className="button" value={6} onClick={this.handleNumberClick}>
			    				6
			    			</button>
			    			<button className="button" value={'-'} onClick={this.handleOperatorClick}>
			    				-
			    			</button>
			    		</div>
			    		<div className="button-row">
			    			<button className="button" value={7} onClick={this.handleNumberClick}>
			    				7
			    			</button>
			    			<button className="button" value={8} onClick={this.handleNumberClick}>
			    				8
			    			</button>
			    			<button className="button" value={9} onClick={this.handleNumberClick}>
			    				9
			    			</button>
			    			<button className="button" value={'*'} onClick={this.handleOperatorClick}>
			    				*
			    			</button>
			    		</div>
			    		<div className="button-row">
			    			<button className="button" value={0} onClick={this.handleNumberClick}>
			    				0
			    			</button>
			    			<button className="button" value={'/'} onClick={this.handleOperatorClick}>
			    				/
			    			</button>
			    			<button className="button" value={'.'} onClick={this.handleNumberClick}>
			    				.
			    			</button>
			    			<button className="button" value={'='} onClick={() => this.setState({displayAnswer: true})}>
			    				=
			    			</button>
			    		</div>
			    	</div>
				</div>
    	);
	}
}

function mapStateToProps(state) {
	return {
		values: state.updateLastValue.values,
		operators: state.appendNextValue.operators
	}

}

export default connect(mapStateToProps, {
	updateLastValue,
	appendNextValue,
	appendOperator
}) (App);
