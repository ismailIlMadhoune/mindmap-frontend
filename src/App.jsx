import React from 'react';
import Compiler from './components/Compiler';  // Import Compiler component
import SketchPad from './components/SketchPad';  // Import SketchPad component

const App = () => {
  return (
    <div className="App">
      <div className="container">
        {/* Left section for code editor */}
        <div className="code-editor">
          <Compiler />
        </div>

        {/* Right section for sketching area */}
        <div className="sketch-area">
          <SketchPad />
        </div>
      </div>
    </div>
  );
};

export default App;
