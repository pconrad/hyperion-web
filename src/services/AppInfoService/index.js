import config from 'services/Config';

const request = require('superagent');

class AppInfoService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `https://${hostname}/api/info`;
    }

    getAppInfo(cb) {
        request.get(this.base_url).withCredentials().end((err, res) => {
            if (err) {
                cb({ error: { code: err.status } });
            } else {
                cb(res.body);
            }
        });
    }
}

export default new AppInfoService();
