import React, { useState } from 'react';
import Users from './components/users';
import api from './API';
import SearchStatus from './components/searchStatus';
import './index.css';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  return (
    <>
      <div className="wrapper">
        <h2>
          <SearchStatus number={users.length} />
        </h2>
        {users.length === 0 ?
          <table />
          : <Users
            users={users}
            setUsers={setUsers}
          />
        }
      </div>
    </>
  );
}

export default App;
