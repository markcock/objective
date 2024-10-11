import React from "react";
import FileItem from "./../FileItem/FileItem"; // Ensure the path is correct

const Filelist = ({ files, removeFile }) => {
    return (
        <ul className="file-list">
            {files.length === 0 ? (
                <li>No files uploaded yet.</li>
            ) : (
                files.map(file => (
                    <FileItem 
                        key={file.name} 
                        file={file} 
                        removeFile={removeFile} 
                    />
                ))
            )}
        </ul>
    );
}

export default Filelist;
