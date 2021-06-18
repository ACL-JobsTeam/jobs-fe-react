import { Button, ButtonGroup, Card, Divider, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BuildIcon from '@material-ui/icons/Build';
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
          height: '80vh',
          width: '15vw',
          margin: '5px',
          padding: '10px',
          overflowY: 'auto',
          overflowX: 'hidden',
          ...provided.draggableProps.style,
        };
        return (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
            ref={provided.innerRef}
          >
            <div
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '10vh'
              }}
            >
              <ButtonGroup 
                color="primary" 
                variant="outlined"
                size="small"
                style={{ alignSelf: 'flex-end' }}
              >
                <Button 
                  onClick={() => handleDeleteColumn(column.column_id)}
                  aria-label="Delete Column"
                  disabled={column.is_archive ? true : false}
                >
                  <DeleteIcon fontSize="small" /> 
                </Button>
                <Button 
                  onClick={() => handleModal(column, 'COLUMN')}
                  aria-label="Edit Column"
                >
                  <BuildIcon fontSize="small" />
                </Button>
              </ButtonGroup>


              <Typography 
                variant="h5"
                align="center"
              >
                {column.name}
              </Typography>
                            
              <IconButton
                onClick={() => handleModal(column.column_id, 'NEWAPP')}
                aria-label="Add Application Card"
              >
                <AddCircleIcon fontSize="small" />
              </IconButton>

            </div>
            
            <Divider />

            <AppList
              column={column}
              jobs={jobs}
              handleDeleteApp={handleDeleteApp}
              handleModal={handleModal}
            />
          </Card>
        );
      }}
    </Draggable>
  );
}
