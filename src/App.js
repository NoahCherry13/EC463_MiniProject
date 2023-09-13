/* import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); // Cambio aquí, inicializado como null
  const [profile, setProfile] = useState(null); // Cambio aquí, inicializado como null

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
    redirect_uri: 'http://localhost:3000/auth/google/callback', // Update this to match your Google Developer Console settings
  });  

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the user and profile to null
  const logOut = () => {
    googleLogout();
    setUser(null); // Cambio aquí, reinicia el estado de usuario
    setProfile(null); // Cambio aquí, reinicia el estado de perfil
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App; */

// App.js
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Chat from './components/chat'; // Importa el componente Chat

function App() {
  const [user, setUser] = useState(null); // Cambio aquí, inicializado como null
  const [profile, setProfile] = useState(null); // Cambio aquí, inicializado como null

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
    redirect_uri: 'http://localhost:3000/auth/google/callback', // Update this to match your Google Developer Console settings
  });  

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the user and profile to null
  const logOut = () => {
    googleLogout();
    setUser(null); // Cambio aquí, reinicia el estado de usuario
    setProfile(null); // Cambio aquí, reinicia el estado de perfil
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
          <Chat /> {/* Renderiza el componente Chat cuando el usuario está autenticado */}
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
}

export default App;


//npm install @react-oauth/google@latest
//npm install axios
