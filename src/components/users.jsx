import React, {useState} from 'react';
import PropTypes from 'prop-types'
import User from './user';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';

const Users = ({users, setUsers}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const usersLength = users.length
  const pageSize = 4
  const usersAll = paginate(users, currentPage, pageSize)

  const handleDeleteUser = (e) => {
    const user = e.target.getAttribute('id')
    setUsers(users.filter(item => item._id !== user))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col" />
        </tr>
        </thead>
        <tbody>
        {usersAll.map((user) =>
          <tr key={user._id}>
            <User
              name={user.name}
              qualities={user.qualities}
              profession={user.profession.name}
              completedMeetings={user.completedMeetings}
              rate={user.rate}
            />
            <td>
              <button
                id={user._id}
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteUser}>
                Удалить
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
      <Pagination
        users={usersLength}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  setUsers: PropTypes.func,
}

export default Users;