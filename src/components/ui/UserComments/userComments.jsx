import React, {useEffect, useState} from 'react';
import SelectField from "../../common/form/SelectField/selectField";
import api from "../../../api";
import Comments from "../Comments/comments";

const UserComments = ({userId}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [commentForUser, setCommentForUser] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        api.users.fetchAll().then(data => {
            setUsers(data)
            setSelectedUser({user: data[0]._id})
        })
        api.comments.fetchCommentsForUser(userId).then(data => setCommentForUser(data))
    }, [])

    const handleDeleteCommit = (id) => {
        api.comments.remove(id)
        api.comments.fetchCommentsForUser(userId).then(data => setCommentForUser(data))
    }

    const handleAddCommit = () => {
        const newComment = {
            pageId: userId,
            userId: selectedUser.user,
            content: message,
        }
        api.comments.add(newComment)
        api.comments.fetchCommentsForUser(userId).then(data => setCommentForUser(data))

        setMessage('')
    }

    const handleChangeMessage = (e) => {
        const value = e.target.value
        setMessage(value)
    }

    const handleChange = (target) => {
        setSelectedUser({[target.name]: target.value})
    }

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>Новый коментарий</h2>
                        <div className="mb-4">
                            <SelectField
                                onChange={handleChange}
                                options={users}
                                defaultOptions='Выберите...'
                                value={selectedUser.user}
                                label="Выберите пользователя"
                                name='user'
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >Сообщение</label>
                            <textarea
                                className="form-control"
                                onChange={handleChangeMessage}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={message}
                            />
                        </div>
                        <button
                            className='btn btn-primary w-60 mx-auto'
                            onClick={handleAddCommit}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
            {commentForUser.length > 0 && <Comments commentForUser={commentForUser} removeCommit={handleDeleteCommit} users={users}/>}
        </div>
    );
};

export default UserComments;