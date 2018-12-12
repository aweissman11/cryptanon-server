import React from 'react';

const EndpointResponses = () => {
  return(
    <div className="user-endpoints">
      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/users</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ 'id': 1, 'username': 'Bitcoin', }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/users/username/1</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ "id": 1, }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/users/username/1</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ "id": 1, }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/users/username/1</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ "message": "user 1 deleted", }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/favorites</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ user_id: 1, asset_id: 1 }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/favorites/1</p>
        <h4>Response</h4>
        <pre>{JSON.stringify({ message: "favorite 1 deleted" }, null, 2) }</pre>
      </div>

      <div className="response">
        <h4>Example</h4>
        <p>http://cryptanon-server.herokuapp.com/api/v1/favorites/1</p>
        <h4>Response</h4>
        <pre>{JSON.stringify([ { user_id: 1, asset_id: 1 }], null, 2) }</pre>
      </div>
    </div>

  );
}

export default EndpointResponses;


