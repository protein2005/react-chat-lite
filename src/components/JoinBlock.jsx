import React, { useState } from "react";
import socket from "../socket";
import axios from "axios";

function JoinBlock( {onLogin} ) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async() => {
    try {
      if (!roomId || !userName) {
        return alert('Помилка при введені даних!')
      }
      const obj = {
        roomId,
        userName
      }
      setLoading(true);
      await axios.post(`/rooms`, obj);
      onLogin(obj);
    } catch (error) {
      alert('Невдалось увійти в кімнату')
    }
  }

  return (
    <div className="join-block">
      <input 
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше ім'я"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
        {isLoading ? 'ВХІД...' : 'УВІЙТИ'}
      </button>
    </div>
  )
}

export default JoinBlock;