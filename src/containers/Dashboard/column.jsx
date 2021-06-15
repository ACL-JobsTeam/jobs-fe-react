/* eslint-disable max-len */
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';




export default function Column({ 
  column, 
  index, 
  jobs, 
  handleDeleteColumn, 
  handleDeleteApp,
  handleModal
}) {

  return (
    <Draggable draggableId={`${column.column_id}`} index={index}>
      {(provided, snapshot) => {
        const style = {
          border: '1px solid black',
          height: '800px',
          width: '150px',
          margin: '5px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          ...provided.draggableProps.style,
        };
        return (
          <div 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            style={style}
            ref={provided.innerRef} 
          >
            <section>
              <button onClick={() => handleDeleteColumn(column.column_id)}>del col</button>
              <button onClick={() => handleModal(column, 'COLUMN')}>edit Col</button>
              
              <p style={{ background: snapshot.isDragging ? 'red' : 'white' }}>
                {column.name}-{column.column_id}
              </p>

              <button onClick={() => handleModal(column.column_id, 'NEWAPP')}>New App</button>
            </section>

            <Droppable
              droppableId={column.column_id}
              direction= "vertical"
              type="app-list"
            >
              {(provided) => {
                const style = {
                  border: '1px solid purple',
                  minHeight: '300px',
                  ...provided.droppableProps.style,
                };
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={style}
                  >

                    {jobs && jobs.map((job, index) => {
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
                    
                    })}

                    {!jobs && <p>---No jobs---</p>}

                    {/* Required by RBDnD Library */}
                    {provided.placeholder}
                  </div>
                );}}

            </Droppable>




            
          </div>
        );
      }}
    </Draggable>
  );
  
}
