import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

import { useEffect, useReducer, useState, useRef } from 'react';

import { useMessage } from '../..';

import handleInputVisibility from '../Reusables/Functions/handleInputVisibility';


type LoginState = {
    login: string;
    password: string;
}

enum ActionType {
    Login = 'login',
    Password = 'password',
}

interface LoginActions {
    type: ActionType;
    payload?: string;
}


const loginReducer = (state: LoginState, action: LoginActions) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.Login:
            //console.log(state.login);
            return {
                ...state,
                login: payload || '',
            };
        case ActionType.Password:
            //console.log(state.password);
            return {
                ...state,
                password: payload || '',
            };
        default:
            throw new Error(`No such action: ${action.type}`);
    }
}

function MainLogin() {

    const [loginData, loginDispatch] = useReducer(loginReducer, {
        login: '',
        password: '',
    });

    const [error, setError] = useState<string | null>();

    const passwordRef = useRef<HTMLInputElement>(null);

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        setMessage(undefined);
    }, [message, setMessage]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post('http://localhost:8000/login', loginData, { withCredentials: true })
            .then(() => {
                setMessage('Zalogowano pomyślnie');
                console.log(message);
                navigate('/lessons', { state: 'Zalogowano pomyślnie' });
            }).catch((error) => {
                setError(error.response.data);
                console.log(error);
            })
    };

    const inputLength = 30;

    return (
        <div className='main-login-wrapper'>
            <main className='main-login'>
                <h2 className='main-login-title'>Zaloguj się</h2>
                <h3 className='error-text'>{error}</h3>
                <form className='login-form' method='post' onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type='login' 
                        name='login' 
                        onChange={(e) => loginDispatch({type: ActionType.Login, payload: e.target.value})} 
                        placeholder='Nazwa użytkownika' 
                        autoComplete='username'
                        maxLength={inputLength}
                    ></input>
                    <div className='login-password-wrapper'>
                        <input 
                            ref={passwordRef}
                            type='password' 
                            name='password' 
                            onChange={(e)=> loginDispatch({type: ActionType.Password, payload: e.target.value})} 
                            placeholder='Hasło' 
                            autoComplete='current-password'
                            maxLength={inputLength}
                        ></input>
                        <div className='login-password-reveal' onClick={(e) => handleInputVisibility(e, passwordRef)}>Pokaż</div>
                    </div>
                    <input 
                        type='submit' 
                        name='submit' 
                        value='Zaloguj'
                    ></input>
                </form>
            </main>
        </div>
    );
}

export default MainLogin;
