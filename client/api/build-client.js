import axios from 'axios';

export default ({ req }) => {
    let isServer = (process.browser) ? false : true;

    if (isServer) {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        return axios.create({
            baseUrl: '/',
        });
    }
};