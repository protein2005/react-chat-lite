import React, { useEffect, useReducer } from "react";
import socket from "./socket";

import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";
import axios from "axios";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj);
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
    console.log(users)
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);

    return () => {
      socket.off('ROOM:SET_USERS', setUsers);
      socket.off('ROOM:NEW_MESSAGE', addMessage);
    };
  }, [])

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default App;
