import React from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
  // withEmailVerification _______z tym jest problem
} from '../Session';
import Nowe from '../DoNowego';

const Nowy = () => (
  <div className="HomePage">


    <Nowe />


  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,_______z tym jest problem
  withAuthorization(condition),
)(Nowy);