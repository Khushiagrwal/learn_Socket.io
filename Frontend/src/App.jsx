import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const socket = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const position = useRef({ x: 0, y: 0 });
  const [isEraser, setIsEraser] = useState(false);
  const [room,setRoom]=useState("");

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    socket.current.on('drawing', ({ x0, y0, x1, y1, eraser }) => {
      if (ctx) {
        drawLine(ctx, x0, y0, x1, y1, eraser);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const drawLine = (ctx, x0, y0, x1, y1, eraser) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = eraser ? 'white' : 'black';
    ctx.lineWidth = eraser ? 10 : 2; // Adjust eraser size as needed
    ctx.stroke();
    ctx.closePath();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    position.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const newX = e.clientX;
    const newY = e.clientY;
    const { x, y } = position.current;

    drawLine(context, x, y, newX, newY, isEraser);

    socket.current.emit('drawing', {
      x0: x,
      y0: y,
      x1: newX,
      y1: newY,
      eraser: isEraser
    });

    position.current = { x: newX, y: newY };
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };
  
  const setCode=(e)=>{
    e.preventDefault;
    console.log(room);
    setCode("");
  }
  return (
    <div>
      <h1>CANVAS DRAWING</h1>
      <button onClick={toggleEraser}>
        {isEraser ? 'Switch to Drawing' : 'Switch to Eraser'}
      </button>
      <form onSubmit={setCode}>
        <label htmlFor="">Code</label>
        <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
}

export default App;
