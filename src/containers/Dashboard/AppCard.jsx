import { Button, ButtonGroup, Card, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

export default function AppCard({
  job,
  index,
  column,
  handleDeleteApp,
  handleModal,
}) {
  return (
    <Draggable draggableId={`${job.app_id}`} key={job.app_id} index={index}>
      {(provided, snapshot) => {
        const style = {
          display: 'flex', 
          justifyContent:'space-between', 
          padding: '5px',
          marginBottom: '5px',
          background: snapshot.isDragging ? '#77DAFF' : 'white',
          ...provided.draggableProps.style
        };

        return (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={style}
          >
            <section style={{ padding: '5px' }}>
              <Typography
                variant='subtitle2'
              >
                {job.position}
              </Typography>
              <Typography
                variant='subtitle2'
              >
                {job.company}
              </Typography>
            </section>

            <ButtonGroup 
              color="primary" 
              variant="outlined"
              size="small" 
              orientation="vertical"
            >
              <Button>
                <Link
                  style={{ textDecoration: 'none' }} 
                  to={`/details/${job.app_id}`}>Details</Link>
              </Button>
              <Button>
                <a 
                  href={job.job_url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }} 
                >
                  Posting
                </a>
              </Button>
              <ButtonGroup 
                color="primary" 
                variant="outlined"
                size="small" 
              >
                <Button 
                  aria-label="Delete Application Card"
                  onClick={() => handleDeleteApp(job.app_id, index, column.column_id)}
                >
                  <DeleteIcon fontSize="small" /> 
                </Button>
                <Button 
                  aria-label="Update Application Card"
                  onClick={() => handleModal({ job, column, index }, 'APPUPDATE')}
                >
                    <BuildIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </ButtonGroup>
        
          </Card>

        );
      }}
    </Draggable>
  );
}
