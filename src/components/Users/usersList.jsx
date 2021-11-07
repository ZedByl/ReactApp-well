import React, {useEffect, useState} from 'react';
import _ from 'lodash'

import Pagination from '../Pagination/pagination';
import {paginate} from '../../utils/paginate';
import UsersTable from "../UsersTable/usersTable";
import api from "../../api";
import SearchStatus from "../SearchStatus/searchStatus";
import GroupList from "../GroupList/groupList";
import Loader from "../Loader";
import Search from "../Search/search";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [selectedProf, setSelectedProf] = useState()
    const [professions, setProfessions] = useState([])
    const [searchByName, setSearchByName] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
    const pageSize = 4

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data))
        api.professions.fetchAll().then(data => setProfessions(data))
    }, [])

    if (!users.length) {
        return <Loader/>
    }

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {...user, bookmark: !user.bookmark};
                }
                return user;
            })
        );
    };

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const onChangeInput = (value = '') => {
        setSelectedProf()
        setSearchByName(value)
    }

    const filteredUsers = searchByName ? users.filter(user => user.name.toLowerCase().includes(searchByName.toLowerCase()))
        : selectedProf ? users.filter((user) => user.profession.name === selectedProf) : users
    const usersLength = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersAll = paginate(sortedUsers, currentPage, pageSize)

    return (
        <div className="wrapper">
            <div className="wrapper__header">
                <h2>
                    <SearchStatus number={filteredUsers.length}/>
                </h2>
                <Search onChange={onChangeInput}/>
            </div>
            <div className="wrapper__body">
                <div className="wrapper__body-filters">
                    <GroupList
                        selectedItem={selectedProf}
                        setSelectedProf={setSelectedProf}
                        items={professions}
                    />
                </div>
                <div className="wrapper__body-users">
                    <UsersTable
                        users={usersAll}
                        deleteUser={handleDelete}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onToggleBookMark={handleToggleBookMark}
                    />
                    <Pagination
                        users={usersLength}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
};

export default UsersList;