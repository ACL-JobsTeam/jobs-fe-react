import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function AppCard({ job, index, column, handleDeleteApp, handleModal  }){
  return (
    <Draggable draggableId={`${job.app_id}`} key={job.app_id} index={index}>
      {provided => {
        const style = {
          border: '1px solid black',
          height: '140px',
          ...provided.draggableProps.style,
        };
        return (
          <div 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            style={style}
            ref={provided.innerRef} 
          >
            <button 
              onClick={() => handleDeleteApp(
                job.app_id, index, column.column_id
              )}
            >
              del-app
            </button>
            <button 
              onClick={() => handleModal(
                { job, column, index }, 'APPUPDATE'
              )}
            >
              upd-app
            </button>

            <p>{job.app_id}-{job.position}</p>
            <p>{job.company}</p>
            <p>
              <a href={job.job_url} 
                target="_blank" 
                rel="noreferrer"
              >
                {job.job_url}
              </a>
            </p>

          </div>
        );
      }}
    </Draggable>
  );
}
