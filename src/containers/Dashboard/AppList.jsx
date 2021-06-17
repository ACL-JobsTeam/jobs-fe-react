import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AppCard from './AppCard';

export default function AppList({
  column,
  jobs,
  handleDeleteApp,
  handleModal,
}) {
  return (
    <Droppable
      droppableId={column.column_id}
      direction="vertical"
      type="app-list"
    >
      {(provided, snapshot) => {
        const style = {
          height: '68vh',
          marginTop: '10px',
          backgroundColor: snapshot.isDraggingOver ? 'lightgrey' : 'white',
          ...provided.droppableProps.style,
        };
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
          >
            {jobs &&
              jobs.map((job, index) => {
                return (
                  <AppCard
                    key={job.app_id}
                    job={job}
                    index={index}
                    column={column}
                    handleDeleteApp={handleDeleteApp}
                    handleModal={handleModal}
                  />
                );
              })}

            {!jobs && <p>---No jobs---</p>}

            {/* Required by RBDnD Library */}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}
