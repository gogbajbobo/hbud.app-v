import auth from '../store/modules/auth'
import NetworkService from './network.service'

class TokenService {

    static checkLifetime() {

        return new Promise((resolve, reject) => {

            const rejectLog = (err: Error) => {

                console.error(`${ err.name }: ${ err.message }`);
                return reject(err)

            };

            if (!auth.state.expirationTime)
                return rejectLog(new Error('have no expirationTime'));

            const expirationDate = new Date(auth.state.expirationTime * 1000).getTime();
            const now = new Date().getTime();

            if (expirationDate < now)
                return rejectLog(new Error('token expire'));

            const tokenRemainingLifetime = Math.floor((expirationDate - now) / 1000);
            const tokenRefreshThreshold = 24 * 60 * 60;

            if (tokenRemainingLifetime > tokenRefreshThreshold)
                return resolve();

            console.log('token expire at', new Date(expirationDate));
            console.log('have to exchange access token');

            return NetworkService.exchangeToken()
                .then(data => resolve(data))
                .catch(err => rejectLog(err))

        })

    }

}

export default TokenService;
