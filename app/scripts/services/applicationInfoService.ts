/// <reference types="whatwg-fetch" />

import { AbstractRestClient} from './abstractRestClient'
import { ApplicationInfo } from '../model/applicationInfo';

export default class ApplicationInfoService extends AbstractRestClient {
    retrieveApplicationInfo(): Promise<ApplicationInfo> {
        return fetch('/api/info', { method: 'GET' })
            .then(this.processJson);
    };
}