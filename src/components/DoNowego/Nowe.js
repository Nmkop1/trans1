import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import NowyList from './NowyList';
import CircularProgress from '@material-ui/core/CircularProgress';

class Nowe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      model: "",
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({
      loading: true
    });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({
            messages: null,
            loading: false
          });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }


  handleChange = e => {// uzuskiwanie value uniwersalne
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "date") {
      this.setState({
        [name]: e.target.value
      });
    } else if (type === "checkbox") {
      this.setState({
        [name]: e.target.checked
      });
    }
  };

  onCreateMessage = (event, authUser) => { // dodanie
    const { model, text } = this.state;
    this.props.firebase.messages().push({
      text: text,
      model: model,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({// czyszczenie
      text: '',
      model: ""
    });

    event.preventDefault();
  };



  onEditMessage = (message, text, ) => {

    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,

      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });

  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { model, text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div><CircularIndeterminate /></div>}


            {!messages && <div>Brak wiadomości ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                onChange={this.handleChange}
                name="text"
                value={text}
              />
              <input
                type="text"
                onChange={this.handleChange}
                name="model"
                value={model}
              />
              <button type="submit">Send</button>
            </form>

            {messages && (
              <NowyList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Nowe);







function CircularIndeterminate() {//spinners
  const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });
  return (
    <div className="spinners">
      <CircularProgress className="spin" />
    </div>
  );
}