import React from 'react';
import '../index.css'
import User from "./user";


const Users = ({users, setUsers}) => {

  const handleDeleteUser = (e) => {
    const user = e.target.getAttribute('id')
    setUsers(users.filter(item => item._id !== user))
  }

  return (
    <tbody>
      {users.map((user) =>
        <tr key={user._id}>
          <User
            name={user.name}
            qualities={user.qualities}
            profession={user.profession.name}
            completedMeetings={user.completedMeetings}
            rate={user.rate}
          />
          <td>
            <button id={user._id} type="button" className="btn btn-danger" onClick={handleDeleteUser}>Удалить</button>
          </td>
        </tr>
      )}
    </tbody>

  );
};

export default Users;