
import React from "react";
import Form from "./Form/Form.jsx";
import { Link } from "react-router-dom";

export default class Login extends React.Component {


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
        else this.props.onLoginSuccess();
        this.setState({ error: error && error.errorMsg })

    }

    render() {
        return <Form method="POST" onResponse={this.onSubmit} action="/api/login">
            <input type="text" name="email" placeholder="Email" className="form-control"/><br />
            <input type="password" name="password" placeholder="Password" className="form-control"/><br />
            <br />
            <b>{this.state.error}</b>
            <br />
            <input type="submit" value="Login" className="btn btn-primary" /><br />
            <p>Dont have an account?
                <Link to="/signup" >Signup</Link>
            </p>
        </Form>
    }
}