
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div className="signUp">

        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
            wyk: false
        };

    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Utwórz użytkownika w bazie danych Firebase w czasie rzeczywistym
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    })
                    .then(() => {
                        this.setState({
                            ...INITIAL_STATE,
                            wyk: true
                        });
                        this.props.history.push(ROUTES.HOME);

                    })
                    .catch(error => {
                        this.setState({ error });
                    });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <> <div className="signUpWrapper">
                <div className="formSignUp">
                    <form onSubmit={this.onSubmit}
                    >
                        <p className="h4 text-center py-4">Sign up</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Podaj login"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="username"
                                value={username}
                                onChange={this.onChange}


                            />
                            <MDBInput
                                label="Podaj email"
                                icon="envelope"
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                name="email"
                                value={email}
                                onChange={this.onChange}

                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                            />
                            <div className="text-center py-4 mt-3">
                                <MDBBtn disabled={isInvalid} type="submit">Zarejestruj</MDBBtn>
                                {error && <p>{error.message}</p>}
                                {this.state.wyk ? <PanelPage /> : null}
                            </div>

                        </div>
                    </form>

                </div>
            </div>
            </>
        );
    }
}

const SignUpLink = () => (
    <p>
        Nie masz konta? <Link to={ROUTES.SIGN_UP}>Zarejestruj się</Link>
    </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };




const PanelPage = props => {
    return (
        <MDBContainer>
            <MDBRow className="mb-4">
                <MDBCol sm="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Special title treatment</MDBCardTitle>
                            <MDBCardText>
                                With supporting text below as a natural lead-in to additional
                                content.
              </MDBCardText>
                            <MDBBtn color="primary">go somewhere</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>


            </MDBRow>
        </MDBContainer>
    );
};