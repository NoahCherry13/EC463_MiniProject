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
       {user ? <ChatRoom /> :<SignIn />}
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
    <div>
  <header>
    <h1>Join Our Chat</h1>
    <p>Connect with your friends in real-time!</p>
  </header>
  <main>
    <section class="features">
      <div class="feature">
        <img src="https://img.freepik.com/premium-vector/chat-internet-friend-talking-business_68292-840.jpg" alt="Icon 1" />
        <h2>Chat with Friends</h2>
        <p>Talk to your friends in real-time, no matter where they are.</p>
      </div>
      <div class="feature">
        <img src="https://th.bing.com/th/id/R.f22cd3793c6880d1deb6c874493b4b93?rik=JvBHuROoZpONSQ&pid=ImgRaw&r=0" alt="Icon 3" />
        <h2>Fun Emojis</h2>
        <p>Express your emotions with a wide variety of emojis and stickers.</p>
      </div>
    </section>
    <section class="subscribe">
      <h2>Join Now</h2>
      <p>Don't miss the fun, join our chat today.</p>
      <button class="subscribe-button" onClick={signInWithGoogle}>Sign in with Google</button>
    </section>
  </main>
</div>
  );
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

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
        <button type="submit">Send</button>
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
