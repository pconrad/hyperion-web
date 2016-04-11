import Config from 'services/Config';

const config = new Config();
const request = require('superagent');

class RecentReadingsService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `https://${hostname}/api/recent`;
    }

    getRecentReadings(cb) {
        request.get(this.base_url).withCredentials().end((err, res) => {
            if (err || !res.ok) {
                cb({ error: { code: err.status } });
            } else {
                cb(res.body);
            }
        });
    }
}

export default RecentReadingsService;
