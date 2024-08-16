import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('document', file);

        try {
            const res = await axios.post('https://summary-vc0k.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSummary(res.data.summary);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <h1 className='heading'>Document Summarizer</h1>
            <input type="file" onChange={handleFileChange} />
            <button  className='btn' onClick={handleUpload}>Upload and Summarize</button>
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default App;
