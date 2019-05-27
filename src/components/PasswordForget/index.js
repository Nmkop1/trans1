import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MDBInput, MDBBtn } from 'mdbreact'
const PasswordForgetPage = () => (
    <div className="PasswordForgetForm">

        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <div className="passwordForgetFormWrapper">
                <div className="formPasswordForgetForm">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h5 text-center mb-4">Nie pamiętasz hasła?</h1>
                        <p>Wyślemy do Ciebie wiadomość e-mail z linkiem do strony umożliwiającej zmianę hasła.</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Podaj email"
                                icon="envelope"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn disabled={isInvalid} type="submit">Wyślij</MDBBtn>
                            {error && <p>{error.message}</p>}
                        </div>
                    </form>
                </div>



            </div>






        );
    }
}

const PasswordForgetLink = () => (

    <Link className="passwordForget" to={ROUTES.PASSWORD_FORGET}>Zapomniałeś hasła?</Link>

);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };