
import React from "react";
import Form from "./Form/Form.jsx";

export default class Signup extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
        // this.state = {error: "sample error"};
    };

    async onSubmit(response) {
        let error = ""
        if (!response) error = "Something went wrong while submitting. Please try again";
        else if (!response.ok) error = await response.json();
        else this.props.history.replace('/'); // redirect to login page
        this.setState({ error: error && error.errorMsg })

    }

    render() {
        return <Form method="POST"  onResponse={this.onSubmit} action="/api/signup">
            <input type="text" name="firstName" placeholder="firstName" /><br />
            <input type="text" name="lastName" placeholder="lastName" /><br />
            <input type="password" name="password" placeholder="Password" /><br />
            <input type="password" name="repassword" placeholder="Repeat Password" /><br />
            <input type="email" name="email" placeholder="Email" /><br />
            <br />
            <b>{this.state.error}</b>
            <br />
            <input type="submit" value="Register" />
        </Form>
    }
}