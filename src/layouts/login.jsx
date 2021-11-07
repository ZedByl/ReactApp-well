import React, {useEffect, useState} from 'react';
import TextField from "../components/TextField/textField";
import {validator} from '../utils/validator'

const Login = () => {
    const [data, setData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Введите корректый емейл'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содердать хотя бы одну заглавную букву'
            },
            isConfigDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль должен содержать минимум 8 символов',
                value: 8
            }
        }
    }

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()

        if (!isValid) return
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className='mb-4'>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label='Email'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                error={errors.email}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Пароль'
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                type='password'
                                error={errors.password}
                            />
                        </div>
                        <button
                            className='btn btn-primary w-100 mx-auto'
                            disabled={!isValid}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;