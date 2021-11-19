import client from './client';

// @ts-ignore
export const login = ({username, password}) =>
    client.post('/api/auth/login',{username,password});

// @ts-ignore
export const register = ({username,password}) =>
    client.post('/api/auth/register',{username,password});

export const check = () => client.get('/api/auth/check');