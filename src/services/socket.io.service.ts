import io from 'socket.io-client'
import auth from '../store/modules/auth'
import logger from '../services/logger.service'

const isProduction = process.env.NODE_ENV === 'production';
const socketURL = isProduction
    ? 'https://server.grigoblin.ru'
    : 'http://maxbook.local:8001';

const socket = io(socketURL, { query: { token: auth.state.accessToken }});

function connect() {

    console.log('connect()');

    socket.on('connect', () => {

        logger.log(`socket connected ${ socket.id }`);

        const token = auth.state.accessToken;
        logger.log({ token });
        socket.emit('authorize', { token }, (data) => {
            console.log(data)
        })

    });

    socket.on('disconnect', () => {
        logger.log(`socket disconnected`)
    });

    socket.on('error', err => {
        logger.error(err.message);
    });

}

export default { connect }
