export async function fetchUserColumns() {
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/columns/getall`, 
    {
      method: 'GET',
      credentials: 'include',
    });
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchUserApplications() {
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/applications/getapplications`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchUpdateColumnOrder(updatedColumns) {
  const postData = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/columns/updatepositions`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ data: updatedColumns }),
    }
  );
  const jsonData = await postData.json();

  return jsonData;
}

export async function fetchHandleAddColumn(newColNameInput, columnsIdArray) {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/columns/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      newColName: newColNameInput,
      colPos: columnsIdArray.length,
    }),
  });
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchHandleDeleteColumn(columnId) {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/columns/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ columnId }),
  });
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchHandleRenameColumn(colId, newName) {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/columns/rename`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ newName, colId }),
  });
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchUpdateColumnApps(newArr, colId) {
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/applications/updatecolapplications`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ newArr, column: colId }),
    }
  );
  const jsonData = await data.json();
  // Fixed return
  return jsonData;
}

export async function fetchHandleAddNewApp(title, company, jobUrl) {
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/applications/createnewapp`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ position: title, company, jobUrl }),
    }
  );
  const jsonData = await data.json();

  return jsonData;
}

export async function fetchHandleDeleteApp(appId){
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/applications/deleteapp/${appId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );
  const jsonData = await data.json();
  
  return jsonData;
}

export async function fetchHandleUpdateApp(appId, title, company, jobUrl) {
  const data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/applications/updateapp`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ appId, position: title, company, jobUrl }),
    }
  );

  const jsonData = await data.json();

  return jsonData;
}