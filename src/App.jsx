import React, { useState } from 'react';
import './App.scss';
import Fileupload from './FileUpload/Fileupload';
import Filelist from './FileList/Filelist';

function App() {
    const [files, setfiles] = useState([]);

    const removeFile = (filename) => {
        setfiles(files.filter(file => file.name !== filename));
    }

    return (
        <div className="App">
            <p className='title'>Upload files</p>
            <Fileupload files={files} setfiles={setfiles} removeFile={removeFile} />
            <Filelist files={files} removeFile={removeFile} />
        </div>
    );
}

export default App;
