import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from './CodeEditor';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');  // default language is Java
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/execute', {
        script: code,
        language: language,
        versionIndex: '0', // Java version; change for different languages
      });
      setOutput(response.data.output || response.data.error);  // set the output or error message
    } catch (error) {
      setOutput('Error compiling code.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Code Compiler</h1>

      {/* Code editor component */}
      <CodeEditor setCode={setCode} />

      {/* Language selection */}
      <div>
        <label>Select Language: </label>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Compile Button */}
      <div>
        <button onClick={handleCompile}>Compile Code</button>
      </div>

      {/* Output area */}
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
