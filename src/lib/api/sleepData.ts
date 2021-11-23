import client from './client';

interface initType {
    username:string;
    sleepDate:string;
}

interface startSleepType {
    username:string;
    sleepDate:string;
    startSleep: {
        year:string;
        month:string;
        day:string;
        hour:string;
        min:string;
    };
}

interface finishSleepType {
    username:string;
    sleepDate:string;
    finishSleep: {
        year:string;
        month:string;
        day:string;
        hour:string;
        min:string;
    }
}

export const init = ({username, sleepDate}:initType) =>
    client.post('/api/sleepData/init',{username,sleepDate});

export const setStartSleep = ({username,sleepDate,startSleep}:startSleepType) =>
    client.post('/api/sleepData/setStartSleep', {username,sleepDate,startSleep});

export const setFinishSleep = ({username,sleepDate,finishSleep}:finishSleepType) =>
    client.post('/api/sleepData/setFinishSleep', {username,sleepDate,finishSleep});

export const isExists = ({username, sleepDate}:initType) =>
    client.get(`/api/sleepData/exists?username=${username}&sleepDate=${sleepDate}`);

export const read = ({username, sleepDate}:initType) =>
    client.get(`/api/sleepData/read?username=${username}&sleepDate=${sleepDate}`)

export const readWeek = ({username,sleepDate}:initType) =>
    client.get(`/api/sleepData/readWeekend?username=${username}&sleepDate=${sleepDate}`)