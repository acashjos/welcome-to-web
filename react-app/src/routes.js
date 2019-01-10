import { Route, Switch } from "react-router-dom";
import React from "react";
import Signup from "./components/signup.jsx"

const Home = () => <div>Welcome</div>

export default class Routes extends React.Component {

    // constructor
    Routes(props) {
        // if there is something to be run in constructor, it goes here
        console.log('}}}}}}}')
        this.setState({ });
        alert(220)

    }

    // lifecycle functions
    componentDidMount() {
    }


    //custom methods
    ifLoggedIn(component, defaultProps) {
        console.log('.....', defaultProps);
        if (this.state.session) return React.createElement(component, Object.assign({ user: this.session }, defaultProps));
        //return <Login onLogin={(user) => { this.setState({ session: user }) }} />
        return <div>Please login to continue</div>
    }

    // a render function is the absolute minimum requirement for a react component extended from React.Component class
    render(i) {
        return <Switch>
            {/* <Route exact path="/" component={(routeProps) => this.ifLoggedIn(Home, routeProps)} /> */}
            <Route path="/" component={Signup} />
            {/* <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} /> */}
        </Switch>

    }


}