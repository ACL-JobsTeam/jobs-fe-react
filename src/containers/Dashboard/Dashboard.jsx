import React from 'react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './column';


function EditorModal({ visibility, handleAddNewApp, setEditorVis, editorTargetData, editorType, handleRenameColumn, handleUpdateApp }) {
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
      console.log(editorTargetData);
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



export default function Dashboard() {
  const [columnsObject, setcolumnsObject] = useState(null);
  const [columnsIdArray, setcolumnsIdArray] = useState(null);
  const [jobApps, setJobApps] = useState(null);

  // Column Input State
  const [newColNameInput, setnewColNameInput] = useState('');
  // Editor modal state
  const [editorVis, setEditorVis] = useState('hidden');
  const [editorTargetData, setEditorTargetData] = useState(null);
  const [editorType, setEditorType] = useState('null');

  const handleModal = (data, type) => {
    setEditorVis('visible');
    setEditorType(type);
    setEditorTargetData(data);
  };

  // Update order of all columns.
  async function updateColumnOrder(updatedColumns){
    const postData = await fetch('http://localhost:7890/api/v1/columns/updatepositions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: updatedColumns })
    });
  }

  // Update applications array for one column.
  async function updateColumnApps(newArr, colId) {
    const data = await fetch('http://localhost:7890/api/v1/applications/updatecolapplications', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newArr, column: colId })
    });
    const jsonData = await data.json();
  }

  // Add single column.
  const handleAddColumn = async () => {
    const data = await fetch('http://localhost:7890/api/v1/columns/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        newColName: newColNameInput,
        colPos: columnsIdArray.length
      })
    });
    const jsonData = await data.json();
    const newColumn = jsonData[0];
    const { column_id } = newColumn;

    setcolumnsObject(prevObj => {
      return { ...prevObj, [column_id]: newColumn };
    });

    setcolumnsIdArray(prevArr => {
      return [...prevArr, `${column_id}`];
    });

  };

  // Delete single column.
  const handleDeleteColumn = async (columnId) => {
    const confirmDelete = confirm(
      `Are you SURE you want to delete column: ${columnsObject[columnId].name}? \nThis action cannot be undone and any applications within the column will be permanently removed.`
    );
    
    if(confirmDelete){
      const data = await fetch('http://localhost:7890/api/v1/columns/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columnId })
      });
      const jsonData = await data.json();

      setcolumnsIdArray(prevArr => {
        const position = prevArr.indexOf(jsonData[0].column_id);
        const copy = [...prevArr];
        copy.splice(position, 1);

        updateColumnOrder(copy);

        return copy;
      });
 
    }
  };

  // Rename column title.
  const handleRenameColumn = async (colId, newName) => {

    const data = await fetch('http://localhost:7890/api/v1/columns/rename', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newName, colId })
    });
    const jsonData = await data.json();

    const { name } = jsonData;


    setcolumnsObject(prevObj => {
      const copy = { ...prevObj };
      copy[colId].name = name;

      return copy;
    });



  };

  // Adds new application card to a swimlane.
  const handleAddNewApp = async (colId, title, company, jobUrl) => {

    const data = await fetch('http://localhost:7890/api/v1/applications/createnewapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ position: title, company, jobUrl })
    });
    const jsonData = await data.json();


    setcolumnsObject(prevObj => {
      const destinationColumn = prevObj[colId];

      const unmodifiedArr = destinationColumn.job_pos;
      
      const newArr = [...unmodifiedArr];
      newArr.splice(0, 0, jsonData.app_id);
    
      const newSubColumn = { ...destinationColumn, job_pos: newArr };
    
      // Update Server with new location!
      updateColumnApps(newArr, colId);

      return { ...prevObj, [colId]:newSubColumn };
    });

    setJobApps(prevObj => {
      const destinationArray = !prevObj[colId] ? [] : prevObj[colId];
    

      const newArr = [...destinationArray];
      newArr.splice(0, 0, jsonData);

      return { ...prevObj, [colId]: newArr };

    });
  };

  // Delete application card from a swimlane.
  const handleDeleteApp = async (appId, index, colId) => {
    const data = await fetch(`http://localhost:7890/api/v1/applications/deleteapp/${appId}`, {
      method: 'DELETE',
    });
    const jsonData = await data.json();

    setcolumnsObject(prevObj => {
      const modifiedColumn = prevObj[colId];

      const unmodifiedArr = modifiedColumn.job_pos;
      
      const newArr = [...unmodifiedArr];
      newArr.splice(index, 1);
    
      const newSubColumn = { ...modifiedColumn, job_pos: newArr };

      return { ...prevObj, [colId]:newSubColumn };
    });

    setJobApps(prevObj => {
      const modifiedArray = prevObj[colId];

      const newArr = [...modifiedArray];
      newArr.splice(index, 1);

      return { ...prevObj, [colId]: newArr };

    });

  };

  // Update details for an application card.
  const handleUpdateApp = async (colId, appId, title, company, jobUrl) => {

    const data = await fetch('http://localhost:7890/api/v1/applications/updateapp', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appId, position: title, company, jobUrl })
    });

    const jsonData = await data.json();


    setJobApps(prevObj => {
      const destinationArray = prevObj[colId];
    
      const newArr = [...destinationArray];
      newArr.splice(editorTargetData.index, 1, jsonData);

      return { ...prevObj, [colId]: newArr };

    });
  };


  // Required DragDropContext function. 
  function onDragEnd(result) {

    const { destination, source, draggableId, type } = result;

    // Do nothing if dropped outside droppable or in same column and same index.
    if(!destination || destination.droppableId === source.droppableId && destination.index === source.index) return;

    if(type === 'column') {
      const newColumnOrder = [...columnsIdArray];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      // Update state to new position array
      setcolumnsIdArray(newColumnOrder);
      // Send update to server
      updateColumnOrder(newColumnOrder);
      return;
    }

    if(type === 'app-list') {
      console.log('result', result);

      // If source and destination are the same.
      if(source.droppableId === destination.droppableId){
        setcolumnsObject(prevObj => {
          const destinationColumn = prevObj[destination.droppableId];

          const unmodifiedArr = destinationColumn.job_pos;
          
          const newArr = [...unmodifiedArr];
          newArr.splice(source.index, 1);
          newArr.splice(destination.index, 0, draggableId);
        
          const newSubColumn = { ...destinationColumn, job_pos: newArr };
        
          // Update Server with new location!
          updateColumnApps(newArr, destination.droppableId);

          return { ...prevObj, [destinationColumn.column_id]:newSubColumn };
        });

        setJobApps(prevObj => {
          const destinationArray = prevObj[destination.droppableId];
          const destIdArr = destinationArray.map(dragObj => String(dragObj.app_id));
          
          const position = destIdArr.indexOf(draggableId);

          const newArr = [...destinationArray];
          const item = newArr.splice(position, 1);
          newArr.splice(destination.index, 0, item[0]);

          return { ...prevObj, [destination.droppableId]: newArr };

        });

        return;
      }

      // If source and destination columns are not the same.
      if(source.droppableId !== destination.droppableId){
        setcolumnsObject(prevObj => {
          const sourceColumn = prevObj[source.droppableId];
          const destinationColumn = prevObj[destination.droppableId];

          const unmodifiedSrcArr = sourceColumn.job_pos;
          const unmodifiedDestArr = destinationColumn.job_pos;
          
          // Delete item from source array.
          const newSrcArr = [...unmodifiedSrcArr];
          newSrcArr.splice(source.index, 1);

          const newDestArr = [...unmodifiedDestArr];
          newDestArr.splice(destination.index, 0, draggableId);

          const newSourceColumn = { ...sourceColumn, job_pos: newSrcArr };
          const newDestinationColumn = { ...destinationColumn, job_pos: newDestArr };
        
          // Update Server with new location!
          updateColumnApps(newSrcArr, source.droppableId);
          updateColumnApps(newDestArr, destination.droppableId);

          // console.log({ ...prevObj, [sourceColumn.column_id]: newSourceColumn, [destinationColumn.column_id]: newDestinationColumn });
          return { ...prevObj, [sourceColumn.column_id]: newSourceColumn, [destinationColumn.column_id]: newDestinationColumn };
        });

        setJobApps(prevObj => {
          const sourceArray = prevObj[source.droppableId];

          // If JobApps has no key/array for the destination, generate one.
          const destinationArray = !prevObj[destination.droppableId] ? [] : prevObj[destination.droppableId];

          const srcIdArr = sourceArray.map(dragObj => String(dragObj.app_id));
          
          const position = srcIdArr.indexOf(draggableId);

          const newSrcArr = [...sourceArray];
          const newDestArr = [...destinationArray];

          const item = newSrcArr.splice(position, 1);
          newDestArr.splice(destination.index, 0, item[0]);

          return { ...prevObj, [destination.droppableId]: newDestArr, [source.droppableId]: newSrcArr };
        });

      }

    }
  }

  useEffect(() => {
    console.log('useeffect fired');
    // Reset inputs to empty on refresh.
    setnewColNameInput('');


    async function fetchColumns() {
      const data = await fetch('http://localhost:7890/api/v1/columns/getall');
      const jsonData = await data.json();
      // console.log('rawcols', jsonData);

      const columnObject = {};
      jsonData.forEach((column) => { 
        column.job_pos = column.job_pos.map(numId => String(numId));
        columnObject[column.column_id] = column; 
      });
      setcolumnsObject(columnObject);
      console.log('colobj', columnObject);

      const orderedColumnIds = Array(jsonData.length).fill(null);
      jsonData.forEach((column) => {orderedColumnIds.splice(column.col_position, 1, column.column_id);});
      setcolumnsIdArray(orderedColumnIds);
      console.log('colIDarr', orderedColumnIds);

      fetchApplications();
    }
    fetchColumns();

    async function fetchApplications() {
      const data = await fetch('http://localhost:7890/api/v1/applications/getapplications');
      const jsonData = await data.json();
      // console.log('rawjobs', jsonData);

      const jobsObject = {};
      jsonData.forEach((column) => { jobsObject[column.column_id] = column.jobs_list; });
      setJobApps(jobsObject);
      console.log('jobsobj', jobsObject);
    }


  }, []);

  // If all the data loads properly: no nulls.
  if(columnsObject && columnsIdArray && jobApps){
    return (
      <DragDropContext onDragEnd={onDragEnd}>

        <EditorModal 
          visibility={editorVis}
          setEditorVis={setEditorVis}
          editorTargetData={editorTargetData}
          editorType={editorType}
          handleRenameColumn={handleRenameColumn}
          handleAddNewApp={handleAddNewApp}
          handleUpdateApp={handleUpdateApp}
        />
        
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex' }}
            >
              {columnsIdArray.map((colId, index) => {
                const column = columnsObject[colId];
                const columnJobs = jobApps[colId];
                return (
                  <Column 
                    key={column.column_id} 
                    index={index} 
                    column={column} 
                    jobs={columnJobs} 
                    handleDeleteColumn={handleDeleteColumn}
                    handleModal={handleModal}
                    handleDeleteApp={handleDeleteApp}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <label htmlFor="col-new-input">Column Name</label>
        <input type="text" id="col-new-input" name="new-col-name" onChange={(e) => setnewColNameInput(e.target.value)}/>
        <button onClick={handleAddColumn}>ADD COLUMN</button>


      </DragDropContext>
    );
  }

  return <h1>LOADING</h1>;