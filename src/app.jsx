import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './index.scss';

export default function App() {
  const viewerDiv = useRef();

  const handleClick = () => {
    electron.notificationApi.sendNotification('Notification');
  };

  const handleChange = (event) => {
    console.log(event);
    const [file] = event.target.files;
    if (!file) {
      alert('NO FILE SELECTED');
    }

    electron.filesApi.openFile(file.path);
  };

  return (
    <div className="app">
      <h1>Awrite Bawbag</h1>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
      <input type="file" onChange={handleChange} />
    </div>
  );
}
