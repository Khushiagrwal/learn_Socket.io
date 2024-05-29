import React from 'react'
import {io} from "socket.io-client"

function App() 
{
  const socket = io("http://localhost:3000")
  socket.on("connect",()=>{
    console.log("Connection is establish")
  })
  socket.on("welcome",(msg)=>{
    console.log(msg);
  })
  
  return (
    <>
    <h1>LEARN SOCKET.IO</h1>
    </>
  )
}

export default App