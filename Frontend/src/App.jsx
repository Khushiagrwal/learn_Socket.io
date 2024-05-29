import React, { useRef, useEffect, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    context?.beginPath();
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    context?.lineTo(e.clientX, e.clientY);
    context?.stroke();
    context?.beginPath();
    context?.moveTo(e.clientX, e.clientY);
  };

  return (
    <div>
      <h1>CANVAS DRAWING</h1>
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
