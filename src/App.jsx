// App.js
import React, { useState } from 'react';
import Compiler from './components/Compiler';  // Import Compiler component
import SketchPad from './components/SketchPad';  // Import SketchPad component
import './App.css';

const App = () => {
  const [leftWidth, setLeftWidth] = useState(50);  // Set the initial width of the left section (code editor)

  const handleDrag = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100; // Calculate the new width percentage based on mouse position
    if (newWidth >= 10 && newWidth <= 90) {  // Ensure the width stays within reasonable limits (10%-90%)
      setLeftWidth(newWidth);
    }
  };

  return (
    <div id="root" className="App">
      <div className="container">
        {/* Left section for code editor */}
        <div
          className="code-editor"
          style={{ flexBasis: `${leftWidth}%`, maxWidth: `${leftWidth}%` }}
        >
          <Compiler />
        </div>

        {/* Resizable divider */}
        <div
          className="resizer"
          onMouseDown={(e) => {
            document.addEventListener('mousemove', handleDrag);  // Start dragging
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleDrag);  // Stop dragging when mouse is released
            });
          }}
        />

        {/* Right section for sketching area */}
        <div
          className="sketch-area"
          style={{ flexBasis: `${100 - leftWidth}%`, maxWidth: `${100 - leftWidth}%` }}
        >
          <SketchPad />
        </div>
      </div>
    </div>
  );
};

export default App;
