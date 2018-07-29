import axios from 'axios'
import auth from '../store/modules/auth'
import router from '../router'

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
                .catch(rejectError)

        }

    }

}, rejectError);

axiosInstance.interceptors.response.use(response => {

    LoggerService.log(`${ response.config.method } ${ response.config.url } response:`);
    LoggerService.log(response);
    return response

}, error => {

    if (error.response && error.response.status === 401) {

        auth.commitLogout();
        router.push({name: 'Login'})

    }
    return rejectError(error)

});

function authorizedConfig(config) {

    const accessToken = auth.state.accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config

}

function rejectError(error: Error) {
    return Promise.reject(error)
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
            .catch(rejectError)

    }

    static exchangeToken(): Promise<any> {

        return axiosInstance.get(exchangeTokenUrl)
            .then(response => auth.commitTokenReceived(response.data))
            .catch(rejectError)

    }

    static register(username: string, password: string, roles: string[]): Promise<any> {

        const data = {
            username,
            password,
            roles
        };

        return axiosInstance.post('/auth/register', data)
            .catch(rejectError)

    }


    static getData(path: string): Promise<any> {
        return axiosInstance.get(`/api/${ path }`).then(response => response.data).catch(rejectError)
    }

    static postData(path: string, data: any): Promise<any> {
        return axiosInstance.post(`/api/${ path }`, data).catch(rejectError)
    }

    static deleteData(path: string): Promise<any> {
        return axiosInstance.delete(`/api/${ path }`).catch(rejectError)
    }


    static getUsers(): Promise<any> {
        return this.getData(`users`).then(data => data.users)
    }

    static getUserById(userId): Promise<any> {
        return this.getData(`users/${ userId }`).then(data => data.user)
    }

    static deleteUser(userId): Promise<any> {
        return this.deleteData(`users/${ userId }`)
    }

    static getRoles(): Promise<any> {
        return this.getData(`roles`).then(data => data.roles)
    }

    static getAccountTypes(): Promise<any> {
        return this.getData(`accounttypes`).then(data => data.accountTypes)
    }

    static getAccounts(): Promise<any> {
        return this.getData(`accounts`).then(data => data.accounts)
    }

    static addAccount(name: string, type_id: number): Promise<any> {
        return this.postData('accounts', { name, type_id })
    }

    static deleteAccount(accountId: number): Promise<any> {
        return this.deleteData(`accounts/${ accountId }`)
    }

    static updateAccount(accountId: number, name: string, type_id: number): Promise<any> {
        return axiosInstance.put(`/api/accounts/${ accountId }`, { name, type_id }).catch(rejectError)
    }

    static getSubaccounts(): Promise<any> {
        return this.getData(`subaccounts`).then(data => data.subaccounts)
    }

    static addSubaccount(name: string, accountId: number): Promise<any> {
        return this.postData('subaccounts', { name, accountId })
    }

}

export default NetworkService;
