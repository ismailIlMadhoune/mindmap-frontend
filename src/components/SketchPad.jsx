import React, { useRef, useState, useEffect } from 'react';

const SketchPad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [lineWidth, setLineWidth] = useState(5); // Adjust line width
  const [color, setColor] = useState('black');   // Set color for drawing

  // Function to start drawing
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  // Function to draw on the canvas
  const draw = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setLastX(offsetX);
    setLastY(offsetY);
  };

  // Function to stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Ensure canvas size adjusts to window size
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.8;  // 80% of the window width
      canvas.height = window.innerHeight * 0.5; // 50% of the window height
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Call on initial render

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div>
      <h1>Sketch Pad</h1>
      <div>
        {/* Color Picker */}
        <label>Pick color: </label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
        />
      </div>

      <div>
        {/* Line width selector */}
        <label>Line Width: </label>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={lineWidth} 
          onChange={(e) => setLineWidth(e.target.value)} 
        />
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
      ></canvas>

      {/* Clear Button */}
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default SketchPad;
