import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics'
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
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
       {user ? <ChatRoom room ={room}/> :<SignIn />}
      </section>
      <SignOut />

    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef();
  const [roomName, setRoomName] = useState('');
  const messagesRef = firestore.collection(roomName);
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const switchRoomEntry = async() => {
    setRoomName('default');
  }

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }


  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit"></button>
      </form>

      <form onSubmit={switchRoomEntry}> 
        <input
          type ="text"
          id ="roomName"
          name ="roomName"
          value={roomName}
          placeholder='Change Room'
          onChange={(event) => setRoomName(event.target.value)
          }
        />
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default App;
