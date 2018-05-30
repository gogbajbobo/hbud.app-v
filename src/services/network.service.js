import axios from 'axios'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://localhost:8002';

class NetworkService {

    login(username, password) {

        const userAgent = navigator.userAgent;

        axiosInstance.post('login', {
            username,
            password,
            userAgent
        })
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e)
            })

    }

}

const networkService = new NetworkService();

export default networkService;
