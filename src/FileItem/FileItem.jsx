import React from "react";
import './FileItem.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const FileItem = ({ file, removeFile }) => {
    return (
        <div className="file-item">
            <span className="file-name"><FontAwesomeIcon icon={faFileAlt}/> {file.name}</span>
            <button className="remove-button" onClick={() => removeFile(file.name)}>
                Remove
            </button>
        </div>  
    );
};

export default FileItem;
