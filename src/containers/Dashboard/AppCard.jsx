import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function AppCard({ job, index, handleDeleteApp, handleModal  }){
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
            <button onClick={() => handleDeleteApp(job.app_id, index, column.column_id)}>delete</button>
            <button onClick={() => handleModal({ job, column, index }, 'APPUPDATE')}>update</button>
            <p>{job.app_id}</p>
            <p>{job.position}</p>
            <p>{job.company}</p>
            <p>{job.job_url}</p>

          </div>
        );
      }}
    </Draggable>
  );
}
