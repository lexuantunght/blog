import axios from 'axios';
import NetworkConfig from '@config/network';

class NetworkAdapter {
    private config;
    constructor() {
        this.config = {
            headers: NetworkConfig.headers,
            withCredentials: NetworkConfig.withCredentials,
        };
    }

    public get(url: string) {
        return axios.get(url, this.config);
    }
}

export default NetworkAdapter;
