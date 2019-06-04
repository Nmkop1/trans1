import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MDBInput, MDBBtn } from 'mdbreact'

const SignInPage = () => (
    <div className="signIn">
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

    ;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE
        };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase.doSignInWithEmailAndPassword(email, password).then(() => {
            this.setState({
                ...INITIAL_STATE
            });
            this.props.history.push(ROUTES.HOME);
        }

        ).catch(error => {
            this.setState({
                error
            });
        });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="loginWrapper">
                <div className="formLogin">
                    <form onSubmit={this.onSubmit}

                    > <h2 className="h2 text-center mb-4">Zaloguj się</h2>
                        <div className="grey-text">
                            <MDBInput label="Podaj email"
                                icon="envelope"
                                type="email"
                                validate error="wrong"
                                success="right"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                            />
                            <MDBInput
                                label="Hasło"
                                icon="lock"
                                group type="password"
                                validate name="password"
                                value={password}
                                onChange={this.onChange}
                            /> </div>
                        <div className="text-center">
                            <MDBBtn
                                disabled={isInvalid}
                                type="submit">Login</MDBBtn>
                            {error && <p style={{ paddingTop: 20 }}
                            >Błędna hasło. Spróbuj ponownie.</p>}

                        </div>
                    </form>
                </div>
            </div>);
    }
}

const SignInForm = compose(withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };