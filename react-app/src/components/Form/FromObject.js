/*
Author: Bryan FRIMIN 
github/@gearnode
//Attribution: https://gist.github.com/gearnode/1bfafc0cd060fbc505ff42be38f8169a
*/

export default class FormObject {
	static collectValues(form) {
		const inputs = form.elements
		let data = {}
		for (let i = 0; inputs[i] !== undefined; i++)
			if (inputs[i].nodeName !== "BUTTON")
				data[inputs[i].name] = inputs[i].value
		return data
	}

	static collectErrors(form) {
		const inputs = form.elements
		let errors = {}

		for (let i = 0; inputs[i] !== undefined; i++)
			if (inputs[i].nodeName !== "BUTTON")
				errors[inputs[i].name] = inputs[i].validationMessage
		return errors
	}
}