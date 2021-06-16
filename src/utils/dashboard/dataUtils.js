export function parseNewColumnObject(jsonData) {
  const columnObject = {};

  jsonData.forEach((column) => {
    column.job_pos = column.job_pos.map((numId) => String(numId));
    columnObject[column.column_id] = column;
  });

  return columnObject;
}

export function parseNewColumnArray(jsonData) {
  const orderedColumnIds = Array(jsonData.length).fill(null);

  jsonData.forEach((column) => {
    orderedColumnIds.splice(column.col_position, 1, column.column_id);
  });

  return orderedColumnIds;
}

export function parseNewApplicationsObject(jsonData) {
  const jobsObject = {};
  jsonData.forEach((column) => {
    jobsObject[column.column_id] = column.jobs_list;
  });

  return jobsObject;
}