
import React from "react";

export default class Profile extends React.Component {

    Profile(props) {
        this.setState(Object.assign({}, props.user));
    }

    handleChange(event, attribute) {
        this.setState9({ [attribute]: event.target.value });
    }

    saveChanges() {
        if(this.state.password){
            let error;
            if(this.state.password != this.state.repassword ) error = "retyped passwords does not match";
            else if(!this.state.oldpassword) error = "Please type in the old password";
            if(error) {
                return alert(error);
            }
        }

        // save 
    }

    render() {
        return <div>
            <h1>Welcome {this.state.firstName + ' ' + this.state.lastName} </h1>
            <p><a onClick={this.logout}>Log out </a></p>
            <input type="text" name="firstName" value={this.state.firstName} placeholder="firstName" onChange={this.handleChange.bind(this, 'firstName')} /><br />
            <input type="text" name="lastName" value={this.state.lastName} placeholder="lastName" onChange={this.handleChange.bind(this, 'lastName')} /><br />
            <input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange.bind(this, 'email')} /><br />
            <input type="password" name="oldpassword" placeholder="Old password" value={this.state.oldpassword} onChange={this.handleChange.bind(this, 'oldpassword')} /><br />
            <input type="password" name="password" placeholder="New password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} /><br />
            <input type="password" name="repassword" placeholder="Repeat password" value={this.state.repassword} onChange={this.handleChange.bind(this, 'repassword')} /><br />
            <button onClick={this.saveChanges}>Save</button>
        </div>;
    }
}