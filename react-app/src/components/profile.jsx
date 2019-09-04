
import React from "react";
import Form, { EditableText } from "./Form/Form.jsx";

export default class Login extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
        // this.state = {error: "sample error"};
        this.onSubmit = this.onSubmit.bind(this);
    };

    async onSubmit(response) {
        let error = ""
        if (!response) error = "Something went wrong while submitting. Please try again";
        else if (!response.ok) error = await response.json();
        else {
            this.props.refreshSession();
            alert("Updated !!");
        }
        this.setState({ error: error && error.errorMsg })

    }

    render() {
        return <Form method="POST" onResponse={this.onSubmit} action="/api/profile">
            First Name: <EditableText type="text" name="firstName" placeholder="firstName" value={this.props.user.firstName} /><br />
            Last Name: <EditableText type="text" name="lastName" placeholder="lastName" value={this.props.user.lastName} /><br />
            Email: <EditableText type="email" name="email" placeholder="Email" value={this.props.user.email} /><br />
            <input type="password" name="oldpassword" placeholder="Old password" /><br />
            <input type="password" name="password" placeholder="New password" /><br />
            <input type="password" name="repassword" placeholder="Repeat password" /><br />
            <br />
            <b>{this.state.error}</b>
            <br />
            <input type="submit" value="Save" />
        </Form>
    }
}