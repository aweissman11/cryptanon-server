import React from 'react';

const UserEndpoints = () => {
  return(


    <div className="endpoint-responses">
      <div className="endpoint">
        <h5>To create a user make a POST REQUEST </h5>
        <h5>Include a body: </h5>
        <pre>{JSON.stringify({ username: 'John Denver', password: 'fnioew8332' }, null, 2) }</pre>
      </div>

      <div className="endpoint">
        <h5>To change a password for a specific user make a PATCH REQUEST</h5>
        <h5>Include a body: </h5>
        <pre>{JSON.stringify({ username: 'John Doe Denver' }, null, 2) }</pre>
      </div>

      <div className="endpoint">
        <h5>To change a username for a specific user make a PATCH REQUEST </h5>
        <h5>Include a body: </h5>
        <pre>{JSON.stringify({ password: "fjljjfs12312" }, null, 2) }</pre>
      </div>

      <div className="endpoint">
        <h5>To delete a specific user make a DELETE REQUEST </h5>
        <h5>Include a body: </h5>
        <pre>{JSON.stringify({ password: "fjljjfs12312" }, null, 2) }</pre>
      </div>

      <div className="endpoint">
        <h5>To add a favorite cryptocurrency to a user make a POST REQUEST </h5>
        <h5>Include a body: </h5>
        <pre>{JSON.stringify({ user_id: 1, asset_id: 1 }, null, 2) }</pre>
      </div>

      <div className="endpoint">
        <h5>To delete a favorite cryptocurrency for a user make a DELETE REQUEST  </h5>
      </div>

      <div className="endpoint">
        <h5>To get ALL favorites for a user make a GET REQUEST  </h5>
      </div>
    </div>

  );
}

export default UserEndpoints;