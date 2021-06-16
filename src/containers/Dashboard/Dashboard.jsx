/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  parseNewApplicationsObject,
  parseNewColumnArray,
  parseNewColumnObject,
} from '../../utils/dashboard/dataUtils';
import {
  fetchUserApplications,
  fetchUserColumns,
} from '../../utils/dashboard/fetchUtils';

import ColumnsList from './ColumnsList';
import EditorModal from './EditorModal';

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

  // Update order of all columns.  +CREDS +RESPMOD
  const updateColumnOrder = async (updatedColumns) => {
    const postData = await fetch(
      'http://localhost:7890/api/v1/columns/updatepositions',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data: updatedColumns }),
      }
    );
    const jsonData = await postData.json();

    if (jsonData.updated === Object.keys(columnsObject).length) {
      return true;
    }
  };

  // Add single column. +CREDS +RESP
  const handleAddColumn = async () => {
    const data = await fetch('http://localhost:7890/api/v1/columns/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        newColName: newColNameInput,
        colPos: columnsIdArray.length,
      }),
    });
    const jsonData = await data.json();

    if (jsonData) {
      const newColumn = jsonData[0];
      const { column_id } = newColumn;

      setcolumnsObject((prevObj) => {
        return { ...prevObj, [column_id]: newColumn };
      });

      setcolumnsIdArray((prevArr) => {
        return [...prevArr, `${column_id}`];
      });
    }
  };

  // Delete single column. +CREDS +RESP
  const handleDeleteColumn = async (columnId) => {
    const confirmDelete = confirm(
      `Are you SURE you want to delete column: ${columnsObject[columnId].name}? 
      \nThis action cannot be undone. 
      \nApplications within the column will be permanently removed.`
    );

    if (confirmDelete) {
      const data = await fetch('http://localhost:7890/api/v1/columns/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ columnId }),
      });
      const jsonData = await data.json();

      if (jsonData) {
        setcolumnsIdArray((prevArr) => {
          const position = prevArr.indexOf(jsonData[0].column_id);
          const copy = [...prevArr];
          copy.splice(position, 1);

          updateColumnOrder(copy);

          return copy;
        });
      }
    }
  };

  // Rename column title.  +CREDS +RESP
  const handleRenameColumn = async (colId, newName) => {
    const data = await fetch('http://localhost:7890/api/v1/columns/rename', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ newName, colId }),
    });
    const jsonData = await data.json();

    if (jsonData) {
      const { name } = jsonData;

      setcolumnsObject((prevObj) => {
        const copy = { ...prevObj };
        copy[colId].name = name;

        return copy;
      });
    }
  };

  // Update applications array for one column. +CREDS
  const updateColumnApps = async (newArr, colId) => {
    const data = await fetch(
      'http://localhost:7890/api/v1/applications/updatecolapplications',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newArr, column: colId }),
      }
    );
    const jsonData = await data.json();
  };

  // Adds new application card to a swimlane. +CREDS +RESP
  const handleAddNewApp = async (colId, title, company, jobUrl) => {
    const data = await fetch(
      'http://localhost:7890/api/v1/applications/createnewapp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ position: title, company, jobUrl }),
      }
    );
    const jsonData = await data.json();

    if (jsonData) {
      setcolumnsObject((prevObj) => {
        const destinationColumn = prevObj[colId];

        const unmodifiedArr = destinationColumn.job_pos;

        const newArr = [...unmodifiedArr];
        newArr.splice(0, 0, jsonData.app_id);

        const newSubColumn = { ...destinationColumn, job_pos: newArr };

        // Update Server with new location!
        updateColumnApps(newArr, colId);

        return { ...prevObj, [colId]: newSubColumn };
      });

      setJobApps((prevObj) => {
        const destinationArray = !prevObj[colId] ? [] : prevObj[colId];

        const newArr = [...destinationArray];
        newArr.splice(0, 0, jsonData);

        return { ...prevObj, [colId]: newArr };
      });
    }
  };

  // Delete application card from a swimlane. +CREDS +RESP
  const handleDeleteApp = async (appId, index, colId) => {
    const data = await fetch(
      `http://localhost:7890/api/v1/applications/deleteapp/${appId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    const jsonData = await data.json();

    if (jsonData) {
      setcolumnsObject((prevObj) => {
        const modifiedColumn = prevObj[colId];

        const unmodifiedArr = modifiedColumn.job_pos;

        const newArr = [...unmodifiedArr];
        newArr.splice(index, 1);

        updateColumnApps(newArr, colId);

        const newSubColumn = { ...modifiedColumn, job_pos: newArr };

        return { ...prevObj, [colId]: newSubColumn };
      });

      setJobApps((prevObj) => {
        const modifiedArray = prevObj[colId];

        const newArr = [...modifiedArray];
        newArr.splice(index, 1);

        return { ...prevObj, [colId]: newArr };
      });
    }
  };

  // Update details for an application card. +CREDS +RESP
  const handleUpdateApp = async (colId, appId, title, company, jobUrl) => {
    const data = await fetch(
      'http://localhost:7890/api/v1/applications/updateapp',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ appId, position: title, company, jobUrl }),
      }
    );

    const jsonData = await data.json();

    if (jsonData) {
      setJobApps((prevObj) => {
        const destinationArray = prevObj[colId];

        const newArr = [...destinationArray];
        newArr.splice(editorTargetData.index, 1, jsonData);

        return { ...prevObj, [colId]: newArr };
      });
    }
  };

  // Required DragDropContext function.
  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    // Do nothing if dropped outside droppable or in same column and same index.
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (type === 'column') {
      const newColumnOrder = [...columnsIdArray];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      // Update state to new position array
      setcolumnsIdArray(newColumnOrder);
      // Send update to server
      updateColumnOrder(newColumnOrder);
      return;
    }

    if (type === 'app-list') {
      // If source and destination are the same.
      if (source.droppableId === destination.droppableId) {
        setcolumnsObject((prevObj) => {
          const destinationColumn = prevObj[destination.droppableId];

          const unmodifiedArr = destinationColumn.job_pos;

          const newArr = [...unmodifiedArr];
          newArr.splice(source.index, 1);
          newArr.splice(destination.index, 0, draggableId);

          const newSubColumn = { ...destinationColumn, job_pos: newArr };

          // Update Server with new location!
          updateColumnApps(newArr, destination.droppableId);

          return { ...prevObj, [destinationColumn.column_id]: newSubColumn };
        });

        setJobApps((prevObj) => {
          const destinationArray = prevObj[destination.droppableId];
          const destIdArr = destinationArray.map((dragObj) =>
            String(dragObj.app_id)
          );

          const position = destIdArr.indexOf(draggableId);

          const newArr = [...destinationArray];
          const item = newArr.splice(position, 1);
          newArr.splice(destination.index, 0, item[0]);

          return { ...prevObj, [destination.droppableId]: newArr };
        });

        return;
      }

      // If source and destination columns are not the same.
      if (source.droppableId !== destination.droppableId) {
        setcolumnsObject((prevObj) => {
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
          const newDestinationColumn = {
            ...destinationColumn,
            job_pos: newDestArr,
          };

          // Update Server with new location!
          updateColumnApps(newSrcArr, source.droppableId);
          updateColumnApps(newDestArr, destination.droppableId);

          return {
            ...prevObj,
            [sourceColumn.column_id]: newSourceColumn,
            [destinationColumn.column_id]: newDestinationColumn,
          };
        });

        setJobApps((prevObj) => {
          const sourceArray = prevObj[source.droppableId];

          // If JobApps has no key/array for the destination, generate one.
          const destinationArray = !prevObj[destination.droppableId]
            ? []
            : prevObj[destination.droppableId];

          const srcIdArr = sourceArray.map((dragObj) => String(dragObj.app_id));

          const position = srcIdArr.indexOf(draggableId);

          const newSrcArr = [...sourceArray];
          const newDestArr = [...destinationArray];

          const item = newSrcArr.splice(position, 1);
          newDestArr.splice(destination.index, 0, item[0]);

          return {
            ...prevObj,
            [destination.droppableId]: newDestArr,
            [source.droppableId]: newSrcArr,
          };
        });
      }
    }
  }

  useEffect(() => {
    // Get columns for the JWT user +CREDS
    async function fetchAndModifyColumns() {
      const jsonData = await fetchUserColumns();

      const columnObject = parseNewColumnObject(jsonData);
      setcolumnsObject(columnObject);

      const orderedColumnIds = parseNewColumnArray(jsonData);
      setcolumnsIdArray(orderedColumnIds);
    }

    // Get applications for the JWT user +CREDS
    async function fetchAndModifyApplications() {
      const jsonData = await fetchUserApplications();

      const jobsObject = parseNewApplicationsObject(jsonData);
      setJobApps(jobsObject);
    }

    // Reset input to empty on refresh
    // Fetch Columns and Applications for User.
    setnewColNameInput('');
    fetchAndModifyColumns();
    fetchAndModifyApplications();

  }, []);

  // If all the data loads:
  if(columnsObject && columnsIdArray && jobApps) {
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
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <ColumnsList
                columnsObject={columnsObject}
                jobApps={jobApps}
                columnsIdArray={columnsIdArray}
                handleDeleteColumn={handleDeleteColumn}
                handleModal={handleModal}
                handleDeleteApp={handleDeleteApp}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <label htmlFor="col-new-input">Column Name</label>
        <input
          type="text"
          id="col-new-input"
          name="new-col-name"
          onChange={(e) => setnewColNameInput(e.target.value)}
        />
        <button onClick={handleAddColumn}>ADD COLUMN</button>
      </DragDropContext>
    );
  }

  return <h1>L O A D I N G</h1>;
}
