import axios, {AxiosPromise} from 'axios'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://maxbook.local:8002';

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

    static exchangeToken(): AxiosPromise {

        return axiosInstance.get(`token`)
            // .then(response => {
            //     store.commit('auth/tokenRecieved', response.data);
            // })
            // .catch(error => {
            //     return { error }
            // })
            // .then(() => {
            //     tokenExchanging = false;
            // })

    }

}

export default NetworkService;
