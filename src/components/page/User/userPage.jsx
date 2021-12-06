import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom'
import {getMaterialUrl} from '../../../utils/getMaterialUrl'
import api from "../../../api";
import Loader from "../../common/Loader";
import QualitiesList from "../../ui/qualities/QualitiesList/qualitiesList";
import {Link} from "react-router-dom";

const UserPage = () => {
    const location = useLocation()
    const history = useHistory()
    const userId = getMaterialUrl(location.pathname)
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data))
    }, [])

    const handleAllUsers = () => {
        history.push('/users')
    }

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                 <h3>Качества: <QualitiesList qualities={user.qualities} /></h3>
                <h3>Встретился раз: {user.completedMeetings}</h3>
                <h3>Оценка: {user.rate}</h3>
                <Link to={`/users/${userId}/edit`}>
                    <button className='btn btn-secondary mt-2'>Изменить</button>
                </Link>
                <button
                    className='btn btn-secondary mt-2'
                    onClick={handleAllUsers}
                >
                    Все пользователи
                </button>
            </div>
        );
    } else return <Loader />
};

export default UserPage;