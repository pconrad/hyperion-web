class Config {
    apiLocation() {
        const host = process.env.API_HOST;
        return process.env.NODE_ENV === 'development' ? host : window.location.hostname;
    }
}

export default new Config();
