
import React from "react";
import Form from "./Form/Form.jsx";

export default class Signup extends React.Component {


    render() {
        return <Form method="POST">
            <input type="text" name="firstName" placeholder="firstName" /><br />
            <input type="text" name="lastName" placeholder="lastName" /><br />
            <input type="password" name="password" placeholder="Password" /><br />
            <input type="password" name="repassword" placeholder="Repeat Password" /><br />
            <input type="email" name="email" placeholder="Email" /><br />
            <input type="submit" value="Register" />
        </Form>
    }
}