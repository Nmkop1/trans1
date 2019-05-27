import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (

    <div className="navWrraper">
        <div className="nav">
            <NavLink exact to={ROUTES.LANDING}>Landing</NavLink>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
            {/* <NavLink to={ROUTES.ADMIN}>Admin</NavLink> */}
        </div>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (

    <div className="navWrraper">
        <div className="nav">
            <NavLink exact to={ROUTES.LANDING}>Landing</NavLink>
            <NavLink to={ROUTES.SIGN_IN}>Zaloguj się</NavLink>
        </div>

    </div>

);

export default Navigation;