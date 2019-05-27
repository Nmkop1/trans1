import { withAuthorization } from '../Session';
import React from "react";

const HomePage = () => (
  <>
    <h1>HOME</h1>
  </>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);



