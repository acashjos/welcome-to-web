import { Route, Switch, Link } from "react-router-dom";
import React from "react";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Profile from "./components/profile.jsx";
import { auto } from "html-webpack-plugin/lib/chunksorter";

const NotFound = () => <div>Page not found</div>;

const Menu = (props) => {

    async function logout() {
        await fetch('/api/signout', { method: "GET" });
        props.updateSession();
    }

    if (props.session) {
        // menu to show if loggedin
        return <div>
            <a onClick={logout}>Logout</a>
        </div>;
    }
    // menu to show if not logged in
    return <div>
        {/* <Link to="/" >Something</Link> |
        <Link to="/signup" >Something</Link> | */}
    </div>;
}

export default class Routes extends React.Component {

    // constructor
    constructor(props) {
        // if there is something to be run in constructor, it goes here
        super(props)
        this.state = { inProgress: true };
        this.ifLoggedIn = this.ifLoggedIn.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.updateSession();
    }

    async updateSession() {
        let user = await fetch('/api/profile', { method: "GET" });
        try {
            this.setState({ session: await user.json(), inProgress: false });
        } catch (e) {
            this.setState({ session: null, inProgress: false });
        }
    }

    //custom methods
    ifLoggedIn(component, defaultProps) {
        if (this.state.session)
            return React.createElement(
                component,
                Object.assign({ user: this.state.session, refreshSession: this.updateSession }, defaultProps)
            );
        return <Login
            onLoginSuccess={this.updateSession} />
    }

    // a render function is the absolute minimum requirement for a react component extended from React.Component class
    render(i) {


        return <div classNmae="row">
            <div className="col-md-12" style={{ height: "20vh" }}></div>
            <div className="col-12 col-md-4 offset-md-4" >
                <Menu session={this.state.session} updateSession={this.updateSession} />
                <Switch>
                    <Route exact path="/" component={(routeProps) => this.ifLoggedIn(Profile, routeProps)} />
                    <Route path="/signup" component={Signup} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </div>

    }


}