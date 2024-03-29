import React from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
  // withEmailVerification _______z tym jest problem
} from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div className="HomePage">
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />


  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,_______z tym jest problem
  withAuthorization(condition),
)(HomePage);