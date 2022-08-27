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

    public post(url: string, data: unknown) {
        return axios.post(url, data, this.config);
    }

    public put(url: string, data: unknown) {
        return axios.put(url, data, this.config);
    }

    public delete(url: string) {
        return axios.delete(url, this.config);
    }
}

export default NetworkAdapter;
