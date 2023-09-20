import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css"
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] =useState(null);
  const [room,setRoom] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  if(!isAuth){
    return(
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setInAuth={setIsAuth} />
      </AppWrapper>
    );
  }
  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button
            onClick={() => {
              setIsInChat(true);
              setCurrentRoom(room)
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <div className="room-div">
          <Chat room={currentRoom} />
          <div className="room-change-div">
            <input className="room-input-field" onChange={(e) => setRoom(e.target.value)} />
            <button className="button" href="#" color="#1e9bff"
              onClick={() => {
                setCurrentRoom(room);
                console.log(room)
              }}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
    </AppWrapper>
  );
}

export default App;
