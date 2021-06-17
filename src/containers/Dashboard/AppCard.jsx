import { Button, ButtonGroup, Card, Typography } from '@material-ui/core';

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
      {(provided) => {
        const style = {
          display: 'flex', 
          justifyContent:'space-between', 
          padding: '5px',
          marginBottom: '5px',
          ...provided.draggableProps.style
        };

        return (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={style}
          >
            <section>
              <Typography
                variant='h6'
              >
                {job.position}
              </Typography>
              <Typography>
                {job.company}
              </Typography>
              {job.app_id}
            </section>

            <ButtonGroup 
              color="primary" 
              variant="outlined"
              size="small" 
              orientation="vertical"
            >
              <Button 
                aria-label="Delete Application Card"
                onClick={() => handleDeleteApp(job.app_id, index, column.column_id)}
              >
                  Delete
              </Button>
              <Button 
                aria-label="Update Application Card"
                onClick={() => handleModal({ job, column, index }, 'APPUPDATE')}
              >
                  Update
              </Button>
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
            </ButtonGroup>
        
          </Card>

        );
      }}
    </Draggable>
  );
}
