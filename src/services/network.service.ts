import axios from 'axios'
import auth from '../store/modules/auth'
import TokenService from "./token.service";

const loginUrl = 'login';
const exchangeTokenUrl = 'token';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://maxbook.local:8002';

axiosInstance.interceptors.request.use(config => {

    console.log('send request', config.method, config.url);

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

    }

    static exchangeToken(): Promise<any> {

        return axiosInstance.get(exchangeTokenUrl)
            .then(response => auth.commitTokenReceived(response.data))

    }

}

export default NetworkService;
