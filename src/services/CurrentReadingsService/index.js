import Config from 'services/Config';

const config = new Config();

class CurrentReadingsService {
    constructor() {
        const hostname = config.apiLocation();
        this.base_url = `wss://${hostname}/api/actual`;
    }

    connect(cb) {
        this.ws = new WebSocket(this.base_url);
        this.ws.onmessage = function onmessage(message) {
            cb(JSON.parse(message.data));
        };
    }

    disconnect() {
        this.ws.close();
    }
}

export default CurrentReadingsService;
