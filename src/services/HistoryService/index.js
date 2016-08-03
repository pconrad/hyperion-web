import config from 'services/Config';

const request = require('superagent');

class HistoryService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `https://${hostname}/api/history`;
    }

    getMeterReadingByDate(searchDate, cb) {
        const param = searchDate.format('YYYY-MM-DD');
        const url = `${this.base_url}?date=${param}`;
        request.get(url).withCredentials().end((err, res) => {
            if (err) {
                cb({
                    error: {
                        code: err.status ? err.status : 'unknown',
                        text: res ? res.text : '',
                    },
                });
            } else {
                cb(res.body);
            }
        });
    }
}

export default new HistoryService();
