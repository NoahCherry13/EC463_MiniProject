import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA0lnW0-W3ukxO7adwpb3dgjk15Tzp2JcM",
  authDomain: "interestingpotato-7b5bc.firebaseapp.com",
  projectId: "interestingpotato-7b5bc",
  storageBucket: "interestingpotato-7b5bc.appspot.com",
  messagingSenderId: "734383287787",
  appId: "1:734383287787:web:a1f482e48f36515fbafdae",
  measurementId: "G-TC8NEH4GZ0"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn(){
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        <SignIn />
      {/* {user ? <ChatRoom /> :<SignIn />} */}
      </section>
    </div>
  );
}


function SignOut(){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map( msg => <ChatMessage key ={msg.id} message = {msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props){
  const {text, uid} = props.message;

  return <p>{text}</p>
}

export default App;
