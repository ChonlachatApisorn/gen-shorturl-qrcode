import moment from 'moment';

const getCurrentTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const logger = {
    info: (massage) => {
        console.log(`${getCurrentTime()} | ${massage}`);
    },
    error: (massage) => {
        console.error(`${getCurrentTime()} | ${massage}`);
    },
}
