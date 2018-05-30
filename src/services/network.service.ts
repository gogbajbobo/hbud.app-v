import axios, {AxiosPromise} from 'axios'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://localhost:8002';

class NetworkService {

    static login(username: string, password: string): AxiosPromise {

        const userAgent = navigator.userAgent;
        const data = {
            username,
            password,
            userAgent
        };

        return axiosInstance.post('login', data)

    }

}

export default NetworkService;
