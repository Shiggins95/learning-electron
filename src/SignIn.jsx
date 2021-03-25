import React from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const childWindow = window.open('', 'blank');
    const button = childWindow.document.createElement('button');
    button.addEventListener('click', (event) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    });
    button.innerText = 'click me';
    childWindow.document.querySelector('body').appendChild(button);
  };

  return (
    <button type="button" onClick={signInWithGoogle}>
      Sign In
    </button>
  );
};

SignIn.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default SignIn;
