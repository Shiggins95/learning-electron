import React, { useRef, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './index.scss';
import ChatRoom from './Chatroom';
import SignIn from './SignIn';

firebase.initializeApp({
  apiKey: 'AIzaSyCvYtTnL_aPdH5fCi2_3Y0655aOqZyZmls',
  authDomain: 'electronapp-7ab7d.firebaseapp.com',
  projectId: 'electronapp-7ab7d',
  storageBucket: 'electronapp-7ab7d.appspot.com',
  messagingSenderId: '354386387798',
  appId: '1:354386387798:web:a13cfc752bc5fa189d2cf7',
  measurementId: 'G-N5K86QG44C',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
  const viewerDiv = useRef();
  const [user] = useAuthState(auth);

  const handleClick = () => {
    const x = electron.notificationApi.sendNotification(
      'Notification',
    );
    console.log('XXXX ', x);
  };

  return (
    <div className="app">
      {user ? <ChatRoom /> : <SignIn auth={auth} />}
      <button type="button" onClick={handleClick}>
        Clicker
      </button>
    </div>
  );
}
