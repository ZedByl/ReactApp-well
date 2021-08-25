import React, {useState} from 'react';
import api from '../API'
import '../index.css'


const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDeleteUser = (e) => {
    const user = e.target.getAttribute('id')
    setUsers(users.filter(item => item._id !== user))
  }

  const renderPhrase = (number) => {
    if (number > 4 || number === 1) {
      return <span className="badge bg-primary">{number} человек хочет с тобой тусануть</span>
    } else if (number <= 4 && number !== 0) {
      return <span className="badge bg-primary">{number} человека хочет с тобой тусануть</span>
    } else if (number === 0) {

      return <span className="badge bg-danger">Сори брат с тобой не тусанут</span>
    }
  }


  return (
    <div>
      <div>
        <h2>
          {renderPhrase(users.length)}
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
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) =>
          <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td>{user.qualities.map((qualitie) =>
              <span key={qualitie._id} className={`badge bg-` + qualitie.color}>{qualitie.name}</span>
            )}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <button id={user._id} type="button" className="btn btn-danger" onClick={handleDeleteUser}>Удалить</button>
            </td>
          </tr>
        )}
        </tbody>
      </table>}
    </div>
  );
};

export default Users;