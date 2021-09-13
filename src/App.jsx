import './index.css'
import Users from "./components/users";
import React, {useState} from "react";
import api from "./API";
import SearchStatus from '../src/components/searchStatus'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  return (
    <>
      <div className="wrapper">
        <div>
          <div>
            <h2>
              <SearchStatus number={users.length} />
            </h2>
          </div>
          {users.length === 0 ?
            <table></table>
            :
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
              </tr>
              </thead>
                <Users
                  users={users}
                  setUsers={setUsers}
                />
            </table>}
        </div>
      </div>
    </>
  );
}

export default App;
