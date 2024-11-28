import React, { useState } from 'react';

const CodeEditor = ({ setCode }) => {
  return (
    <div>
      <textarea
        placeholder="Write your code here..."
        onChange={(e) => setCode(e.target.value)} // Updating code in parent component
        rows="10"
        cols="50"
      />
    </div>
  );
};

export default CodeEditor;
