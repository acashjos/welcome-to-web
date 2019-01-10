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
			this.setState({performing: true})
			func()
			this.setState({performing: false})
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

			const fromData = FormObject.collectValues(form)
			const serializeForm = this.props.serializeForm || JSON.stringify
			const fetchRequest = { body: serializeForm(fromData),
				               headers: { 'content-type': this.props.encType || "application/json" },
				               method: this.props.method || "GET" }

			fetch(this.props.action, fetchRequest).then(this.props.onResponse)
		})
	}

	render() {
		return (
			<div>
				<form method={ this.props.method }
				      action={ this.props.action }
				      encType={ this.props.encType }
				      onSubmit={ this.handleSubmit }
				      noValidate>
					{ this.props.children }
				</form>
			</div>
		)
	}
}