import React from 'react';
import Column from './Column';

export default function ColumnsList({
  columnsObject,
  jobApps,
  columnsIdArray,
  handleDeleteColumn,
  handleModal,
  handleDeleteApp,
}) {
  return columnsIdArray.map((colId, index) => {
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
  });
}
