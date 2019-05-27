import React from 'react';
import { MDBBtn } from 'mdbreact'
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (


  <MDBBtn className="buttonSignOut" type="button"
    onClick={firebase.doSignOut}
  >
    Wyloguj się</MDBBtn>


);

export default withFirebase(SignOutButton);