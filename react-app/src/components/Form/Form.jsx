/*
Author: Bryan FRIMIN 
github/@gearnode
Link: https://gist.github.com/gearnode/1bfafc0cd060fbc505ff42be38f8169a
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormObject from './FromObject'

export default class Form extends Component {

	// static propTypes = {
	// 	method: PropTypes.string.isRequired,
	// 	action: PropTypes.string.isRequired,
	// 	encType: PropTypes.string.isRequired,
	// 	serializeForm: PropTypes.func.isRequired,
	// 	onResponse: PropTypes.func.isRequired
	// }

	constructor(props) {
		super(props)
		this.state = { performing: false }
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	preventUserSpam(func) {
		if (this.state.performing === false) {
			this.setState({ performing: true })
			func()
			this.setState({ performing: false })
		} else {
			console.debug("some action perform please wait...")
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const form = event.currentTarget

		console.debug("NativeFormValidation disabled => ", form.noValidate)

		this.preventUserSpam(_ => {
			if (form.checkValidity() === false) {
				form.reportValidity()
				const formErrors = FormObject.collectErrors(form)
				console.warn('formErrors => ', formErrors)
				return
			}

			const fromData = FormObject.collectValues(form);
			const serializeForm = this.props.serializeForm || JSON.stringify
			const fetchRequest = {
				body: serializeForm(fromData),
				headers: { 'content-type': this.props.encType || "application/json" },
				method: this.props.method || "GET"
			}

			fetch(this.props.action, fetchRequest).then(this.props.onResponse)
		})
	}

	render() {
		return (
			<div>
				<form method={this.props.method}
					action={this.props.action}
					encType={this.props.encType}
					onSubmit={this.handleSubmit}
					noValidate>
					{this.props.children}
				</form>
			</div>
		)
	}
}



export class Input extends Component {


	constructor(props) {
		super(props)
		this.state = { value: props.value }
		this.changeHandler = this.changeHandler.bind(this);
	}


	changeHandler(event) {
		this.setState({ value: event.target.value });
	}

	render() {

		// creates a shallow copy of this.props
		let otherProps = Object.assign({}, this.props);
		// removes value property from otherProps
		delete otherProps.value;
		// now, we have a copy of all props except value in otherProps
		return <input {...otherProps} value={this.state.value} onChange={this.changeHandler} className="form-control" />

	}
}



export class EditableText extends Component {


	constructor(props) {
		super(props)
		this.state = {
			edit: !props.value,
			originalVal: props.value,
			currentVal: props.value
		}
		this.toggleEditState = this.toggleEditState.bind(this);
		this.blurHandler = this.blurHandler.bind(this);
	}


	toggleEditState(isEditable) {
		this.setState({ edit: isEditable });
	}

	blurHandler(event) {

		this.setState({ currentVal: event.target.value });
		console.log(this.state.currentVal, event.target.value)

		this.toggleEditState(!event.target.value || false);
	}

	render() {

		let updated = (this.state.originalVal != this.state.currentVal);
		let strikeStyle = updated ? { textDecoration: 'line-through' } : {};
		
		// creates a shallow copy of this.props
		let otherProps = Object.assign({}, this.props);
		// removes value property from otherProps
		delete otherProps.value;
		
		return <div>
			{this.state.edit ?
				null
				: <div>
					<div style={strikeStyle}>{this.state.originalVal}</div>
					{updated ? <b>{this.state.currentVal}</b> : null}
					(<a onClick={() => this.toggleEditState(true)}>edit</a>)
			</div>
			}
			<Input {...otherProps} value={this.state.currentVal || ''} onBlur={this.blurHandler} type={this.state.edit?'text':'hidden'}/>
		</div>

	}
}
