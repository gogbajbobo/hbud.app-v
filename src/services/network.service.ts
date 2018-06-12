import axios from 'axios'
import auth from '../store/modules/auth'

import TokenService from './token.service'
import LoggerService from './logger.service'

const
    authPath = '/auth',
    loginUrl = `${ authPath }/login`,
    exchangeTokenUrl = `${ authPath }/token`;

const axiosInstance = axios.create();

const isProduction = process.env.NODE_ENV === 'production';

axiosInstance.defaults.baseURL = isProduction
    ? 'https://server.grigoblin.ru'
    : 'http://maxbook.local:8001';

axiosInstance.interceptors.request.use(config => {

    LoggerService.log('send request', config.method, config.url);

    switch (config.url) {

        case loginUrl: { return config }

        case exchangeTokenUrl: { return authorizedConfig(config) }

        default: {

            return TokenService.checkLifetime()
                .then(() => authorizedConfig(config))
                .catch(error => Promise.reject(error))

        }

    }

}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => {

    LoggerService.log(`${ response.config.method } ${ response.config.url } response:`);
    LoggerService.log(response);
    return response

}, error => Promise.reject(error));


function authorizedConfig(config) {

    const accessToken = auth.state.accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config

}

class NetworkService {

    static login(username: string, password: string): Promise<any> {

        const userAgent = navigator.userAgent;
        const data = {
            username,
            password,
            userAgent
        };

        return axiosInstance.post(loginUrl, data)
            .then(response => auth.commitAuthorized(response.data))
            .catch(err => Promise.reject(err))

    }

    static exchangeToken(): Promise<any> {

        return axiosInstance.get(exchangeTokenUrl)
            .then(response => auth.commitTokenReceived(response.data))
            .catch(err => Promise.reject(err))

    }

    static register(username: string, password: string, roles: string[]): Promise<any> {

        const data = {
            username,
            password,
            roles
        };

        return axiosInstance.post('/auth/register', data)
            .catch(err => Promise.reject(err))

    }

    static getUsers(): Promise<any> {

        return axiosInstance.get('/api/users')
            .then(response => response.data.users)
            .catch(err => Promise.reject(err))

    }

    static getUserById(userId): Promise<any> {

        return axiosInstance.get(`/api/users/${ userId }`)
            .then(response => response.data.user)
            .catch(err => Promise.reject(err))

    }

    static getRoles(): Promise<any> {

        return axiosInstance.get(`/api/roles`)
            .then(response => response.data.roles)
            .catch(err => Promise.reject(err))

    }

}

export default NetworkService;
