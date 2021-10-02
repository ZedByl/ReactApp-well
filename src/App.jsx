import React, {useState, useEffect} from 'react';
import Users from './components/Users/users';
import api from './api';
import SearchStatus from './components/SearchStatus/searchStatus';
import './index.css';
import GroupList from "./components/GroupList/groupList";

function App() {
    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
        api.users.fetchAll().then(data => setUsers(data))
    }, [])

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item)
    }

    const clearFilter = () => {
        setSelectedProf()
    }

    const filteredUsers = selectedProf ? users.filter((user) => user.profession.name === selectedProf) : users

    return (
        <>
            {users &&
            <div className="wrapper">
                <div className="wrapper__header">
                    <h2>
                        <SearchStatus number={filteredUsers.length}/>
                    </h2>
                </div>
                <div className="wrapper__body">
                    {professions && users.length > 0 && (
                        <div className="wrapper__body-filters">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemsSelect={handleProfessionsSelect}
                            />
                            <button
                                className='btn btn-secondary mt-2'
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="wrapper__body-users">
                        {users.length === 0 ?
                            <table/>
                            : <Users
                                users={filteredUsers}
                                setUsers={setUsers}
                            />
                        }
                    </div>
                </div>
            </div> }
        </>
    );
}

export default App;
