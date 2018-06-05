import axios, {AxiosPromise} from 'axios'
import auth from '../store/modules/auth'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://maxbook.local:8002';

class NetworkService {

    static login(username: string, password: string): Promise<any> {

        const userAgent = navigator.userAgent;
        const data = {
            username,
            password,
            userAgent
        };

        return axiosInstance.post('login', data)
            .then(response => auth.commitAuthorized(response.data))

    }

    static exchangeToken(): Promise<any> {

        return axiosInstance.get(`token`)
            .then(response => auth.commitTokenRecieved(response.data))

    }

}

export default NetworkService;
