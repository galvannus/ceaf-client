import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTRY_SUCCESS,
    REGISTRY_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../../types';

//TODO: CLOSE SESSION

const AuthState = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registryUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            console.log(response);

            dispatch({
                type: REGISTRY_SUCCESS,
                payload: response.data
            });

            //Get User
            userAuthenticated();
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTRY_ERROR
            });
        }
    }

    //Return the authenticated users
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //When de user Login
    const logIn = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });

            //Get user
            userAuthenticated();
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: REGISTRY_ERROR
            });
        }
    }

    //functions
    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registryUser,
                logIn,
                userAuthenticated
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;