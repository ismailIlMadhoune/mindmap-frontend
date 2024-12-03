import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language }) => {
  const handleEditorChange = (value) => {
    setCode(value); // Update the code in the parent component
  };

  return (
    <div style={{ height: '100%', border: '1px solid #ddd' }}>
      <MonacoEditor
        height="100%"
        defaultLanguage={language} // Dynamically change language (e.g., 'javascript', 'java')
        value={code}               // The current code content
        onChange={handleEditorChange} // Handle code changes
        theme="vs-dark"            // Use a dark theme
        options={{
          fontSize: 14,           // Customize font size
          minimap: { enabled: false }, // Disable the minimap for simplicity
        }}
      />
    </div>
  );
};

export default CodeEditor;
