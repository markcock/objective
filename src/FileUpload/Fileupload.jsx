import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Fileupload.scss';
import axios from "axios";

const Fileupload = ({ files, setfiles, removeFile }) => {
    const [dragActive, setDragActive] = useState(false);

    // Handle file input through the traditional input element
    const uploadHandler = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length === 0) return;
        handleFilesUpload(selectedFiles);
    };

    // Handle file input via drag and drop
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length === 0) return;
        handleFilesUpload(droppedFiles);
    };

    // Common handler for both input and drop
    const handleFilesUpload = (filesToUpload) => {
        const formData = new FormData();
        for (let i = 0; i < filesToUpload.length; i++) {
            formData.append('files', filesToUpload[i]);
        }

        axios.post('http://localhost:8080/upload', formData)
            .then((res) => {
                console.log(res.data);
                const uploadedFiles = Array.from(filesToUpload).map(file => ({
                    name: file.name,
                }));
                setfiles([...files, ...uploadedFiles]);
            })
            .catch((err) => {
                console.error(err);
                removeFile(); // Adjust this if you want to handle errors differently
            });
    };

    // Drag events
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div
            className={`file-card ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div className="file-inputs">
                <input
                    type="file"
                    onChange={uploadHandler}
                    multiple
                    accept=".pdf"
                    className="file-input"
                />
                <button>
                    <i>
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Upload
                </button>
            </div>
            <p className="main">Supported File Type: PDF</p>
            {dragActive && <p className="drag-message">Drop files here...</p>}
        </div>
    );
};

export default Fileupload;
