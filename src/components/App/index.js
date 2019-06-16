import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//MDB npm install --save mdbreact
// Import style files into the src/index.js before the App.js file:
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../index.scss";
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import Drawer from 'react-motion-drawer';
import Zlecenie from '../Zlecenie';
import DoWykonania from '../ZadaniaDoWykonania';
import Wykonane from '../Wykonane';
import Tabela from '../Tabela';
import Nowy from '../Nowy';

const App = () => (
    <Router>
        <div className="wrapper">
            <Hamurger />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.ZADANIADOWYKONANIA} component={DoWykonania} />
            <Route exact path={ROUTES.WYKONANE} component={Wykonane} />
            <Route exact path={ROUTES.TABELA} component={Tabela} />
            <Route exact path={ROUTES.NOWY} component={Nowy} />
            <Route
                exact
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route path={ROUTES.ZLECENIE} component={Zlecenie} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);

export default withAuthentication(App);

class Hamurger extends Component {
    state = {
        openLeft: false,
        drawerStyle: `
  {
    "background": "#fff",
    "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
  }`,


        noTouchOpen: false,
        noTouchClose: false,
    };

    render() {
        const {
            drawerStyle: stringDrawerStyle,
            openLeft,
            openRight,
            noTouchOpen,
            noTouchClose
        } = this.state;

        let drawerStyle = {}
        try {
            drawerStyle = JSON.parse(stringDrawerStyle)
        } catch (err) {
            console.error('Error parsing JSON: ', err)
        }

        const drawerProps = {
            overlayColor: "rgba(0, 145, 112, 0.6)",
            drawerStyle
        };

        return (
            <div>
                {!openLeft &&
                    <Drawer
                        right
                        fadeOut={true}
                        {...drawerProps}
                        open={openRight}
                        onChange={open => this.setState({ openRight: open })}
                        noTouchOpen={noTouchOpen}
                        noTouchClose={noTouchClose}
                    >
                        <Navigation />
                    </Drawer>}
                <div className="hamburgerWrapper"


                >
                    {!openRight ? <i onClick={() =>
                        this.setState({ openRight: !openRight, openLeft: false })}
                        className="fa fa-bars" /> : false}
                </div>
            </div>
        );
    }
}