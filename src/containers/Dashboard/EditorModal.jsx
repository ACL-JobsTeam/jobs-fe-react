import { Button, Card, Modal, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function EditorModal({
  editorVis,
  handleAddNewApp,
  setEditorVis,
  editorTargetData,
  editorType,
  handleRenameColumn,
  handleUpdateApp,
}) {
  const [colName, setColName] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const [appCompany, setAppCompany] = useState('');
  const [appUrl, setAppUrl] = useState('');

  const handleUpdateInput = (e) => {
    if(e.target.name === 'col-name') {
      setColName(e.target.value);
    }
    if(e.target.name === 'app-title') {
      setAppTitle(e.target.value);
    }
    if(e.target.name === 'app-position') {
      setAppCompany(e.target.value);
    }
    if(e.target.name === 'app-url') {
      setAppUrl(e.target.value);
    }
  };

  const handleAppSubmitClose = () => {
    handleAddNewApp(editorTargetData, appTitle, appCompany, appUrl);
    setEditorVis(false);
  };

  const handleAppUpdateSubmitClose = () => {
    const { app_id } = editorTargetData.job;
    const { column_id } = editorTargetData.column;
    handleUpdateApp(column_id, app_id, appTitle, appCompany, appUrl);
    setEditorVis(false);
  };

  const handleColumnSubmitClose = () => {
    const { column_id } = editorTargetData;
    handleRenameColumn(column_id, colName);
    setEditorVis(false);
  };

  useEffect(() => {
    // Empty all inputs on each refresh.
    setColName('');
    setAppTitle('');
    setAppCompany('');
    setAppUrl('');

    if(editorType === 'APPUPDATE') {
      const { company, position, job_url } = editorTargetData.job;
      setAppTitle(position);
      setAppCompany(company);
      setAppUrl(job_url);
    }

    if(editorType === 'COLUMN') {
      const { name } = editorTargetData;
      setColName(name);
    }
  }, [editorVis]);

  if(editorType === 'NEWAPP' || editorType === 'APPUPDATE') {
    return (
      <Modal
        open={editorVis}
      >
        <Card style={{
          outline: 0,
          position: 'absolute',
          width: '50vw',
          top: '20vh',
          left: '25vw',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            color="secondary"
            onClick={() => setEditorVis(false)}
          >
            Close
          </Button>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
            >
              {editorType === 'NEWAPP' ? 'Add New App' : 'Update App'}
            </Typography>

            <br />
            <TextField
              variant="outlined"
              id="app-title-input"
              name="app-title"
              label="Label"
              value={appTitle}
              onChange={handleUpdateInput}
              style={{ width: '40vw' }}
            >
            </TextField>
            <br />
            <TextField
              variant="outlined"
              id="app-com-input"
              name="app-position"
              label="Company"
              value={appCompany}
              onChange={handleUpdateInput}
              style={{ width: '40vw' }}
            >
            </TextField>
            <br />
            <TextField
              variant="outlined"
              id="app-url-input"
              name="app-url"
              label="Posting URL"
              value={appUrl}
              onChange={handleUpdateInput}
              style={{ width: '40vw' }}
            >
            </TextField>

            {editorType === 'NEWAPP' ? (
              <Button 
                color="primary"
                onClick={handleAppSubmitClose}
              >
                Create App
              </Button>
            ) : (
              <Button 
                color="primary" 
                onClick={handleAppUpdateSubmitClose}
              >
                Update App
              </Button>
            )}
          </section>

        </Card>
      </Modal>
    );
  }

  if(editorType === 'COLUMN') {
    return (
      <Modal
        open={editorVis}
      >
        <Card style={{
          outline: 0,
          position: 'absolute',
          width: '50vw',
          top: '20vh',
          left: '25vw',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            color="secondary"
            onClick={() => setEditorVis(false)}
          >
            Close
          </Button>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
            >
              Update Column: {colName}
            </Typography>
            <br />
            <TextField
              variant="outlined"
              id="col-name-input"
              name="col-name"
              label="Updated Name"
              value={colName}
              onChange={handleUpdateInput}
            >
            </TextField>

            <Button 
              color="primary"
              onClick={handleColumnSubmitClose}
            >
              Submit
            </Button>
          </section>

        </Card>
      </Modal>
    );
  }

  return null;
}
