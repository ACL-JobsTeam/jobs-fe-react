import React, { useEffect, useState } from 'react';

export default function EditorModal({ visibility, handleAddNewApp, setEditorVis, editorTargetData, editorType, handleRenameColumn, handleUpdateApp }) {
  const [colName, setColName] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const [appCompany, setAppCompany] = useState('');
  const [appUrl, setAppUrl] = useState('');

  const handleUpdateInput = (e) => {
    if(e.target.name === 'col-name'){
      setColName(e.target.value);
    }
    if(e.target.name === 'app-title'){
      setAppTitle(e.target.value);
    }
    if(e.target.name === 'app-position'){
      setAppCompany(e.target.value);
    }
    if(e.target.name === 'app-url'){
      setAppUrl(e.target.value);
    }

  };

  const handleAppSubmitClose = () => {
    handleAddNewApp(editorTargetData, appTitle, appCompany, appUrl);
    setEditorVis('hidden');
  };

  const handleAppUpdateSubmitClose = () => {
    const { app_id } = editorTargetData.job;
    const { column_id } = editorTargetData.column;
    handleUpdateApp(column_id, app_id, appTitle, appCompany, appUrl);
    setEditorVis('hidden');
  };

  const handleColumnSubmitClose = () => {
    const { column_id } = editorTargetData;
    handleRenameColumn(column_id, colName);
    setEditorVis('hidden');
  };

  useEffect(() => {
    // Empty all inputs on each refresh.
    setColName('');
    setAppTitle('');
    setAppCompany('');
    setAppUrl('');

    if(editorType === 'APPUPDATE'){
      const { company, position, job_url } = editorTargetData.job;
      setAppTitle(position);
      setAppCompany(company);
      setAppUrl(job_url);
    }

    if(editorType === 'COLUMN') {
      const { name } = editorTargetData;
      setColName(name);
    }

  }, [visibility]);

  if(editorType === 'NEWAPP' || editorType === 'APPUPDATE'){
    return (
      <div style={{ visibility, position: 'absolute', background: 'lightgreen' }}>
        <button onClick={() => setEditorVis('hidden')}>X</button>
        <section>
          Create new: {editorType}
        </section>
        <section>
          <label htmlFor="app-title-input">Title</label>
          <input type="text" id="app-title-input" name="app-title" 
            value={appTitle}
            onChange={handleUpdateInput}
            style={{ width: '120px' }}
          />
          <label htmlFor="app-com-input">Company</label>
          <input type="text" id="app-com-input" name="app-position"
            value={appCompany} 
            onChange={handleUpdateInput}
            style={{ width: '120px' }}
          />
          <label htmlFor="app-url-input">Lisiting URL</label>
          <input type="text" id="app-url-input" name="app-url" 
            value={appUrl} 
            onChange={handleUpdateInput}
            style={{ width: '120px' }}
          />
          {editorType === 'NEWAPP' ? 
            <button onClick={handleAppSubmitClose}>Create App</button> :
            <button onClick={handleAppUpdateSubmitClose}>Update App</button> 
          }
        </section>
      </div>
    );
  }

  if(editorType === 'COLUMN'){
    return (
      <div style={{ visibility, position: 'absolute', background: 'lightgreen' }}>
        <button onClick={() => setEditorVis('hidden')}>X</button>
        <section>Edit existing: {editorType}</section>
        <section>
          <p>Update Column Name</p>
          <label htmlFor="col-name-input">Name</label>
          <input type="text" id="col-name-input" name="col-name" 
            value={colName}
            onChange={handleUpdateInput}
            style={{ width: '120px' }}
          />
          <button onClick={handleColumnSubmitClose}>Rename Column</button>
        </section>
      </div>
    );
  }

  return null;
}
