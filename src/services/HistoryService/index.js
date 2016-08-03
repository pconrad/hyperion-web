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
            console.log('err' + JSON.stringify(err));
            console.log('res' + JSON.stringify(res));
            if (err) {
                cb({ error: { code: err.status } });
            } else {
                cb(res.body);
            }
        });
    }
}

export default new HistoryService();
