import io from 'socket.io-client'
import auth from '../store/modules/auth'
import logger from '../services/logger.service'

const isProduction = process.env.NODE_ENV === 'production';
const socketURL = isProduction
    ? 'https://server.grigoblin.ru'
    : 'http://maxbook.local:8001';

const socket = io(socketURL);

function connect() {

    socket.on('connect', () => {

        logger.log(`socket connected ${ socket.id }`);

        const token = auth.state.accessToken;
        socket.emit('authentication', { token })

    });

    socket.on('authenticated', () => {

        logger.log(`socket authenticated ${ socket.id }`);
        socket.emit('authenticated');

        socket.emit('test', () => logger.log('test received'))

    });

    socket.on('unauthorized', err => {
        logger.log(`unauthorized | authentication error: ${ err.message }`)
    });

    socket.on('disconnect', () => {
        logger.log(`socket disconnected`)
    });

    socket.on('error', err => {
        logger.error(err.message)
    })

}

export default { connect }
