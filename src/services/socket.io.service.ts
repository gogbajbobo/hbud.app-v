import io from 'socket.io-client'

const isProduction = process.env.NODE_ENV === 'production';
const socketURL = isProduction
    ? 'https://server.grigoblin.ru'
    : 'http://maxbook.local:8011';

const socket = io(socketURL);

function connect() {

    console.log('connect()');

    socket.on('test', () => {

        console.log('socket test');

        socket.emit('test', {data: 'test'})

    })

}

export default { connect }
