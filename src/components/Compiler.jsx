import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from './CodeEditor';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');  // default language is Java
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);     // Track loading state

  const handleCompile = async () => {
    if (!code.trim()) {
      setOutput('Please enter some code to compile.');
      return;
    }
    
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:5002/api/execute', {
        clientId: 'ad44c5a46f0cae10e0e5c069f3f95647',
        clientSecret: '22a95ec5a7b1e0298843aa538f19e6b4f341ddccc210de92d15837004dd675f',
        script: code,
        language: language,
      });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput('Error compiling code.');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Code Compiler</h1>

      {/* Code editor component */}
      <CodeEditor setCode={setCode} code={code} />

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
        <button onClick={handleCompile} disabled={loading}>
          {loading ? 'Compiling...' : 'Compile Code'}
        </button>
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
