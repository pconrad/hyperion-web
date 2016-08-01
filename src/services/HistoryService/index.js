import config from 'services/Config';

const request = require('superagent');
// const moment = requre('moment');

class HistoryService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `https://${hostname}/api/history`;
    }

    getMeterReadingByDate(searchDate, cb) {
        const param = searchDate.format('YYYY-MM-DD');
        request.get(`${this.base_url}?date=${param}`).withCredentials().end((err, res) => {
            if (err || !res.ok) {
                cb({ error: { code: err.status } });
            } else {
                cb(res.body);
            }
        });
    }
}

export default new HistoryService();
