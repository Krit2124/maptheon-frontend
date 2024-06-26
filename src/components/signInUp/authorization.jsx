import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUserStore } from 'store/store';

export default function Authorization() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {
        login,
    } = useUserStore();

    async function handleSubmit(e) {
        e.preventDefault();

        if (emailOrUsername === '' || password === '')  {
            toast.error('Все поля обязательны для заполнения');
            return;
        }
        
        let result = await login(emailOrUsername, password);
        if (result.isSuccess) {
            return navigate(`/maps/personal/yours/`);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Авторизация</h1>

            <form className="flex-col-sb-left flex-gap-30" onSubmit={handleSubmit}>
                <div className="flex-col-sb-left flex-gap-15">
                    <input className="textInput-usual" type="text" placeholder="Email или логин" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)}/>
                    <input className="textInput-usual" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Войти</button>
                    <Link to="/sign/up" className="button-text-usual">Регистрация</Link>
                </div>
            </form>

            <ToastContainer theme="dark"/>
        </div>
    );
}