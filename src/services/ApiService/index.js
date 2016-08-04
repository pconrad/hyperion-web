import config from 'services/Config';

const request = require('superagent');

class ApiService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `https://${hostname}/api`;
    }

    get(url, callback) {
        request.get(url).withCredentials().end((error, response) => {
            if (error) {
                callback({
                    error: {
                        code: error.status ? error.status : 'unknown',
                        text: response ? response.text : '',
                    },
                });
            } else {
                callback(response.body);
            }
        });
    }

    getAppInfo(callback) {
        const url = `${this.base_url}/info`;
        this.get(url, callback);
    }

    getMeterReadingByDate(searchDate, callback) {
        const param = searchDate.format('YYYY-MM-DD');
        const url = `${this.base_url}/history?date=${param}`;
        this.get(url, callback);
    }

    getRecentReadings(callback) {
        const url = `${this.base_url}/recent`;
        this.get(url, callback);
    }
}

export default new ApiService();
