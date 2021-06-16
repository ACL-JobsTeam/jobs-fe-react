import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AppList from './AppList';

export default function Column({
  column,
  index,
  jobs,
  handleDeleteColumn,
  handleDeleteApp,
  handleModal,
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
              <button 
                onClick={() => handleDeleteColumn(column.column_id)}
                aria-label="Delete Column"
              >
                -
              </button>
              <button 
                onClick={() => handleModal(column, 'COLUMN')}
                aria-label="Edit Column"
              >
                E
              </button>

              <p style={{ background: snapshot.isDragging ? 'red' : 'white' }}>
                {column.name}-{column.column_id}
              </p>

              <button 
                onClick={() => handleModal(column.column_id, 'NEWAPP')}
                aria-label="Add Application Card"
              >
                + App
              </button>
            </section>

            <AppList
              column={column}
              jobs={jobs}
              handleDeleteApp={handleDeleteApp}
              handleModal={handleModal}
            />
          </div>
        );
      }}
    </Draggable>
  );
}
