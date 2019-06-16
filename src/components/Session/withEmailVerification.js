import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div className="HomePage">
                {this.state.isSent ? (
                  <p>
                    Wysłano potwierdzenie e-mailem: sprawdź wiadomości e-mail (spam)
                    w folderze), aby potwierdzić wiadomość e-mail.
                    Odśwież tę stronę po potwierdzeniu wiadomości e-mail.
                  </p>
                ) : (
                    <p>

                      Zweryfikuj pocztę e-mail: sprawdź wiadomości e-mail (folder spamu)
                                            w zestawie) do potwierdzenia e-mailem lub wysłać
                                            kolejny e-mail z potwierdzeniem.
                  </p>
                  )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Wyślij wiadomość e-mail z potwierdzeniem
                </button>
              </div>
            ) : (
                <Component {...this.props} />
              )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
