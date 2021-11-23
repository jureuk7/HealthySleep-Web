import client from './client';

interface paramType {
    username: string;
    password: string;
}

export const login = ({username, password}:paramType) =>
    client.post('/api/auth/login',{username,password});

export const register = ({username,password}:paramType) =>
    client.post('/api/auth/register',{username,password});

export const check = () => client.get('/api/auth/check');

export const logout = () => client.get('/api/auth/logout');